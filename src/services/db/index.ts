import type { User } from "firebase/auth";
import type { UserDocument, UserDocumentTimestamp } from "@root/app";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	where
} from "firebase/firestore";
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
