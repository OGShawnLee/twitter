import { writable } from "svelte/store";

export const user = writable<UserDocument | null>(null);
