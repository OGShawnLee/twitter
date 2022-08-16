<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
	import { collections, db } from "@root/firebase";

	export const load: Load = async ({ stuff: context }) => {
		if (!context.displayName) return { status: 500 };

		const querySnapshot = await getDocs(
			query(
				collection(db, collections.tweets),
				where("user.displayName", "==", context.displayName),
				orderBy("createdAt", "desc"),
				limit(10)
			)
		);

		try {
			const tweets = generateTweetDocuments(querySnapshot);
			return { status: 200, props: { tweets } };
		} catch (error) {
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
	import { Tweet } from "$lib/components";
	import { generateTweetDocuments } from "$lib/utils";

	export let tweets: TweetDocument[] = [];
</script>

<div class="grid gap-12">
	{#each tweets as tweet}
		<Tweet {tweet} />
	{/each}
</div>
