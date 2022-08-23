import type { FirebaseOptions } from "firebase/app";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

function getUniqueApp(settings: FirebaseOptions) {
	return isInitialised() ? getApp() : initializeApp(settings);
}

function isInitialised() {
	return getApps().length >= 1;
}

const app = getUniqueApp({
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID
});

export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const collections = Object.freeze({
	tweets: "Tweets",
	users: "Users",
	chats: "Chats",
	bookmarks(uid: string) {
		return `${this.users}/${uid}/Bookmarks`;
	},
	messages(id: string) {
		return `${this.chats}/${id}/Messages`;
	},
	following(uid: string) {
		return `${this.users}/${uid}/Following`;
	},
	likes(uid: string) {
		return `${this.users}/${uid}/Likes`;
	}
});
