import type { User } from "firebase/auth";
import type { FieldValue, Timestamp } from "firebase/firestore";

// * Bookmark
interface BookmarkDocument {
	id: string; // ? tweet id
	createdAt: Timestamp;
}

// * Likes
interface LikeDocument {
	uid: string;
	id: string; // ? tweet id
	likedAt: Timestamp;
}

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
	inReplyTo?: TweetReply | null;
}

interface TweetDocument extends Omit<DraftTweet, "inReplyTo"> {
	id: string;
	createdAt: Timestamp;
	user: UserHeader;
	favouriteCount: number;
	retweetCount: number;
	replyCount: number;
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

interface UpdatableTweetDocument extends Omit<TweetDocument, "id"> {
	likedBy: FieldValue;
	favouriteCount: FieldValue;
	retweetCount: FieldValue;
	replyCount: FieldValue;
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

interface UpdatableUserDocument extends Omit<UserDocument, "uid" | "stats"> {
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
