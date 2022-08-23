import type {
	BookmarkDocument,
	ChatDocument,
	ChatUser,
	FollowDocument,
	LikeDocument,
	MessageDocument,
	TweetDocument,
	UserDocument,
	UserHeader,
	UserStats,
	WhoCanReply
} from "@root/types";
import { collections, db } from "@root/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAwait } from "$lib/hooks";
import { isBoolean, isInterface, isNumber, isObject, isString } from "malachite-ui/predicate";
import { isStringOrNull, isTimestamp } from "./core";

export function isBookmarkDocument(val: unknown): val is BookmarkDocument {
	return isInterface<BookmarkDocument>(val, {
		id: isString,
		createdAt: isTimestamp
	});
}

export function isBookmarked(tid: string, uid: string) {
	return useAwait(async () => {
		const documentSnapshot = await getDoc(doc(db, collections.bookmarks(uid), tid));
		return documentSnapshot.exists();
	});
}

export function isMessageDocument(val: unknown): val is MessageDocument {
	return isInterface<MessageDocument>(val, {
		id: isString,
		user: isChatUser,
		createdAt: isTimestamp,
		imageURL: isStringOrNull,
		text: isStringOrNull,
		hasBeenSeen: isBoolean
	});
}

export function isChatUser(val: unknown): val is ChatUser {
	return isInterface<ChatUser>(val, {
		uid: isString,
		name: isStringOrNull,
		displayName: isStringOrNull,
		isVerified: isBoolean,
		imageURL: isStringOrNull
	});
}

export function isChatDocument(val: unknown): val is ChatDocument {
	return isInterface<ChatDocument>(val, {
		id: isString,
		createdAt: isTimestamp,
		lastUpdated: isTimestamp,
		lastMessage: (val): val is MessageDocument | null => val === null || isMessageDocument(val),
		members: isObject as Predicate<Record<string, boolean>>,
		membersList: Array.isArray,
		sender: isChatUser,
		receiver: isChatUser,
		messageCount: isNumber
	});
}

export function isFollowDocument(val: unknown): val is FollowDocument {
	return isInterface<FollowDocument>(val, {
		id: isString,
		uid: isString,
		createdAt: isTimestamp
	});
}

export async function isFollowingUser(uid: string, id: string) {
	return useAwait(async () => {
		const followDocument = await getDoc(doc(db, collections.following(uid), id));
		return followDocument.exists();
	});
}

export function isLikeDocument(val: unknown): val is LikeDocument {
	return isInterface<LikeDocument>(val, {
		uid: isString,
		id: isString,
		likedAt: isTimestamp
	});
}

export function isNewUser(uid: string) {
	return useAwait(async () => {
		const userDoc = await getDoc(doc(db, collections.users, uid));
		return !userDoc.exists();
	});
}

export function isTweetDocument(val: unknown): val is TweetDocument {
	return isInterface<TweetDocument>(val, {
		id: isString,
		createdAt: isTimestamp,
		user: isUserHeader,
		text: isStringOrNull,
		favouriteCount: isNumber,
		replyCount: isNumber,
		retweetCount: isNumber,
		imageURL: isStringOrNull,
		whoCanReply: isWhoCanReply,
		hasMedia: isBoolean,
		likedBy: Array.isArray,
		isReply: isBoolean,
		inReplyToDisplayName: isStringOrNull,
		inReplyToID: isStringOrNull,
		inReplyToUID: isStringOrNull
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
