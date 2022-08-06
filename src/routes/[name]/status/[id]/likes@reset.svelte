<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { getTweetLikedByUsers } from "@root/services/db";

	export const load: Load = async ({ params: { name, id } }) => {
		const [users, error] = await getTweetLikedByUsers(id, name);
		if (error) return { status: 500, error: { name: "Error", message: "Unable to Fetch Tweet" } };
		return users ? { status: 200, props: { users } } : { status: 404 };
	};
</script>

<script lang="ts">
	import type { UserDocument } from "@root/types";
	import { ButtonRounded, Header, UserCard } from "$lib/components";

	export let users: UserDocument[] = [];
</script>

<svelte:head>
	<title>Liked by / Twitter</title>
</svelte:head>

<Header>
	<ButtonRounded on:click={() => history.back()}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</ButtonRounded>
	<h1 class="text-xl font-medium">Liked by</h1>
</Header>

<main class="max-w-md w-full mx-auto mt-24 mb-12">
	{#each users as user (user.uid)}
		<UserCard {user} />
	{/each}
</main>
