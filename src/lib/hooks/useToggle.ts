import { writable } from "svelte/store";

export function useToggle(initialValue: boolean) {
	const { subscribe, update } = writable(initialValue);
	return { subscribe, toggle: () => update((bool) => !bool) };
}
