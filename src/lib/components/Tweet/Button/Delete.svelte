<script lang="ts">
	import { TweetContext } from "$lib/components/Context";
	import { TweetMenuItem } from "$lib/components";
	import { deleteTweet } from "@root/services/db";
	import { onDestroy } from "svelte";

	const { onDelete } = TweetContext.getContext(false) || {};

	export let id: string;
	export let uid: string;
	export let hasImageURL: boolean;

	let hasBeenDeleted = false;

	async function handleDelete() {
		hasBeenDeleted = true;
	}

	onDestroy(async () => {
		if (hasBeenDeleted) {
			await deleteTweet(id, uid, hasImageURL);
			onDelete?.(id);
		}
	});
</script>

<TweetMenuItem icon="bx-trash" text="Delete" isDanger on:click={handleDelete} />
