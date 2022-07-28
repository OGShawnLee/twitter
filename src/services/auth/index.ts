import { auth } from "@root/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserDocument } from "@root/services/db";
import { useAwait } from "$lib/hooks";
import { isNewUser } from "$lib/predicate/db";

export function createUserWithGoogle() {
	return useAwait(async () => {
		const userCredentials = await signInWithPopup(auth, new GoogleAuthProvider());
		const [isNew, error] = await isNewUser(userCredentials.user.uid);

		console.log(error);
		if (error) throw new Error("Sign Up (Google): Unable to check new user.");
		if (isNew) await createUserDocument(userCredentials.user);

		return userCredentials;
	});
}
