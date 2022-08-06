import type {
	RuntimeTweet,
	TweetDocument,
	TweetStats,
	UserDocument,
	UserHeader,
	UserStats,
	WhoCanReply
} from "@root/types";
import { collections, db } from "@root/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAwait } from "$lib/hooks";
import { isBoolean, isInterface, isNumber, isString } from "malachite-ui/predicate";
import { isStringOrNull, isTimestamp } from "./core";

export function isNewUser(uid: string) {
	return useAwait(async () => {
		const userDoc = await getDoc(doc(db, collections.users, uid));
		return !userDoc.exists();
	});
}

export function isRuntimeTweet(val: unknown): val is RuntimeTweet {
	return isInterface<RuntimeTweet>(val, {
		id: isString,
		createdAt: isString,
		user: isUserHeader,
		text: isStringOrNull,
		stats: isTweetStats,
		imageURL: isStringOrNull,
		whoCanReply: isWhoCanReply,
		hasMedia: isBoolean,
		likedBy: Array.isArray
	});
}

export function isTweetDocument(val: unknown): val is TweetDocument {
	return isInterface<TweetDocument>(val, {
		id: isString,
		createdAt: isTimestamp,
		user: isUserHeader,
		text: isStringOrNull,
		stats: isTweetStats,
		imageURL: isStringOrNull,
		whoCanReply: isWhoCanReply,
		hasMedia: isBoolean,
		likedBy: Array.isArray
	});
}

export function isTweetStats(val: unknown): val is TweetStats {
	return isInterface<TweetStats>(val, {
		favouritedCount: isNumber,
		retweetCount: isNumber,
		replyCount: isNumber
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

export function isUserHeader(val: unknown): val is UserHeader {
	return isInterface<UserHeader>(val, {
		uid: isString,
		imageURL: isStringOrNull,
		displayName: isStringOrNull,
		name: isStringOrNull,
		stats: isUserStats,
		description: isStringOrNull
	});
}

export function isUserStats(val: unknown): val is UserStats {
	return isInterface<UserStats>(val, {
		tweetCount: isNumber,
		followerCount: isNumber,
		followingCount: isNumber
	});
}

function isWhoCanReply(val: unknown): val is WhoCanReply {
	return val === "EVERYONE" || val === "FOLLOWED" || val === "MENTIONED";
}
