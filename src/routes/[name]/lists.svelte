<script lang="ts">
	export let name: string;
</script>

<svelte:head>
	<title>Lists created by @{name} / Twitter</title>
</svelte:head>

<header class="fixed top-0 inset-x-0 h-20 z-90 | flex items-center justify-center | bg-zinc-900/90">
	<div class="max-w-md w-full mx-auto px-6 | flex items-center gap-4">
		<button class="h-12 min-w-12 w-12 | bg-zinc-800 rounded-full" on:click={() => history.back()}>
			<i class="bx bxs-left-arrow-alt | text-2xl" />
			<span class="sr-only">Go Back</span>
		</button>
		<div class="grid">
			<div class="flex items-center gap-3">
				<h1 class="text-xl font-medium">Lists</h1>
			</div>
			<span class="text-xs text-zinc-500">@{name}</span>
		</div>
	</div>
</header>

<main class="max-w-md w-full mx-auto px-6 my-24">
	<div class="grid gap-6">
		<img
			src="https://abs.twimg.com/sticky/illustrations/empty-states/calculator-with-egg-paper-400x200.v1.png"
			width="400"
			height="200"
			alt=""
		/>
		<div class="grid gap-1.5 | text-center">
			<span class="text-3xl font-semibold"> @{name} hasn't created any Lists </span>
			<span class="text-sm text-zinc-400"> When they do, they'll show up here. </span>
		</div>
	</div>
</main>
