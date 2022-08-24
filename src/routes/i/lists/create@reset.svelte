<script context="module">
	const MAX_NAME_LENGTH = 20;
	const MAX_DESCRIPTION_LENGTH = 100;
</script>

<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { ButtonSubmit, Header, InputGroup, InputGroupCheckbox } from "$lib/components";
	import { InputImagePreview } from "$lib/layout";
	import { user } from "@root/state";

	let isSaving = false;
	let imageURL: string | null = null;
	let name = "";
	let description = "";
	let isPrivate = true;

	function createList() {}
</script>

<svelte:head>
	<title>Create a new List / Twitter</title>
</svelte:head>

<Header class="justify-between">
	<div class="flex items-center gap-4">
		<a class="button-rounded size-12 background-zinc" href="/{$user?.document.displayName}/lists">
			<i class="bx bx-x | text-2xl" />
			<span class="sr-only">Exit</span>
		</a>
		<h1 class="text-xl font-medium">Create List</h1>
	</div>
	<ButtonSubmit {isSaving} on:click={createList}>Next</ButtonSubmit>
</Header>

<main class="mt-20 mb-12 | flex flex-col gap-0">
	<InputImagePreview bind:imageURL />
	<div class="max-w-md w-full mx-auto mt-6 px-6 | flex flex-col gap-3">
		<div class="grid gap-6">
			<InputGroup
				id="name"
				charCount={name.length}
				charLimit={MAX_NAME_LENGTH}
				let:className
				let:id
			>
				<input class={className} {id} type="text" bind:value={name} maxlength={MAX_NAME_LENGTH} />
			</InputGroup>
			<InputGroup
				id="description"
				fontWeight="font-normal"
				charCount={description.length}
				charLimit={MAX_DESCRIPTION_LENGTH}
				let:className
				let:id
			>
				<textarea
					class="py-3 {className}"
					{id}
					bind:value={description}
					maxlength={MAX_DESCRIPTION_LENGTH}
				/>
			</InputGroup>
			<InputGroupCheckbox label="Make private" id="private" bind:isChecked={isPrivate}>
				When you make a List private, only you can seet it.
			</InputGroupCheckbox>
		</div>
	</div>
</main>
