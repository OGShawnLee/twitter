<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { collections, db } from "@root/firebase";
	import {
		collection,
		getDocs,
		limit,
		onSnapshot,
		orderBy,
		query,
		where
	} from "firebase/firestore";

	export const load: Load = async () => {
		const querySnapshot = await getDocs(
			query(
				collection(db, collections.tweets),
				orderBy("createdAt", "desc"),
				where("isReply", "==", false),
				limit(10)
			)
		);

		try {
			const tweets = generateTweetDocuments(querySnapshot);
			return { status: 200, props: { tweets } };
		} catch {
			return {
				status: 500,
				error: {
					name: "Type Error",
					message: "Invalid Tweet Document"
				}
			};
		}
	};
</script>

<script lang="ts">
	import type { TweetDocument } from "@root/types";
	import { MobileSidebar, TopTweetPreferences } from "$lib/layout";
	import { Tweet } from "$lib/components";
	import { PopoverButton } from "malachite-ui/components";
	import { user } from "@root/state";
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { generateTweetDocuments } from "$lib/utils";

	export let tweets: TweetDocument[] = [];

	// ? temporal
	onMount(() =>
		onSnapshot(
			query(
				collection(db, collections.tweets),
				orderBy("createdAt", "desc"),
				where("isReply", "==", false),
				limit(10)
			),
			(collectionSnapshot) => {
				tweets = generateTweetDocuments(collectionSnapshot);
			}
		)
	);
</script>

<svelte:head>
	<title>Twitter</title>
</svelte:head>

<MobileSidebar>
	<div class="flex items-center gap-4">
		<PopoverButton class="h-12 min-w-12 rounded-full outline-none focus:(ring-2 ring-white)">
			<img class="h-full w-full rounded-full" src={$user?.document?.imageURL} alt="" />
			<span class="sr-only">View Account Info</span>
		</PopoverButton>
		<h1 class="text-2xl font-medium">Home</h1>
	</div>
	<TopTweetPreferences />
</MobileSidebar>

<main class="max-w-md w-full mx-auto px-6 my-24">
	<section class="after:text-red-400">
		<h2 class="sr-only">Tweets</h2>
		<div class="grid gap-12">
			{#each tweets as tweet (tweet.id)}
				<div out:slide|local={{ easing: cubicOut }}>
					<Tweet {tweet} />
				</div>
			{/each}
		</div>
	</section>
</main>
