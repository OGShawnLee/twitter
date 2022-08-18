<script lang="ts">
	let className = "max-w-md w-full mx-auto pt-6 px-6 | grid gap-6";

	export { className as class };
	export let imageURL: string | undefined = undefined;
	export let width: string | undefined = undefined;
	export let height: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let titleSize = "text-3xl";
	export let buttonText: string | undefined = undefined;
</script>

<div class={className}>
	{#if imageURL}
		<img src={imageURL} {width} {height} alt="" />
	{/if}
	<div class="grid gap-2 | text-center">
		<span class="{titleSize} font-bold"> {title} </span>
		<span class="text-sm text-zinc-400">
			<slot />
		</span>
		{#if buttonText}
			<button class="w-[fit-content] mt-3 mx-auto px-12 py-3 | bg-sky-500 rounded-full font-medium">
				{buttonText}
			</button>
		{/if}
	</div>
</div>
