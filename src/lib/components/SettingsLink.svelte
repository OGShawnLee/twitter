<script lang="ts">
	import { NavigableItem } from "malachite-ui/components";

	export let href: string;
	export let icon: string;
	export let text: string;
	export let isDanger = false;
</script>

<NavigableItem
	as="a"
	class="group px-6 py-3 | flex items-center justify-between | outline-none border-2 border-transparent hover:bg-zinc-800 {isDanger
		? 'focus:border-rose-500'
		: 'focus:border-white'}"
	href="/settings{href}"
>
	<div class="flex items-center gap-3">
		<i
			class="bx {icon} text-2xl text-zinc-400 {isDanger
				? 'group-focus:text-rose-500'
				: 'group-focus:text-white'}"
		/>
		{#if $$slots.default}
			<div class="grid">
				<span class="text-sm font-medium"> {text} </span>
				<span class="text-xs text-zinc-400">
					<slot />
				</span>
			</div>
		{:else}
			<span class="text-sm font-medium"> {text} </span>
		{/if}
	</div>
	<i class="bx bx-chevron-right text-2xl text-zinc-400 group-focus:text-white" />
</NavigableItem>
