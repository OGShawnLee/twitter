import type { User } from "firebase/auth";
import type { Readable } from "svelte/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@root/firebase";
import { onMount } from "svelte";
import { writable } from "svelte/store";
import { isRestrictedRoute } from "$lib/predicate";

export function useAuthStateWatcher(options?: {
	onNullishState?: () => void | Promise<void>;
	onUserState?: (context: { user: User; userData: UserData | null }) => void | Promise<void>;
	isRestrictedRoute?: boolean;
}): { subscribe: Readable<boolean>["subscribe"]; isLoading: Readable<boolean> } {
	const { onNullishState, onUserState, isRestrictedRoute = false } = options ?? {};
	const isLoading = writable(isRestrictedRoute);

	onMount(() =>
		onAuthStateChanged(auth, async (userState) => {
			if (userState === null) {
				await onNullishState?.();
			} else {
				// TODO: GET USER DATA
			}

			isLoading.set(false);
		})
	);

	return { subscribe: isLoading.subscribe, isLoading };
}
