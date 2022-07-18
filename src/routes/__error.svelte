<script>
	import { ButtonRounded, Header } from "$lib/components";
</script>

<svelte:head>
	<title>Not Found / Twitter</title>
</svelte:head>

<Header>
	<ButtonRounded on:click={() => history.back()}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</ButtonRounded>
	<div class="grid">
		<div class="flex items-center gap-3">
			<h1 class="text-xl font-medium">Not Found</h1>
		</div>
	</div>
</Header>

<main class="max-w-md w-full mx-auto px-6 my-24">
	<div class="grid gap-6">
		<div class="grid gap-5 | text-center">
			<span class="text-7xl text-rose-500 font-bold animate-pulse">404</span>

			<div class="flex flex-col items-center gap-1.5">
				<span class="text-3xl font-semibold"> I can't believe it! </span>
				<span class="text-sm text-zinc-400">
					Seems like this page doesn't exist or is being worked on by the developer team. What a
					shame.
				</span>

				<a
					class="w-[fit-content] min-h-10.5 mt-6 px-12 py-2 | bg-sky-500 rounded-full font-medium"
					href="/home"
				>
					Home
				</a>
			</div>
		</div>
	</div>
</main>
