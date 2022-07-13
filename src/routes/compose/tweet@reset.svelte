<script>
	import { ButtonRounded, Header, TweetCompose } from "$lib/components";
</script>

<svelte:head>
	<title>Compose new Tweet / Twitter</title>
</svelte:head>

<Header class="justify-between">
	<ButtonRounded as="a" class="grid place-content-center" href="/home">
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</ButtonRounded>
	<ButtonRounded backgroundColor="bg-sky-500">
		<i class="bx bx-pen | text-2xl" />
		<span class="sr-only">Tweet</span>
	</ButtonRounded>
</Header>

<main class="max-w-md w-full mx-auto my-24 px-6 | grid gap-12">
	<TweetCompose />
</main>
