<script lang="ts">
	let className = "";

	export { className as class };
	export let backgroundColor = "bg-zinc-800";
	export let size = "h-12 w-12 min-w-12";
	export let as: keyof HTMLElementTagNameMap = "button";
	export let href: string | undefined = undefined;
</script>

<svelte:element
	this={as}
	{href}
	class="{size} | rounded-full {backgroundColor} {className}"
	on:click
>
	<slot />
</svelte:element>
