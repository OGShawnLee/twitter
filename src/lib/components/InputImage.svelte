<script lang="ts">
	import { getImageFilePathURL } from "$lib/utils";

	let className = "text-sky-600";

	export { className as class };
	export let imagePathURL: string | null;
	export let icon = "bx-image";

	let files: FileList | null = null;
	let fileInputRef: HTMLInputElement;

	$: file = files?.item(0);
	$: if (file) {
		getImageFilePathURL(file).then((imagePath) => (imagePathURL = imagePath));
	}
</script>

<button class={className} type="button" on:click={() => fileInputRef.click()}>
	<i class="bx {icon}" />
	<span class="sr-only">Add a Picture</span>
	<input class="hidden" type="file" bind:files bind:this={fileInputRef} />
</button>
