<script lang="ts">
	import { DoubleBounce } from "svelte-loading-spinners";

	export let isSaving: boolean;
</script>

{#if isSaving}
	<DoubleBounce size="32" color="#0EA5E9" />
{:else}
	<button class="py-2 px-6 | bg-white rounded-full text-zinc-900 font-medium text-sky-500" on:click>
		<slot />
	</button>
{/if}
