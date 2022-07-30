import type { UserDocument, UserStats } from "@root/app";
import { collections, db } from "@root/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAwait } from "$lib/hooks";
import { isBoolean, isInterface, isNumber, isString } from "malachite-ui/predicate";
import { isStringOrNull } from "./core";

export function isNewUser(uid: string) {
	return useAwait(async () => {
		const userDoc = await getDoc(doc(db, collections.users, uid));
		return !userDoc.exists();
	});
}

export function isUserDocument(val: unknown): val is UserDocument {
	return isInterface<UserDocument>(val, {
		uid: isString,
		createdAt: isString,
		name: isString,
		displayName: isString,
		imageURL: isStringOrNull,
		bannerURL: isStringOrNull,
		description: isStringOrNull,
		isVerified: isBoolean,
		stats: isUserStats,
		url: isStringOrNull,
		location: isStringOrNull
	});
}

export function isUserStats(val: unknown): val is UserStats {
	return isInterface<UserStats>(val, {
		tweetCount: isNumber,
		followerCount: isNumber,
		followingCount: isNumber
	});
}
