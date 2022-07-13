<script lang="ts">
	import "@root/styles/button-after.css";
	import { TweetMenuItem } from "$lib/components";
	import { ClockStars, Stars } from "$lib/svg";
	import { Menu, MenuButton, MenuItem } from "malachite-ui/components";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { hideScrollbar } from "$lib/actions";
	import { useToggle } from "$lib/hooks";
	import { tick } from "svelte";

	const isTopTweets = useToggle(true);

	let isDisabled = false;
	let buttonRef: HTMLButtonElement;
</script>

<Menu let:isOpen let:items>
	<MenuButton as="slot" let:button>
		<button
			class="button-after | after:(h-12 w-12 min-h-12 bg-zinc-800 opacity-0 transition) hover:after:opacity-100 focus:after:(opacity-100 border-2 border-white)"
			use:button
			disabled={isDisabled}
			bind:this={buttonRef}
		>
			<i class="bx bx-party text-2xl" />
			<span class="sr-only">Change Top Tweets Preferences</span>
		</button>
	</MenuButton>

	{#if isOpen}
		<div class="fixed inset-0 z-20 | bg-zinc-800/70" transition:fade|local={{ easing: cubicOut }} />
	{/if}

	<div
		slot="items"
		class="fixed inset-x-0 bottom-0 z-20 bg-zinc-900 | grid | outline-none"
		use:items
		use:hideScrollbar
		transition:fly|local={{ y: 250 }}
		on:introstart={() => (isDisabled = true)}
		on:outroend={async () => {
			isDisabled = false;
			await tick();
			buttonRef.focus();
		}}
	>
		<div class="px-6 py-4 | flex flex-col items-center gap-3 | text-center">
			{#if $isTopTweets}
				<Stars class="h-12 w-12 min-w-12" />
				<span class="text-lg font-semibold">Home shows your top Tweets first</span>
			{:else}
				<ClockStars class="h-12 w-12 min-w-12" />
				<span class="text-lg font-semibold">Latest Tweets show up as they happen</span>
			{/if}
		</div>
		<div class="h-1 w-full bg-zinc-800" />
		<TweetMenuItem icon="bx-sort-alt-2 transform rotate-90" on:click={isTopTweets.toggle}>
			<div class="grid | text-left">
				{#if $isTopTweets}
					<span> See latest Tweets instead </span>
					<span class="text-sm text-zinc-400"> You'll see Tweets show up as they happen </span>
				{:else}
					<span> Go back Home </span>
					<span class="text-sm text-zinc-400"> You'll see top Tweets first </span>
				{/if}
			</div>
		</TweetMenuItem>
		<TweetMenuItem icon="bx-cog" text="View content preferences" />
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
