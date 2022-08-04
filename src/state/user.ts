import type { UserState } from "@root/types";
import { derived, writable } from "svelte/store";

export const user = writable<UserState | null>(null);
export const isLoggedIn = derived(user, (user) => user !== null);
