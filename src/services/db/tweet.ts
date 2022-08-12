import type { TweetDocument } from "@root/types";
import { getTweetDocument } from "@root/services/db";

export async function getTweetReplyingTo({
	inReplyToDisplayName,
	inReplyToID,
	isReply
}: TweetDocument): Promise<TweetDocument[]> {
	if (!isReply || !inReplyToDisplayName || !inReplyToID) return [];
	const [tweet] = await getTweetDocument(inReplyToID, inReplyToDisplayName);
	return tweet ? [tweet, ...(await getTweetReplyingTo(tweet))] : [];
}
