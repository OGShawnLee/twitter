import type { UserDocument } from "@root/types";
import { collections, db, storage } from "@root/firebase";
import { collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { isEmpty } from "malachite-ui/predicate";

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
