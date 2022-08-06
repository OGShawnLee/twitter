<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { Header, InputGroup } from "$lib/components";
	import { user } from "@root/state";
	import { changeDisplayName } from "@root/services/db";
	import { isEmpty, isString } from "malachite-ui/predicate";
	import { toUnderscore } from "$lib/utils";

	const title = "Change Display Name";

	let displayName = "";
	let error: string | null = null;
	let success: string | null = null;
	let disabled = false;

	$: charCount = displayName.length;
	$: if ((error || success) && displayName) error = success = null;

	function handleError(message: string) {
		displayName = "";
		success = null;
		error = message;
	}

	async function updateDisplayName() {
		if (isEmpty(displayName)) return handleError("Your new display name cannot be empty.");

		if (displayName.trim().length > 15)
			return handleError("Your new display name cannot be more than 15 characters long.");

		if ($user && displayName === $user.document.displayName)
			return handleError("Your new display name should not be your old display name.");

		const finalDisplayName = displayName;
		displayName = "";

		if ($user && finalDisplayName) {
			const displayName = finalDisplayName;
			disabled = true;
			const finalError = (await changeDisplayName(toUnderscore(displayName), $user.document))[1];

			if (finalError instanceof Error) return (error = finalError.message);
			else if (isString(finalError)) return (error = finalError);

			disabled = false;
			success = "Your display name has been updated successfully!";
			user.update((state) => {
				return state ? { ...state, document: { ...state.document, displayName } } : null;
			});
		}
	}
</script>

<svelte:head>
	<title>{title} / Twitter</title>
</svelte:head>

<Header>
	<button class="button-rounded size-12 background-zinc" on:click={() => history.back()}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</button>
	<div class="grid">
		<div class="flex items-center gap-3">
			<h1 class="text-xl font-medium">{title}</h1>
		</div>
		<span class="text-xs text-zinc-500">@{$user?.document.displayName}</span>
	</div>
</Header>

<main class="max-w-md w-full mx-auto my-24 px-6">
	<form class="grid gap-8" on:submit|preventDefault={updateDisplayName}>
		<InputGroup
			label="Display Name"
			id="display-name"
			icon="bx-at"
			{charCount}
			charLimit="15"
			{error}
			{success}
			let:id
			let:className
		>
			<input
				class={className}
				type="text"
				{id}
				placeholder={$user?.document.displayName}
				bind:value={displayName}
				maxlength="15"
			/>
		</InputGroup>
		<button
			class="px-6 py-2.5 | bg-sky-500 rounded-full text-lg font-bold hover:bg-sky-400 focus:(ring-2 ring-white)"
			class:opacity-75={disabled}
			type="submit"
			{disabled}
		>
			Change Display Name
		</button>
	</form>
</main>
