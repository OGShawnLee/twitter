import type { ChatDocument, ChatUser, MessageDocument } from "@root/types";
import type { FirebaseError } from "firebase/app";
import type { FirestoreError, QuerySnapshot, Timestamp } from "firebase/firestore";
import type { Unsubscriber } from "svelte/store";
import { collections, db } from "@root/firebase";
import {
	collection,
	doc,
	getDocs,
	increment,
	limit,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	where,
	writeBatch
} from "firebase/firestore";
import { useAwait } from "$lib/hooks";
import { filterSnapshot, toRecord } from "$lib/utils";
import { writable } from "svelte/store";
import { makeReadable } from "malachite-ui/utils";
import { isChatDocument, isMessageDocument } from "$lib/predicate/db";

export function createChat(sender: ChatUser, receiver: ChatUser) {
	return useAwait(async () => {
		const chatRef = doc(collection(db, collections.chats));
		await setDoc(chatRef, createChatDocument(chatRef.id, { sender, receiver }));
		return chatRef.id;
	});
}

function createChatDocument(
	id: string,
	users: { receiver: ChatUser; sender: ChatUser }
): ChatDocument {
	return {
		id,
		createdAt: serverTimestamp() as Timestamp,
		lastUpdated: serverTimestamp() as Timestamp,
		members: toRecord(true, users.sender.uid, users.receiver.uid),
		membersList: [users.sender.uid, users.receiver.uid],
		lastMessage: null,
		sender: users.sender,
		receiver: users.receiver,
		messageCount: 0
	};
}

function createMessageDocument(
	id: string,
	message: Pick<MessageDocument, "user" | "imageURL" | "text">
): MessageDocument {
	return { id, createdAt: serverTimestamp() as Timestamp, hasBeenSeen: false, ...message };
}

export function getAllChatDocuments(uid: string) {
	return useAwait(async () => {
		const querySnapshot = await getDocs(
			query(
				collection(db, collections.chats),
				where("membersList", "array-contains", uid),
				orderBy("lastUpdated", "desc"),
				limit(15)
			)
		);
		return filterSnapshot(querySnapshot, isChatDocument);
	});
}

export function getChatDocument(uid: string, target: string) {
	return useAwait(async () => {
		const querySnapshot = await getDocs(
			query(
				collection(db, collections.chats),
				where(`members.${uid}`, "==", true),
				where(`members.${target}`, "==", true)
			)
		);
		if (querySnapshot.empty) return null;
		const chat = querySnapshot.docs[0];
		const data = chat.data();
		if (isChatDocument(data)) return data;
		throw new Error("Invalid Chat Document");
	});
}

export async function sendMessage(
	id: string,
	message: Pick<MessageDocument, "user" | "imageURL" | "text">
) {
	const batch = writeBatch(db);
	const docRef = doc(collection(db, collections.messages(id)));
	const chatRef = doc(db, collections.chats, id);
	const finalMessage = createMessageDocument(docRef.id, message);
	batch.set(docRef, finalMessage);
	batch.update(chatRef, {
		lastUpdated: serverTimestamp(),
		lastMessage: finalMessage,
		messageCount: increment(1)
	});
	return batch.commit();
}

export function useChatSnapshot({
	onUpdate,
	onError
}: {
	onUpdate?: (context: { messages: MessageDocument[]; snapshot: QuerySnapshot }) => void;
	onError?: (error: FirestoreError) => void;
} = {}) {
	const Messages = writable<MessageDocument[]>([]);
	return {
		subscribe: Messages.subscribe,
		messages: makeReadable(Messages),
		initialiseChatSnapshot: (id: string): Unsubscriber => {
			return onSnapshot(
				query(collection(db, collections.messages(id)), orderBy("createdAt", "asc"), limit(25)),
				{
					next: (snapshot) => {
						const messages = filterSnapshot(snapshot, isMessageDocument);
						Messages.set(messages);
						onUpdate?.({ messages, snapshot });
					},
					error: onError
				}
			);
		}
	};
}

export function useChatsSnapshot() {
	const Chats = writable<ChatDocument[]>([]);
	const Error = writable<FirebaseError | null>(null);
	const isLoading = writable(true);
	return {
		subscribe: Chats.subscribe,
		chats: makeReadable(Chats),
		error: makeReadable(Error),
		isLoading: makeReadable(isLoading),
		initialiseChatsSnapshot(uid: string): Unsubscriber {
			return onSnapshot(
				query(
					collection(db, collections.chats),
					where("membersList", "array-contains", uid),
					orderBy("lastUpdated", "asc"),
					limit(25)
				),
				{
					next: (querySnapshot) => {
						Chats.set(filterSnapshot(querySnapshot, isChatDocument));
						isLoading.set(false);
					},
					error: Error.set
				}
			);
		}
	};
}
