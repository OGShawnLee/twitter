import type { UserState } from "@root/app";
import { writable } from "svelte/store";

export const user = writable<UserState | null>(null);
