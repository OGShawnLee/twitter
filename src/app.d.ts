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

interface UserData {
	uid: string;
	createdAt: string;
	name: string;
	displayName: string;
	imageURL: string | null;
	bannerURL: string | null;
	description: string;
	isVerified: boolean;
	stats: UserStats;
}

interface UserStats {
	tweetCount: number;
	followerCount: number;
}
