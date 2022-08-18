<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { getUserFollowing } from "@root/services/db";

	export const load: Load = async ({ stuff: context }) => {
		if (!context.name || !context.displayName || !context.uid) return { status: 500 };
		const [following, error] = await getUserFollowing(context.uid);
		if (error || !following) return { status: 500 };
		return {
			status: 200,
			props: {
				following,
				uid: context.uid,
				name: context.name,
				displayName: context.displayName
			}
		};
	};
</script>

<script lang="ts">
	import type { UserDocument } from "@root/types";
	import { UserCard } from "$lib/components";
	import { EmptyState } from "$lib/layout";
	import { user } from "@root/state";

	export let uid: string;
	export let name: string;
	export let displayName: string;
	export let following: UserDocument[];

	$: isOwner = $user?.account.uid === uid;
</script>

<svelte:head>
	<title>People followed by {name} @{displayName} | Twitter</title>
</svelte:head>

<div class="grid gap-12">
	{#each following as user (user.uid)}
		<UserCard {user} />
	{:else}
		{#if isOwner}
			<EmptyState title="Be in the know" titleSize="text-4xl" buttonText="Find people to follow">
				Following accounts is an easy way to curate your timeline and know what's happening with the
				topics and people you're interested in.
			</EmptyState>
		{:else}
			<EmptyState
				imageURL="https://abs.twimg.com/sticky/illustrations/empty-states/yellow-birds-power-line-400x200.v1.png"
				width="400"
				height="200"
				title="@{displayName} isn't following anyone"
			>
				Once they follow accounts, they'll show up here.
			</EmptyState>
		{/if}
	{/each}
</div>
