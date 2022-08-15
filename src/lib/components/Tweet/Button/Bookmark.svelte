<script lang="ts">
	import { TweetContext } from "$lib/components/Context";
	import { TweetMenuItem } from "$lib/components";
	import { bookmarkTweet, deleteUserBookmark } from "@root/services/db";
	import { user } from "@root/state";
	import { writable } from "svelte/store";
	import { onDestroy } from "svelte";

	const { isBookmarked = writable(false), onDelete } = TweetContext.getContext(false) || {};

	export let id: string;
	export let state: "IDLE" | "SAVING" | "ERROR" = "IDLE";

	let isBookmarkDeleted = false;

	async function handleBookmark() {
		if (!$user) return;

		if ($isBookmarked) {
			state = "SAVING";
			await deleteUserBookmark($user.account.uid, id);
			isBookmarkDeleted = true;
			state = "IDLE";
		} else {
			state = "SAVING";
			await bookmarkTweet(id, $user.document.uid);
			state = "IDLE";
		}
	}

	onDestroy(() => isBookmarkDeleted && onDelete?.(id));
</script>

{#if $user && state === "IDLE"}
	<TweetMenuItem
		icon={$isBookmarked ? "bx-bookmark-minus" : "bx-bookmark"}
		text={$isBookmarked ? "Remove Tweet from Bookmarks" : "Bookmark"}
		isDanger={$isBookmarked}
		on:click={handleBookmark}
	/>
{/if}
