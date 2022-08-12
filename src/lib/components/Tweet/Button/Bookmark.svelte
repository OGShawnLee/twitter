<script lang="ts">
	import { TweetMenuItem } from "$lib/components";
	import { bookmarkTweet } from "@root/services/db";
	import { user } from "@root/state";

	export let id: string;
	export let state: "IDLE" | "SAVING" | "ERROR" = "IDLE";

	async function handleBookmark() {
		if (!$user) return;
		state = "SAVING";
		await bookmarkTweet(id, $user.document.uid);
		state = "IDLE";
	}
</script>

{#if $user && state === "IDLE"}
	<TweetMenuItem icon="bx-bookmark" text="Bookmark" on:click={handleBookmark} />
{/if}
