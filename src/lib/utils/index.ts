import { isValidImageFileType } from "$lib/predicate";
import type { RuntimeTweet, TweetDocument } from "@root/types";
import { isString } from "malachite-ui/predicate";

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
	return { ...document, createdAt: document.createdAt.toDate().toDateString(), isFavourite: false };
}
