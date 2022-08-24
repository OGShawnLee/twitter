<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = ({ params: { name } }) => {
		return { status: 200, props: { name } };
	};
</script>

<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { EmptyState, MobileNavigation } from "$lib/layout";
	import { ButtonRounded, Header, ListSection, MobileNavigationLink } from "$lib/components";
	import { user } from "@root/state";

	export let name: string;

	$: isOwner = name === $user?.document.displayName;
</script>

<svelte:head>
	<title>Lists created by @{name} / Twitter</title>
</svelte:head>

<Header>
	<button class="button-rounded size-12 background-zinc" on:click={() => history.back()}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</button>
	<div class="grid">
		<div class="flex items-center gap-3">
			<h1 class="text-xl font-medium">Lists</h1>
		</div>
		<span class="text-xs text-zinc-500">@{name}</span>
	</div>
</Header>

<main class="max-w-md w-full mx-auto px-6 my-24">
	{#if isOwner}
		<div class="grid gap-6">
			<ListSection title="Pinned Lists">
				Nothing to see here yet — pin your favorite Lists to access them quickly.
			</ListSection>
			<ListSection title="Your Lists">
				You haven't created or followed any Lists. When you do, they'll show up here.
			</ListSection>
		</div>
	{:else}
		<EmptyState
			class="grid gap-6"
			imageURL="https://abs.twimg.com/sticky/illustrations/empty-states/calculator-with-egg-paper-400x200.v1.png"
			width="400"
			height="200"
			title=" @{name} hasn't created any Lists"
		>
			When they do, they'll show up here.
		</EmptyState>
	{/if}
</main>

<MobileNavigation>
	<MobileNavigationLink icon="bx-home-circle" href="/home" />
	<MobileNavigationLink icon="bx-search" href="/search" />
	<MobileNavigationLink icon="bx-bell" href="/notifications" />
	<MobileNavigationLink icon="bx-envelope" href="/messages" class="relative">
		<ButtonRounded
			class="absolute -top-24 right-1/2 | grid place-content-center | transform translate-x-1/2"
			backgroundColor="bg-sky-500"
			on:click={(event) => event.preventDefault()}
		>
			<i class="bx bx-list-plus | text-2xl" />
			<span class="sr-only">Create a new List</span>
		</ButtonRounded>
	</MobileNavigationLink>
</MobileNavigation>
