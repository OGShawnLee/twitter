<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
	import { collections, db } from "@root/firebase";
	import { toRuntimeTweet } from "$lib/utils";

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
			const tweets = querySnapshot.docs.map((doc) => {
				const docData = doc.data();
				if (isTweetDocument(docData)) return toRuntimeTweet(docData);
				else throw new TypeError("Invalid Tweet Document");
			});
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
	import type { RuntimeTweet } from "@root/types";
	import { Tweet } from "$lib/components";
	import { isTweetDocument } from "$lib/predicate/db";

	export let tweets: RuntimeTweet[] = [];
</script>

<div class="grid gap-12">
	{#each tweets as tweet}
		<Tweet {tweet} />
	{/each}
</div>
