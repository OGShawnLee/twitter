<script lang="ts">
	import { DoubleBounce } from "svelte-loading-spinners";

	export let isSaving: boolean;
	export let text: string | undefined = undefined;
</script>

{#if isSaving}
	<DoubleBounce size="32" color="#0EA5E9" />
{:else}
	<button class="py-2 px-6 | bg-white rounded-full text-zinc-900 font-medium" on:click>
		<slot>
			{text}
		</slot>
	</button>
{/if}
