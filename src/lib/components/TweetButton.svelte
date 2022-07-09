<script lang="ts">
	import { isNullish } from "malachite-ui/predicate";

	export let icon: string;
	export let value: number | undefined = undefined;
</script>

<button class="flex items-center gap-3">
	<i class="bx {icon} text-lg" />
	{#if !isNullish(value)}
		<span class="text-sm"> {value} </span>
	{/if}
</button>
