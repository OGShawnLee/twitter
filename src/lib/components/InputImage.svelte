<script lang="ts">
	import { getImageFilePathURL } from "$lib/utils";

	export let imagePathURL: string | null;

	let files: FileList | null = null;
	let fileInputRef: HTMLInputElement;

	$: file = files?.item(0);
	$: if (file) {
		getImageFilePathURL(file).then((imagePath) => (imagePathURL = imagePath));
	}
</script>

<button class="text-sky-600" type="button" on:click={() => fileInputRef.click()}>
	<i class="bx bx-image" />
	<span class="sr-only">Add a Picture</span>
	<input class="hidden" type="file" bind:files bind:this={fileInputRef} />
</button>
