<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { InputImage } from "$lib/components";

	export let imageURL: string | null;
</script>

<div class="relative h-36">
	{#if imageURL}
		<img class="w-full h-full object-center object-cover" src={imageURL} alt="" />
	{:else}
		<div class="w-full h-full bg-zinc-800" />
	{/if}

	<div
		class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 | flex items-center gap-5"
	>
		<InputImage
			class="button-rounded size-12 center bg-zinc-900/60 | text-3xl"
			icon="bx-camera"
			bind:imagePathURL={imageURL}
		/>
		{#if imageURL}
			<div class="button-rounded size-12 center bg-zinc-900/60">
				<button class="mt-0.875 | outline-none" on:click={() => (imageURL = null)}>
					<i class="bx bx-x text-3xl" />
					<span class="sr-only">Remove Banner</span>
				</button>
			</div>
		{/if}
	</div>
</div>
