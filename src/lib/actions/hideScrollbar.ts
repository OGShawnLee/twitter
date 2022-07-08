import type { Action } from "svelte/action";

export const hideScrollbar: Action = () => {
	const body = document.body;
	const initialOverflow = body.style.overflow;
	body.style.overflow = "hidden";
	return {
		destroy: () => (body.style.overflow = initialOverflow)
	};
};
