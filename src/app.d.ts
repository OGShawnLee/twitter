/// <reference types="@sveltejs/kit" />

import type { FieldValue, Timestamp } from "firebase/firestore";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

// * Tweet
interface DraftTweet {
	text: string | null;
	imageURL: string | null;
	whoCanReply: WhoCanReply;
}

interface TweetDocument extends DraftTweet {
	id: string;
	createdAt: Timestamp;
	user: UserHeader;
	stats: TweetStats;
}

interface TweetStats {
	favouritedCount: number;
	retweetCount: number;
	replyCount: number;
}

interface RuntimeTweet extends TweetDocument {
	isFavourite: boolean; // current user has favourited this tweet?
	createdAt: string;
}

type WhoCanReply = "EVERYONE" | "FOLLOWED" | "MENTIONED";

// * USER
interface UserState {
	account: User;
	document: UserDocument;
}

interface UserStats {
	followerCount: number;
	followingCount: number;
	tweetCount: number;
}

interface UserHeader {
	uid: string;
	name: string | null;
	displayName: string | null;
	imageURL: string | null;
	stats?: UserStats;
	description: string | null;
}

interface UserDocument extends UserHeader {
	uid: string;
	createdAt: string;
	bannerURL: string | null;
	isVerified: boolean;
	stats: UserStats;
	url: string | null;
	location: string | null;
}

interface UserDocumentTimestamp extends Omit<UserDocument, "createdAt"> {
	createdAt: FieldValue | string;
}

interface RuntimeUser {
	isFollowing: boolean; // current user follows this user?
}

interface UpdatableUserDocument extends Omit<UserDocument, "uid" | "stats" | "whoCanReply"> {
	stats: {
		followerCount?: FieldValue;
		followingCount?: FieldValue;
		tweetCount?: FieldValue;
	};
}
