import type { UserState } from "@root/types";
import { writable } from "svelte/store";

export const user = writable<UserState | null>(null);
