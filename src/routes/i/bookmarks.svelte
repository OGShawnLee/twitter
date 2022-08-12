<script lang="ts">
	import type { RuntimeTweet } from "@root/types";
	import { ButtonRounded, Header, Tweet } from "$lib/components";
	import { Circle3 as Circle } from "svelte-loading-spinners";
	import { user } from "@root/state";
	import { onMount } from "svelte";
	import { getUserBookmarks } from "@root/services/db/user";
	import { slide } from "svelte/transition";
	import { cubicOut } from "svelte/easing";

	// TODO: HANDLE ERROR

	let bookmarks: RuntimeTweet[] = [];
	let state: "LOADED" | "LOADING" | "ERROR" = "LOADING";

	onMount(async () => {
		if (!$user) return;
		const [tweets] = await getUserBookmarks($user.document.uid);

		if (tweets) {
			bookmarks = tweets;
			state = "LOADED";
			return;
		}

		state = "ERROR";
	});
</script>

<svelte:head>
	<title>Bookmarks / Twitter</title>
</svelte:head>

<Header>
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
				<div in:slide={{ easing: cubicOut }}>
					<Tweet tweet={bookmark} />
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
