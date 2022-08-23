import type { User } from "firebase/auth";
import type {
	DraftTweet,
	NewTweetOptions,
	TweetDocument,
	UpdatableTweetDocument,
	UpdatableUserDocument,
	UserDocument,
	UserDocumentTimestamp
} from "@root/types";
import type { Timestamp } from "firebase/firestore";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	increment,
	limit,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
	writeBatch
} from "firebase/firestore";
import { useAwait } from "$lib/hooks";
import { collections, db, storage } from "@root/firebase";
import { isTweetDocument, isUserDocument } from "$lib/predicate/db";
import { generateTweetDocuments, joinWithIDs, toUnderscore } from "$lib/utils";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { isString } from "malachite-ui/predicate";

export {
	createChat,
	getAllChatDocuments,
	getChatDocument,
	sendMessage,
	useChatSnapshot,
	useChatsSnapshot
} from "./messages";
export {
	deleteUserBookmark,
	getUserBookmarks,
	getUserFollowers,
	getUserFollowing,
	getUserLikes,
	handleFollowUser,
	updateUserProfile
} from "./user";
export { bookmarkTweet, deleteTweet, getTweetReplyingTo, handleLikeTweet } from "./tweet";

export async function getTweetReplies(id: string) {
	return useAwait(async () => {
		const querySnapshot = await getDocs(
			query(
				collection(db, collections.tweets),
				where("isReply", "==", true),
				where("inReplyToID", "==", id),
				orderBy("createdAt", "desc"),
				limit(10)
			)
		);

		return generateTweetDocuments(querySnapshot);
	});
}

export function changeDisplayName(displayName: string, user: UserDocument) {
	return useAwait(async () => {
		const querySnapshot = await getDocs(
			query(collection(db, collections.users), where("displayName", "==", displayName))
		);

		if (querySnapshot.size >= 1) throw new Error("Display Name has been already taken.");
		else {
			// ? we should probably handle this on the server with a firebase function

			const batch = writeBatch(db);
			const tweets = await getDocs(
				query(collection(db, collections.tweets), where("user.uid", "==", user.uid))
			);
			const replies = await getDocs(
				query(
					collection(db, collections.tweets),
					where("inReplyToDisplayName", "==", user.displayName)
				)
			);

			batch.update(doc(db, collections.users, user.uid), { displayName });
			tweets.docs.forEach((document) => {
				batch.update(doc(db, collections.tweets, document.id), {
					user: { ...user, displayName }
				});
			});
			replies.forEach((document) => {
				batch.update(doc(db, collections.tweets, document.id), {
					inReplyToDisplayName: displayName
				});
			});
			return batch.commit();
		}
	});
}

export function sendTweet(userDoc: UserDocument, draftTweet: DraftTweet) {
	const { imageURL, text, whoCanReply, inReplyTo } = draftTweet;

	return useAwait(async () => {
		const docReference = doc(collection(db, collections.tweets));
		await setDoc(
			docReference,
			createTweetDocumentObject(userDoc, { id: docReference.id, text, whoCanReply, inReplyTo })
		);

		if (imageURL) {
			const fileRef = ref(storage, "/posts/" + docReference.id);
			await uploadString(fileRef, imageURL, "data_url");
			const imagePathURL = await getDownloadURL(fileRef);
			await updateDoc(docReference, { imageURL: imagePathURL, hasMedia: true });
		}

		await updateUserDocument(userDoc.uid, {
			stats: { tweetCount: increment(1) }
		});
	});
}

export function updateUserDocument<K extends keyof Omit<UserDocument, "uid">>(
	uid: string,
	data: Pick<UpdatableUserDocument, K>
) {
	return useAwait(() => setDoc(doc(db, collections.users, uid), data, { merge: true }));
}

function createTweetDocumentObject(
	user: UserDocument,
	{ id, text, whoCanReply = "EVERYONE", inReplyTo = null }: NewTweetOptions
): TweetDocument {
	return {
		id,
		createdAt: serverTimestamp() as Timestamp,
		text,
		imageURL: null,
		hasMedia: false,
		likedBy: [],
		user: {
			uid: user.uid,
			name: user.name,
			displayName: user.displayName,
			description: user.description,
			imageURL: user.imageURL,
			stats: user.stats
		},
		favouriteCount: 0,
		retweetCount: 0,
		replyCount: 0,
		whoCanReply,
		isReply: inReplyTo !== null,
		inReplyToDisplayName: inReplyTo?.displayName || null,
		inReplyToID: inReplyTo?.id || null,
		inReplyToUID: inReplyTo?.uid || null
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

export function getTweetDocument(id: string, displayName: string) {
	return useAwait(async () => {
		const querySnapshot = await getDocs(
			query(
				collection(db, collections.tweets),
				where("user.displayName", "==", displayName),
				where("id", "==", id)
			)
		);

		if (querySnapshot.empty) return null;
		if (querySnapshot.size > 1) throw new Error("Tweet is not unique");

		const document = querySnapshot.docs[0].data();
		if (isTweetDocument(document)) return document;
		else throw new Error("Invalid Tweet");
	});
}

export async function getTweetLikedByUsers(id: string, displayName: string) {
	return useAwait(async () => {
		const [tweet, error] = await getTweetDocument(id, displayName);

		if (error instanceof Error) throw error;
		else if (isString(error)) throw new Error(error);
		if (!tweet) return null;

		return joinWithIDs(collection(db, collections.users), tweet.likedBy, isUserDocument);
	});
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
