<script lang="ts">
	import { TweetMenuItem, TweetButtonBookmark } from "$lib/components";
	import { Menu, MenuItem } from "malachite-ui/components";
	import { DoubleBounce } from "svelte-loading-spinners";
	import { hideScrollbar } from "$lib/actions";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";

	export let id: string;
	export let loaderSize = 20;

	let bookmarkState: "IDLE" | "SAVING" | "ERROR" = "IDLE";
</script>

<Menu let:isOpen let:button let:items>
	{#if bookmarkState === "IDLE"}
		<slot {button} />
	{:else if bookmarkState === "SAVING"}
		<DoubleBounce size={loaderSize} color="#0EA5E9" />
	{/if}

	{#if isOpen}
		<div class="fixed inset-0 z-20 | bg-zinc-800/70" transition:fade|local={{ easing: cubicOut }} />
	{/if}

	<div
		class="fixed inset-x-0 bottom-0 z-20 bg-zinc-900 | grid | text-white outline-none"
		slot="items"
		use:items
		use:hideScrollbar
		transition:fly|local={{ y: 250 }}
	>
		<TweetMenuItem icon="bx-envelope" text="Send via Direct Message" />
		<TweetButtonBookmark bind:state={bookmarkState} {id} />
		<TweetMenuItem icon="bx-link" text="Copy link to Tweet" />
		<MenuItem
			as="button"
			class={{
				base: "min-h-10.5 mx-6 my-4 px-6 py-2 | rounded-full border-2",
				selected: { on: "border-white", off: "border-zinc-600" }
			}}
		>
			Cancel
		</MenuItem>
	</div>
</Menu>
