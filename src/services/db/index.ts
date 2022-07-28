import type { User } from "firebase/auth";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { useAwait } from "$lib/hooks";
import { collections, db } from "@root/firebase";
import { isUserDocument } from "$lib/predicate/db";
import { toUnderscore } from "$lib/utils";

export function createUserDocument(user: User) {
	return useAwait(async () => {
		await setDoc(doc(db, collections.users, user.uid), createUserDocumentObject(user));
		const [userObject, error] = await getUserDocument(user.uid);
		if (error) throw new Error(error);
		return userObject;
	});
}

export function createUserDocumentObject(user: User): UserDocument {
	return {
		uid: user.uid,
		createdAt: user.metadata.creationTime || Timestamp.now().toString(),
		name: user.displayName,
		displayName: user.displayName && toUnderscore(user.displayName),
		imageURL: user.photoURL,
		bannerURL: null,
		description: null,
		isVerified: false,
		stats: {
			followerCount: 0,
			tweetCount: 0
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
