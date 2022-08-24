<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { EmptyState } from "$lib/layout";
	import { Header } from "$lib/components";

	export let name: string;
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
	<EmptyState
		class="grid gap-6"
		imageURL="https://abs.twimg.com/sticky/illustrations/empty-states/calculator-with-egg-paper-400x200.v1.png"
		width="400"
		height="200"
		title=" @{name} hasn't created any Lists"
	>
		When they do, they'll show up here.
	</EmptyState>
</main>
