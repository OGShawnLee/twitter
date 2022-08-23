import type { FollowDocument, UserDocument } from "@root/types";
import type { Timestamp } from "firebase/firestore";
import { collections, db, storage } from "@root/firebase";
import {
	collection,
	collectionGroup,
	deleteDoc,
	doc,
	getDocs,
	increment,
	limit,
	orderBy,
	query,
	serverTimestamp,
	where,
	writeBatch
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { isEmpty } from "malachite-ui/predicate";
import { useAwait } from "$lib/hooks";
import {
	isBookmarkDocument,
	isChatDocument,
	isFollowDocument,
	isFollowingUser,
	isLikeDocument,
	isTweetDocument,
	isUserDocument
} from "$lib/predicate/db";
import { filterSnapshot, joinWithIDs } from "$lib/utils";
import { writable } from "svelte/store";
import type { FirebaseError } from "firebase/app";
import { onMount } from "svelte";
import { makeReadable } from "malachite-ui/utils";
import type { Unsubscribe } from "firebase/auth";

export async function clearUserBookmarks(uid: string) {
	// ? WE SHOULD PROBABLY HANDLE THIS IN A SERVER ENVIRONMENT
	const querySnapshot = await getDocs(
		query(collection(db, collections.bookmarks(uid)), orderBy("createdAt", "desc"))
	);
	const batch = writeBatch(db);
	querySnapshot.forEach((document) => batch.delete(document.ref));
	return batch.commit();
}

export function deleteUserBookmark(uid: string, id: string) {
	return deleteDoc(doc(db, collections.bookmarks(uid), id));
}

async function followUser(uid: string, id: string): Promise<{ error: null | string }> {
	const batch = writeBatch(db);
	batch.update(doc(db, collections.users, uid), {
		"stats.followingCount": increment(1)
	});
	batch.update(doc(db, collections.users, id), {
		"stats.followerCount": increment(1)
	});
	const followRef = doc(db, collections.following(uid), id);
	batch.set(followRef, createFollowDocument(uid, id));
	try {
		await batch.commit();
		return { error: null };
	} catch {
		return { error: "Unable to Follow User" };
	}
}

function createFollowDocument(uid: string, id: string): FollowDocument {
	return { id, uid, createdAt: serverTimestamp() as Timestamp };
}

export function getUserFollowing(uid: string) {
	return useAwait(async () => {
		const querySnapshot = await getDocs(
			query(collection(db, collections.following(uid)), orderBy("createdAt"), limit(10))
		);
		const followingUIDs = querySnapshot.docs.map((document) => {
			const data = document.data();
			if (isFollowDocument(data)) return data.id;
			throw new Error("Invalid Follow Document");
		});
		return joinWithIDs(collection(db, collections.users), followingUIDs, isUserDocument);
	});
}

export function getUserFollowers(uid: string) {
	return useAwait(async () => {
		const querySnapshot = await getDocs(
			query(
				collectionGroup(db, "Following"),
				where("id", "==", uid),
				orderBy("createdAt", "desc"),
				limit(10)
			)
		);
		const followersUIDs = querySnapshot.docs.map((document) => {
			const data = document.data();
			if (isFollowDocument(data)) return data.uid;
			throw new Error("Invalid Follow Document");
		});
		return joinWithIDs(collection(db, collections.users), followersUIDs, isUserDocument);
	});
}

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
		return await joinWithIDs(collection(db, collections.tweets), initialTweetsIDs, isTweetDocument);
	});
}

export async function handleFollowUser(uid: string, id: string) {
	const [isFollowing, error] = await isFollowingUser(uid, id);
	if (error) return { error: "Unable to Check Following State" };
	if (isFollowing) {
		const { error } = await unfollowUser(uid, id);
		return error ? { error } : { isFollowing: false };
	} else {
		const { error } = await followUser(uid, id);
		return error ? { error } : { isFollowing: true };
	}
}

async function unfollowUser(uid: string, id: string): Promise<{ error: null | string }> {
	const batch = writeBatch(db);
	batch.update(doc(db, collections.users, uid), {
		"stats.followingCount": increment(-1)
	});
	batch.update(doc(db, collections.users, id), {
		"stats.followerCount": increment(-1)
	});
	const followRef = doc(db, collections.following(uid), id);
	batch.delete(followRef);
	try {
		await batch.commit();
		return { error: null };
	} catch {
		return { error: "Unable to Unfollow User" };
	}
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
