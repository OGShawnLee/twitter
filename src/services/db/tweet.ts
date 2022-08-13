import type { TweetDocument } from "@root/types";
import { getTweetDocument } from "@root/services/db";
import {
	arrayRemove,
	arrayUnion,
	doc,
	increment,
	serverTimestamp,
	setDoc,
	writeBatch
} from "firebase/firestore";
import { collections, db } from "@root/firebase";
import { useAwait } from "$lib/hooks";
import { isBookmarked } from "$lib/predicate/db";

export async function bookmarkTweet(tid: string, uid: string) {
	return useAwait(async () => {
		const [exists, error] = await isBookmarked(tid, uid);
		if (error) throw new Error("Unable to Check if Tweet is Bookmarked");
		if (exists) return false;
		try {
			setDoc(doc(db, collections.bookmarks(uid), tid), {
				id: tid,
				createdAt: serverTimestamp()
			});
			return true;
		} catch {
			throw new Error("Unable to Bookmark Tweet");
		}
	});
}

export async function getTweetReplyingTo({
	inReplyToDisplayName,
	inReplyToID,
	isReply
}: TweetDocument): Promise<TweetDocument[]> {
	if (!isReply || !inReplyToDisplayName || !inReplyToID) return [];
	const [tweet] = await getTweetDocument(inReplyToID, inReplyToDisplayName);
	return tweet ? [tweet, ...(await getTweetReplyingTo(tweet))] : [];
}

export async function handleLikeTweet(
	uid: string,
	configuration: {
		isFavourite: boolean;
		tweet: { id: string; uid: string };
		onDislike?: () => void;
		onLike?: () => void;
	}
) {
	const { isFavourite, tweet, onDislike, onLike } = configuration;
	// WE'LL USE A SECURITY RULE TO PREVENT INCORRECT DATA - WE DO THIS AS OF NOW
	if (uid === tweet.uid) return;

	const batch = writeBatch(db);
	const likeRef = doc(db, collections.likes(uid), tweet.id);

	if (isFavourite) {
		batch.update(doc(db, collections.tweets, tweet.id), {
			favouriteCount: increment(-1),
			likedBy: arrayRemove(uid)
		});
		batch.delete(likeRef);
		return await batch.commit(), onDislike?.();
	}

	batch.update(doc(db, collections.tweets, tweet.id), {
		favouriteCount: increment(1),
		likedBy: arrayUnion(uid)
	});
	batch.set(likeRef, {
		uid: uid,
		id: likeRef.id,
		likedAt: serverTimestamp()
	});
	await batch.commit(), onLike?.();
}
