<script>
	import { TweetCompose } from "$lib/components";
</script>

<header
	class="fixed top-0 inset-x-0 h-20 | flex items-center justify-center | bg-zinc-900/70 backdrop-blur-sm"
>
	<div class="max-w-md w-full mx-auto px-6 | flex items-center justify-between">
		<a
			class="h-12 min-w-12 w-12 | grid place-content-center | bg-zinc-800 rounded-full"
			href="/home"
		>
			<i class="bx bxs-left-arrow-alt | text-2xl" />
			<span class="sr-only">Go Back</span>
		</a>
		<button class="h-12 min-w-12 w-12 | bg-sky-500 rounded-full">
			<i class="bx bx-pen | text-2xl" />
			<span class="sr-only">Tweet</span>
		</button>
	</div>
</header>

<main class="max-w-md w-full mx-auto my-24 px-6 | grid gap-12">
	<TweetCompose />
</main>
