import type { User } from "firebase/auth";
import type {
	DraftTweet,
	TweetDocument,
	UpdatableUserDocument,
	UserDocument,
	UserDocumentTimestamp,
	WhoCanReply
} from "@root/types";
import type { Timestamp } from "firebase/firestore";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	increment,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where
} from "firebase/firestore";
import { useAwait } from "$lib/hooks";
import { collections, db, storage } from "@root/firebase";
import { isUserDocument } from "$lib/predicate/db";
import { toUnderscore } from "$lib/utils";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export function changeDisplayName(uid: string, displayName: string) {
	return useAwait(async () => {
		const querySnapshot = await getDocs(
			query(collection(db, collections.users), where("displayName", "==", displayName))
		);

		if (querySnapshot.size >= 1) throw new Error("Display Name has been already taken.");
		else updateDoc(doc(db, collections.users, uid), { displayName });
	});
}

export function createTweetDocument(
	user: UserDocument,
	{ imageURL, text, whoCanReply }: DraftTweet
) {
	return useAwait(async () => {
		const collectionRef = collection(db, collections.tweets);
		const docReference = doc(collectionRef);

		await setDoc(
			docReference,
			createTweetDocumentObject(user, { id: docReference.id, text, whoCanReply })
		);

		if (imageURL) {
			const fileRef = ref(storage, "/posts/" + docReference.id);
			await uploadString(fileRef, imageURL, "data_url");
			const imagePathURL = await getDownloadURL(fileRef);
			await updateDoc(docReference, { imageURL: imagePathURL, hasMedia: true });
		}

		await updateUserDocument(user.uid, {
			stats: {
				tweetCount: increment(1)
			}
		});
	});
}

function updateUserDocument<K extends keyof Omit<UserDocument, "uid">>(
	uid: string,
	data: Pick<UpdatableUserDocument, K>
) {
	return useAwait(() => setDoc(doc(db, collections.users, uid), data, { merge: true }));
}

function createTweetDocumentObject(
	user: UserDocument,
	{ id, text, whoCanReply }: { id: string; text: string | null; whoCanReply: WhoCanReply }
): TweetDocument {
	return {
		id,
		createdAt: serverTimestamp() as Timestamp,
		text,
		imageURL: null,
		hasMedia: false,
		user: {
			uid: user.uid,
			name: user.name,
			displayName: user.displayName,
			description: user.description,
			imageURL: user.imageURL,
			stats: user.stats
		},
		stats: {
			favouritedCount: 0,
			retweetCount: 0,
			replyCount: 0
		},
		whoCanReply
	};
}

export function createUserDocument(user: User) {
	return useAwait(async () => {
		await setDoc(doc(db, collections.users, user.uid), createUserDocumentObject(user));
		const [userObject, error] = await getUserDocument(user.uid);
		if (error) throw new Error(error);
		return userObject;
	});
}

export function createUserDocumentObject(user: User): UserDocumentTimestamp {
	return {
		uid: user.uid,
		createdAt: user.metadata.creationTime || serverTimestamp(),
		name: user.displayName,
		displayName: user.displayName && toUnderscore(user.displayName),
		imageURL: user.photoURL,
		bannerURL: null,
		description: null,
		isVerified: false,
		url: null,
		location: null,
		stats: {
			tweetCount: 0,
			followerCount: 0,
			followingCount: 0
		}
	};
}

export function getUserDocument(uid: string) {
	return useAwait<UserDocument, string>(async () => {
		const docSnapshot = await getDoc(doc(db, collections.users, uid));

		if (!docSnapshot.exists()) throw new Error("NOT FOUND");

		const data = docSnapshot.data();
		if (isUserDocument(data)) return data;
		else throw new Error("INVALID USER DOCUMENT");
	});
}

export function getUserDocumentWithDisplayName(displayName: string) {
	return useAwait<UserDocument, string>(async () => {
		const querySnapshot = await getDocs(
			query(collection(db, collections.users), where("displayName", "==", displayName))
		);

		if (querySnapshot.empty) throw new Error("NOT FOUND");
		if (querySnapshot.size > 1) throw new Error("USER IS NOT UNIQUE");

		const data = querySnapshot.docs[0].data();
		if (isUserDocument(data)) return data;
		else throw new Error("INVALID USER DOCUMENT");
	});
}
