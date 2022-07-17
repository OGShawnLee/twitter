<script lang="ts">
	import { isNullish } from "malachite-ui/predicate";

	export let icon: string;
	export let value: number | undefined = undefined;
	export let buttonClass: string;
	export let backgroundSize = "2.15rem";
	export let iconSize = "text-lg";
	export let iconClass: string;
</script>

<button
	class="group | flex items-center gap-3 | outline-none transition {buttonClass}"
	style:--size={backgroundSize}
>
	<i
		class="bx {icon} | relative | {iconSize} {iconClass} after:(opacity-0 transition) group-hover:after:opacity-100 group-focus:after:(opacity-100 border-2)"
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
		width: var(--size);
		height: var(--size);
		border-radius: 100%;
		transform: translate(50%, 50%);
	}
</style>
