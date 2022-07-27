<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { Header } from "$lib/components";
	import { SignUpStepOne, SignUpStepTwo } from "$lib/pieces/sign-up";

	let currentStep = 1;
	let totalSteps = 2;
	let name = "";
</script>

<svelte:head>
	<title>Join Twitter / Twitter</title>
</svelte:head>

<Header>
	<a
		class="button-rounded size-12 background-zinc"
		href="/login"
		on:click={(event) => {
			if (currentStep !== 1) {
				event.preventDefault();
				currentStep--;
			}
		}}
	>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</a>
	<h1 class="sr-only">Join Twitter</h1>
	<h2 class="text-2xl font-medium">Step {currentStep} of {totalSteps}</h2>
</Header>

<main class="w-full max-w-md mx-auto px-6 mt-24">
	{#if currentStep === 1}
		<SignUpStepOne bind:name on:success={() => currentStep++} />
	{:else if currentStep === 2}
		<SignUpStepTwo {name} />
	{/if}
</main>
