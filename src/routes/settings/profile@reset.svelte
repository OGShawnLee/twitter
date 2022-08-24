<script lang="ts" context="module">
	const MAX_NAME_LENGTH = 50;
	const MAX_DESCRIPTION_LENGTH = 160;
	const MAX_LOCATION_LENGTH = 30;
	const MAX_WEBSITE_LENGTH = 100;

	function getLengthErrorMessage(type: string, maxLength: number) {
		return `${type} cannot be longer than ${maxLength} characters!`;
	}
</script>

<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { ButtonSubmit, Header, InputGroup, InputImage } from "$lib/components";
	import { updateUserProfile } from "@root/services/db";
	import { user } from "@root/state";
	import { clearString } from "malachite-ui/utils";
	import { isEmpty } from "malachite-ui/predicate";

	let bannerURL = $user?.document.bannerURL || null;
	let imagePathURL = $user?.document.imageURL || null;
	let name = $user?.document.name || "",
		nameError: string | null = null;
	let description = $user?.document.description || "",
		descriptionError: string | null = null;
	let location = $user?.document.location || "",
		locationError: string | null = null;
	let url = $user?.document.url || "",
		urlError: string | null = null;
	let isSaving = false;

	async function updateProfile() {
		if (!$user) return;
		if (name === null || isEmpty(name)) {
			return (nameError = "Name cannot be empty!");
		}

		if (name.length > MAX_NAME_LENGTH)
			return (nameError = getLengthErrorMessage("Name", MAX_NAME_LENGTH));

		if (description.length > MAX_DESCRIPTION_LENGTH)
			return (descriptionError = getLengthErrorMessage("Description", MAX_DESCRIPTION_LENGTH));

		if (location.length > MAX_LOCATION_LENGTH)
			return (locationError = getLengthErrorMessage("Location", MAX_LOCATION_LENGTH));

		if (url.length > MAX_WEBSITE_LENGTH)
			return (urlError = getLengthErrorMessage("Website", MAX_WEBSITE_LENGTH));

		isSaving = true;
		await updateUserProfile($user.document, {
			bannerURL,
			imageURL: imagePathURL,
			name: clearString(name),
			description,
			location,
			url
		});
		isSaving = false;
		// TODO: HANDLE ERRORS
	}
</script>

<svelte:head>
	<title>Edit Profile</title>
</svelte:head>

<Header class="justify-between">
	<div class="flex items-center gap-4">
		<button class="button-rounded size-12 background-zinc" on:click={() => history.back()}>
			<i class="bx bxs-left-arrow-alt | text-2xl" />
			<span class="sr-only">Go Back</span>
		</button>
		<div class="grid">
			<div class="flex items-center gap-3">
				<h1 class="text-xl font-medium">Edit Profile</h1>
			</div>
			<span class="text-xs text-zinc-500">@{$user?.document?.displayName}</span>
		</div>
	</div>
	<ButtonSubmit text="Save" {isSaving} on:click={updateProfile} />
</Header>

<main class="mt-20 mb-12 | flex flex-col gap-0">
	<div class="relative h-36">
		{#if bannerURL}
			<img class="w-full h-full object-center object-cover" src={bannerURL} alt="" />
		{:else}
			<div class="w-full h-full bg-zinc-800" />
		{/if}

		<div
			class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 | flex items-center gap-5"
		>
			<InputImage
				class="button-rounded size-12 center bg-zinc-900/60 | text-3xl"
				icon="bx-camera"
				bind:imagePathURL={bannerURL}
			/>
			{#if bannerURL}
				<div class="button-rounded size-12 center bg-zinc-900/60">
					<button class="mt-0.875 | outline-none" on:click={() => (bannerURL = null)}>
						<i class="bx bx-x text-3xl" />
						<span class="sr-only">Remove Banner</span>
					</button>
				</div>
			{/if}
		</div>
	</div>
	<div class="relative max-w-md w-full mx-auto px-6 py-3 | flex items-center">
		<div
			class="absolute top-0 h-25 w-25 min-w-25 | rounded-full ring-3 ring-zinc-900 transform -translate-y-1/2"
		>
			{#if imagePathURL}
				<img
					class="w-full h-full object-center object-cover rounded-full"
					src={imagePathURL}
					alt=""
				/>
			{:else}
				<div class="w-full h-full bg-zinc-800 rounded-full" />
			{/if}
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<div class="button-rounded size-12 center bg-zinc-900/60">
					<InputImage class="mt-1.75 | outline-none text-3xl" icon="bx-camera" bind:imagePathURL />
				</div>
			</div>
		</div>
	</div>
	<div class="max-w-md w-full mx-auto mt-14 px-6 | flex flex-col gap-3">
		<div class="grid gap-6">
			<InputGroup
				id="name"
				icon="bx-user-circle"
				charCount={name.length}
				charLimit={MAX_NAME_LENGTH}
				error={nameError}
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
				error={descriptionError}
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
			<InputGroup
				id="location"
				icon="bx-map"
				charCount={location.length}
				charLimit={MAX_LOCATION_LENGTH}
				error={locationError}
				let:className
				let:id
			>
				<input
					class={className}
					{id}
					type="text"
					bind:value={location}
					maxlength={MAX_LOCATION_LENGTH}
				/>
			</InputGroup>
			<InputGroup
				id="website"
				icon="bx-link"
				charCount={url.length}
				charLimit={MAX_WEBSITE_LENGTH}
				error={urlError}
				let:className
				let:id
			>
				<input class={className} {id} type="text" bind:value={url} maxlength={MAX_WEBSITE_LENGTH} />
			</InputGroup>
		</div>
	</div>
</main>
