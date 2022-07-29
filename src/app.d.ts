/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

interface UserDocument {
	uid: string;
	createdAt: string;
	name: string | null;
	displayName: string | null;
	imageURL: string | null;
	bannerURL: string | null;
	description: string | null;
	isVerified: boolean;
	stats: UserStats;
	url: string | null;
	location: string | null;
}

interface UserStats {
	tweetCount: number;
	followerCount: number;
	followingCount: number;
}
