<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { generateRuntimeTweets } from "$lib/utils";

	export const load: Load = async ({ stuff: { uid } }) => {
		if (!uid) return { status: 500 };
		const [tweets, err] = await getUserLikes(uid);
		if (err || !tweets) return { status: 500 };
		return { status: 200, props: { tweets: generateRuntimeTweets(tweets) } };
	};
</script>

<script lang="ts">
	import type { RuntimeTweet } from "@root/types";
	import { Tweet } from "$lib/components";
	import { getUserLikes } from "@root/services/db";

	export let tweets: RuntimeTweet[] = [];
</script>

<div class="grid gap-12">
	{#each tweets as tweet (tweet.id)}
		<Tweet {tweet} />
	{/each}
</div>
