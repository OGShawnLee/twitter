<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { Header } from "$lib/components";
	import { SignUpStepOne } from "$lib/pieces/sign-up";
</script>

<svelte:head>
	<title>Join Twitter / Twitter</title>
</svelte:head>

<Header>
	<a class="button-rounded size-12 background-zinc" href="/login">
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</a>
	<h1 class="sr-only">Join Twitter</h1>
	<h2 class="text-2xl font-medium">Step 1 of 2</h2>
</Header>

<main class="w-full max-w-md mx-auto px-6 mt-24">
	<SignUpStepOne />
</main>
