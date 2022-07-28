import type { User } from "firebase/auth";
import type { Readable } from "svelte/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@root/firebase";
import { onMount } from "svelte";
import { writable } from "svelte/store";
import { getUserDocument } from "@root/services/db";
import { user } from "@root/state";

export function useAuthStateWatcher(options?: {
	onNullishState?: () => void | Promise<void>;
	onUserState?: (context: {
		user: User;
		userDocument: UserDocument | null;
		error: string | null;
	}) => void | Promise<void>;
	isRestrictedRoute?: boolean;
}): { subscribe: Readable<boolean>["subscribe"]; isLoading: Readable<boolean> } {
	const { onNullishState, onUserState, isRestrictedRoute = false } = options ?? {};
	const isLoading = writable(isRestrictedRoute);

	onMount(() =>
		onAuthStateChanged(auth, async (userState) => {
			if (userState === null) {
				await onNullishState?.();
				user.set(null);
			} else {
				const [userDocument, error] = await getUserDocument(userState.uid);
				onUserState?.({ user: userState, userDocument, error });
				if (userDocument) user.set(userDocument);
			}

			isLoading.set(false);
		})
	);

	return { subscribe: isLoading.subscribe, isLoading };
}