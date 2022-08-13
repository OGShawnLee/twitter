import type { UserDocument } from "@root/types";
import { collections, db, storage } from "@root/firebase";
import {
	collection,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	where,
	writeBatch
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { isEmpty } from "malachite-ui/predicate";
import { useAwait } from "$lib/hooks";
import { isBookmarkDocument, isLikeDocument, isTweetDocument } from "$lib/predicate/db";
import { generateRuntimeTweets, joinWithIDs } from "$lib/utils";

export function getUserLikes(uid: string) {
	return useAwait(async () => {
		const querySnapshot = await getDocs(
			query(collection(db, collections.likes(uid)), orderBy("likedAt", "desc"), limit(10))
		);
		const initialTweetsIDs = querySnapshot.docs.map((document) => {
			const data = document.data();
			if (isLikeDocument(data)) return data.id;
			else throw new Error("Invalid Like Document");
		});
		const initialTweets = await joinWithIDs(
			collection(db, collections.tweets),
			initialTweetsIDs,
			isTweetDocument
		);
		return initialTweets;
	});
}

export async function getUserBookmarks(uid: string) {
	return useAwait(async () => {
		const querySnapshot = await getDocs(
			query(collection(db, collections.bookmarks(uid)), orderBy("createdAt", "desc"))
		);
		const initialTweetsIDs = querySnapshot.docs.map((document) => {
			const data = document.data();
			if (isBookmarkDocument(data)) return data.id;
			throw new Error("Invalid Bookmark Document");
		});
		const initialTweets = await joinWithIDs(
			collection(db, collections.tweets),
			initialTweetsIDs,
			isTweetDocument
		);
		return generateRuntimeTweets(initialTweets);
	});
}

export async function updateUserProfile(
	user: UserDocument,
	configuration: {
		bannerURL: string | null;
		imageURL: string | null;
		name: string;
		description: string | null;
		location: string | null;
		url: string | null;
	}
) {
	const { uid, bannerURL: initialBannerURL, imageURL: initialImageURL } = user;
	let { bannerURL, imageURL, name, description, location, url } = configuration;

	if (bannerURL && bannerURL !== initialBannerURL && !isEmpty(bannerURL)) {
		const id = doc(collection(db, collections.users)).id;
		const fileRef = ref(storage, "/users/" + id);
		await uploadString(fileRef, bannerURL, "data_url");
		bannerURL = await getDownloadURL(fileRef);
	}

	if (configuration.imageURL === configuration.bannerURL) {
		imageURL = bannerURL;
	} else if (imageURL && imageURL !== initialImageURL && !isEmpty(imageURL)) {
		const id = doc(collection(db, collections.users)).id;
		const fileRef = ref(storage, "/users/" + id);
		await uploadString(fileRef, imageURL, "data_url");
		imageURL = await getDownloadURL(fileRef);
	}

	// ? we should probably handle this with a function
	const batch = writeBatch(db);
	const userRef = doc(db, collections.users, uid);
	batch.update(userRef, { bannerURL, imageURL, name, description, location, url });
	const tweets = await getDocs(
		query(collection(db, collections.tweets), where("user.uid", "==", user.uid))
	);

	tweets.docs.forEach((document) => {
		batch.update(document.ref, {
			user: {
				...user,
				bannerURL,
				imageURL,
				name,
				description,
				location,
				url
			}
		});
	});

	return batch.commit();
}
