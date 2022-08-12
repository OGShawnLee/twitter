import type { TweetDocument } from "@root/types";
import { getTweetDocument } from "@root/services/db";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
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
