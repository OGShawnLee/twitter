<script lang="ts">
	import { isNullish } from "malachite-ui/predicate";
	import { clearString } from "malachite-ui/utils";

	export let icon: string;
	export let value: number | undefined = undefined;
	export let buttonClass: string;
	export let backgroundSize = "2.15rem";
	export let iconSize = "text-lg";
	export let iconClass: string;
	export let use: (element: HTMLElement) => void = () => {};
	export let isActive = false;
	export let activeClass = "";
	export let isDisabled = false;

	$: className = clearString(
		`group | flex items-center gap-3 | outline-none transition ${buttonClass} ${
			isActive ? activeClass : ""
		}`
	);
</script>

<button
	class={className}
	style:--size={backgroundSize}
	use:use
	on:click
	disabled={isDisabled}
	class:opacity-50={isDisabled}
	class:cursor-not-allowed={isDisabled}
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
