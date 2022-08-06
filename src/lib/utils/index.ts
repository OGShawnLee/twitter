import type { RuntimeTweet, TweetDocument } from "@root/types";
import type { QuerySnapshot } from "firebase/firestore";
import { isValidImageFileType } from "$lib/predicate";
import { isTweetDocument } from "$lib/predicate/db";
import { isString } from "malachite-ui/predicate";

export function generateRuntimeTweets(querySnapshot: QuerySnapshot) {
	return querySnapshot.docs.map((doc) => {
		const docData = doc.data();
		if (isTweetDocument(docData)) return toRuntimeTweet(docData);
		else throw new TypeError("Invalid Tweet Document");
	});
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

export function toUnderscore(str: string) {
	return str.trim().replace(/\s+/g, "_");
}

export function toRuntimeTweet(document: TweetDocument): RuntimeTweet {
	return { ...document, createdAt: document.createdAt.toDate().toDateString() };
}
