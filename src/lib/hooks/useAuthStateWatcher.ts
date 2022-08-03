import type { User } from "firebase/auth";
import type { Readable } from "svelte/store";
import type { UserDocument } from "@root/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@root/firebase";
import { onMount } from "svelte";
import { writable } from "svelte/store";
import { getUserDocument } from "@root/services/db";
import { user } from "@root/state";

export function useAuthStateWatcher(options?: {
	onNullishState?: () => void | Promise<void>;
	onUserState?: (context: {
		account: User;
		document: UserDocument | null;
		error: string | null;
	}) => void | Promise<void>;
	isRestrictedRoute?: boolean;
}): { subscribe: Readable<boolean>["subscribe"]; isLoading: Readable<boolean> } {
	const { onNullishState, onUserState, isRestrictedRoute = false } = options ?? {};
	const isLoading = writable(isRestrictedRoute);

	onMount(() =>
		onAuthStateChanged(auth, async (account) => {
			if (account === null) {
				await onNullishState?.();
				user.set(null);
			} else {
				const [document, error] = await getUserDocument(account.uid);
				onUserState?.({ account, document, error });
				if (document) user.set({ account, document });
			}

			isLoading.set(false);
		})
	);

	return { subscribe: isLoading.subscribe, isLoading };
}
