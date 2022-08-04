<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { collections, db } from "@root/firebase";
	import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
	import { generateRuntimeTweets } from "$lib/utils";

	export const load: Load = async ({ stuff: context }) => {
		if (!context.uid) return { status: 500 };

		const querySnapshot = await getDocs(
			query(
				collection(db, collections.tweets),
				where("user.uid", "==", context.uid),
				where("hasMedia", "==", true),
				orderBy("createdAt", "desc"),
				limit(10)
			)
		);

		try {
			return { status: 200, props: { tweets: generateRuntimeTweets(querySnapshot) } };
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
	import { Tweet } from "$lib/components";

	export let tweets: RuntimeTweet[] = [];
</script>

<div class="grid gap-12">
	{#each tweets as tweet (tweet.id)}
		<Tweet {tweet} />
	{/each}
</div>
