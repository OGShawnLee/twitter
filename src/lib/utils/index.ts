import type { RuntimeTweet, TweetDocument } from "@root/types";
import { type CollectionReference, QuerySnapshot } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { isValidImageFileType } from "$lib/predicate";
import { isTweetDocument } from "$lib/predicate/db";
import { isString } from "malachite-ui/predicate";

export function generateRuntimeTweets(querySnapshot: QuerySnapshot): RuntimeTweet[];
export function generateRuntimeTweets(documents: TweetDocument[]): RuntimeTweet[];

export function generateRuntimeTweets(queryOrDocuments: QuerySnapshot | TweetDocument[]) {
	if (queryOrDocuments instanceof QuerySnapshot) {
		return queryOrDocuments.docs.map((doc) => {
			const docData = doc.data();
			if (isTweetDocument(docData)) return toRuntimeTweet(docData);
			else throw new TypeError("Invalid Tweet Document");
		});
	}
	return queryOrDocuments.map(toRuntimeTweet);
}

export function getImageFilePathURL(file: File) {
	return new Promise<string>((resolve, reject) => {
		if (!isValidImageFileType(file.type)) return reject("Invalid Image File");

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = ({ target }) => {
			const imageResult = target?.result;
			if (isString(imageResult)) resolve(imageResult);
			else reject("Invalid Image");
		};
	});
}

export async function joinWithIDs<T>(
	collection: CollectionReference,
	ids: string[],
	predicate: (document: unknown) => document is T
) {
	const readList = ids.map((id) => getDoc(doc(collection, id)));
	const result = await Promise.all(readList);
	return result.map((document) => {
		const data = document.data();
		if (predicate(data)) return data;
		else throw new Error("Invalid Document Type");
	});
}

export function toUnderscore(str: string) {
	return str.trim().replace(/\s+/g, "_");
}

export function toRuntimeTweet(document: TweetDocument): RuntimeTweet {
	return { ...document, createdAt: document.createdAt.toDate().toDateString() };
}
