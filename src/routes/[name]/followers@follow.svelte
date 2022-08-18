<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { getUserFollowers } from "@root/services/db";

	export const load: Load = async ({ stuff: context }) => {
		if (!context.name || !context.displayName || !context.uid) return { status: 500 };
		const [followers, error] = await getUserFollowers(context.uid);
		if (error || !followers) return { status: 500 };
		return {
			status: 200,
			props: {
				followers,
				name: context.name,
				displayName: context.displayName
			}
		};
	};
</script>

<script lang="ts">
	import type { UserDocument } from "@root/types";
	import { EmptyState } from "$lib/layout";
	import { UserCard } from "$lib/components";

	export let name: string;
	export let displayName: string;
	export let followers: UserDocument[];
</script>

<svelte:head>
	<title>People following {name} @{displayName} | Twitter</title>
</svelte:head>

<div class="grid gap-12">
	{#each followers as user (user.uid)}
		<UserCard {user} />
	{:else}
		<EmptyState
			imageURL="https://abs.twimg.com/sticky/illustrations/empty-states/yellow-birds-power-line-400x200.v1.png"
			width="400"
			height="200"
			title="Looking for followers?"
		>
			When someone follows this account, they'll show up here. Tweeting and interacting with others
			helps boost followers.
		</EmptyState>
	{/each}
</div>
