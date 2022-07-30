/// <reference types="@sveltejs/kit" />

import type { FieldValue } from "firebase/firestore";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

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
