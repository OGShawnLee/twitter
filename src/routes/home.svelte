<script>
	import { Tweet } from "$lib/components";
</script>

<svelte:head>
	<title>Twitter</title>
</svelte:head>

<header class="fixed top-0 inset-x-0 h-20 z-90 | flex items-center justify-center | bg-zinc-900/90">
	<div class="max-w-xs w-full mx-auto flex items-center gap-4">
		<button>
			<img
				class="h-12 min-w-12 w-12 rounded-full"
				src="https://avatars.githubusercontent.com/u/86738291?v=4"
				alt=""
			/>
			<span class="sr-only">View Profile</span>
		</button>
		<h1 class="text-2xl font-medium">Home</h1>
	</div>
</header>

<main class="max-w-xs mx-auto my-24">
	<section>
		<h2 class="sr-only">Tweets</h2>
		<div class="grid gap-12">
			<Tweet />
			<Tweet />
			<Tweet />
		</div>
	</section>
</main>
