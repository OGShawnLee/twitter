<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { Header, InputGroup, InputImage } from "$lib/components";
	import { user } from "@root/state";
	import { onMount } from "svelte";

	const MAX_NAME_LENGTH = 50;
	const MAX_DESCRIPTION_LENGTH = 160;
	const MAX_LOCATION_LENGTH = 30;
	const MAX_WEBSITE_LENGTH = 100;

	let bannerURL = $user?.document.bannerURL || null;
	let imagePathURL = $user?.document.imageURL || null;
	let name = $user?.document.name || "";
	let description = $user?.document.description || "";
	let location = $user?.document.location || "";
	let website = $user?.document.location || "";

	onMount(() => {
		imagePathURL = $user?.document.imageURL || null;
		name = $user?.document.name || "";
		description = $user?.document.description || "";
		location = $user?.document.location || "";
		website = $user?.document.location || "";
	});
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
	<button class="py-2 px-6 | bg-white rounded-full text-zinc-900 font-medium"> Save </button>
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
			<InputGroup
				id="location"
				icon="bx-map"
				let:className
				let:id
				charCount={location.length}
				charLimit={MAX_LOCATION_LENGTH}
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
				let:className
				let:id
				charCount={website.length}
				charLimit={MAX_WEBSITE_LENGTH}
			>
				<input
					class={className}
					{id}
					type="text"
					bind:value={website}
					maxlength={MAX_WEBSITE_LENGTH}
				/>
			</InputGroup>
		</div>
	</div>
</main>
