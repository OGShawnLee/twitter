<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { collections, db } from "@root/firebase";
	import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

	export const load: Load = async () => {
		const querySnapshot = await getDocs(
			query(collection(db, collections.tweets), orderBy("createdAt", "desc"), limit(10))
		);

		try {
			const tweets = querySnapshot.docs.map((doc) => {
				const docData = doc.data();
				if (isTweetDocument(docData)) return toRuntimeTweet(docData);
				else throw new TypeError("Invalid Tweet Document");
			});
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
	import type { RuntimeTweet } from "@root/types";
	import { MobileSidebar, TopTweetPreferences } from "$lib/layout";
	import { Tweet } from "$lib/components";
	import { PopoverButton } from "malachite-ui/components";
	import { user } from "@root/state";
	import { isTweetDocument } from "$lib/predicate/db";
	import { toRuntimeTweet } from "$lib/utils";

	export let tweets: RuntimeTweet[] = [];
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
			{#each tweets as tweet}
				<Tweet {tweet} />
			{/each}
		</div>
	</section>
</main>
