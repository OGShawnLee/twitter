<script lang="ts">
	import type { RuntimeTweet } from "@root/types";
	import { ButtonRounded, Header, Tweet, TweetMenuItem } from "$lib/components";
	import { Menu, MenuButton, MenuItem } from "malachite-ui/components";
	import { Circle3 as Circle, DoubleBounce } from "svelte-loading-spinners";
	import { user } from "@root/state";
	import { onMount } from "svelte";
	import { getUserBookmarks } from "@root/services/db";
	import { fade, fly, slide } from "svelte/transition";
	import { hideScrollbar } from "$lib/actions";
	import { cubicOut } from "svelte/easing";
	import { clearUserBookmarks } from "@root/services/db/user";

	// TODO: HANDLE ERROR

	let bookmarks: RuntimeTweet[] = [];
	let state: "LOADED" | "LOADING" | "ERROR" = "LOADING";
	let bookmarkClearState: "CLEARING" | "IDLE" | "ERROR" = "IDLE";

	async function handleClearBookmarks() {
		if (!$user) return;
		bookmarkClearState = "CLEARING";
		try {
			await clearUserBookmarks($user.account.uid);
			bookmarkClearState = "IDLE";
			bookmarks = [];
		} catch (error) {
			bookmarkClearState = "ERROR";
		}
	}

	function handleBookmarkRemoval({ detail }: CustomEvent<string>) {
		bookmarks = bookmarks.filter(({ id }) => id !== detail);
	}

	onMount(async () => {
		if (!$user) return;
		const [tweets] = await getUserBookmarks($user.document.uid);

		if (tweets) {
			bookmarks = tweets;
			return (state = "LOADED");
		}

		state = "ERROR";
	});
</script>

<svelte:head>
	<title>Bookmarks / Twitter</title>
</svelte:head>

<Header class="justify-between">
	<div class="flex items-center gap-4">
		<ButtonRounded on:click={() => history.back()}>
			<i class="bx bxs-left-arrow-alt | text-2xl" />
			<span class="sr-only">Go Back</span>
		</ButtonRounded>
		<div class="grid">
			<div class="flex items-center gap-3">
				<h1 class="text-xl font-medium">Bookmarks</h1>
			</div>
			<span class="text-xs text-zinc-500">@{$user?.document?.displayName}</span>
		</div>
	</div>
	{#if bookmarks.length}
		<Menu let:items let:isOpen>
			{#if bookmarkClearState === "IDLE"}
				<MenuButton
					class="button-after button-after-10 button-after--zinc | z-5 | group outline-none after:transition"
				>
					<span class="sr-only">Options</span>
					<i
						class="bx bx-dots-horizontal-rounded text-zinc-400 text-2xl group-hover:text-white group-focus:text-white"
					/>
				</MenuButton>
			{:else}
				<DoubleBounce size="32" color="#0EA5E9" />
			{/if}

			{#if isOpen}
				<div
					class="fixed inset-0 z-20 | bg-zinc-800/70"
					transition:fade|local={{ easing: cubicOut }}
				/>
			{/if}

			<div
				class="fixed inset-x-0 bottom-0 z-20 bg-zinc-900 | grid | outline-none"
				slot="items"
				use:items
				use:hideScrollbar
				transition:fly|local={{ y: 250 }}
			>
				<TweetMenuItem
					icon="bx-trash"
					text="Clear all Bookmarks"
					isExtremeDanger
					on:click={handleClearBookmarks}
				/>
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
	{/if}
</Header>

<main class="max-w-md w-full mx-auto px-6 my-24">
	{#if state === "LOADING"}
		<div class="fixed inset-0 grid place-content-center">
			<Circle
				size="64"
				ballBottomLeft="#F43F5E"
				ballBottomRight="#F59E0B"
				ballTopLeft="#14b8a6"
				ballTopRight="#6366F1"
			/>
		</div>
	{:else if state === "LOADED"}
		<div class="grid gap-12">
			{#each bookmarks as bookmark (bookmark.id)}
				<div in:slide={{ easing: cubicOut }} out:slide|local={{ easing: cubicOut }}>
					<Tweet tweet={bookmark} isBookmarked on:bookmarkRemoval={handleBookmarkRemoval} />
				</div>
			{:else}
				<div class="grid gap-6">
					<img
						src="https://abs.twimg.com/sticky/illustrations/empty-states/book-in-bird-cage-800x400.v1.png"
						width="800"
						height="400"
						alt=""
					/>
					<div class="grid gap-1.5 | text-center">
						<span class="text-3xl font-semibold"> Save Tweets for later </span>
						<span class="text-sm text-zinc-400">
							Don't let the good ones fly away! Bookmark Tweets to easily find them again in the
							future.
						</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</main>
