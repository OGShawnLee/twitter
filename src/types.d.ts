import type { User } from "firebase/auth";
import type { FieldValue, Timestamp } from "firebase/firestore";

// * Tweet
interface DraftTweet {
	text: string | null;
	imageURL: string | null;
	whoCanReply: WhoCanReply;
	inReplyTo?: TweetReply;
}

interface NewTweetOptions {
	id: string;
	text: string | null;
	whoCanReply?: WhoCanReply;
	inReplyTo?: TweetReply;
}

interface TweetDocument extends Omit<DraftTweet, "inReplyTo"> {
	id: string;
	createdAt: Timestamp;
	user: UserHeader;
	stats: TweetStats;
	hasMedia: boolean;
	likedBy: string[]; // uid[] -> may not scale well but we worry about that later
	isReply: boolean;
	inReplyToDisplayName: string | null;
	inReplyToUID: string | null;
	inReplyToID: string | null;
}

interface TweetReply {
	id?: string;
	uid?: string;
	displayName?: string;
}

interface TweetStats {
	favouritedCount: number;
	retweetCount: number;
	replyCount: number;
}

interface RuntimeTweet extends TweetDocument {
	createdAt: string;
}

interface UpdatableTweetDocument extends Omit<TweetDocument, "id" | "stats"> {
	likedBy: FieldValue;
	stats: ToFieldValue<TweetStats>;
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

// Utility
type ToFieldValue<T> = {
	[P in keyof T]?: FieldValue;
};
