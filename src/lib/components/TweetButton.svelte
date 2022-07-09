<script lang="ts">
	import { isNullish } from "malachite-ui/predicate";

	export let icon: string;
	export let value: number | undefined = undefined;
	export let buttonClass: string;
	export let iconClass: string;
</script>

<button class="group | flex items-center gap-3 | outline-none transition {buttonClass}">
	<i
		class="bx {icon} | relative | text-lg {iconClass} after:(opacity-0 transition) group-hover:after:opacity-100 group-focus:after:(opacity-100 border-2)"
	/>
	{#if !isNullish(value)}
		<span class="text-sm"> {value} </span>
	{/if}
</button>

<style>
	i::after {
		content: "";
		position: absolute;
		bottom: 50%;
		right: 50%;
		z-index: -10;
		width: 2.15rem;
		height: 2.15rem;
		border-radius: 100%;
		transform: translate(50%, 50%);
	}
</style>
