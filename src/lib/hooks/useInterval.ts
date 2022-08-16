import { onMount } from "svelte";

export function useInterval(callback: () => void, ms?: number) {
	onMount(() => {
		const interval = setInterval(callback, ms);
		return () => clearInterval(interval);
	});
}
