<script lang="ts">
	import { MenuItem } from "malachite-ui/components";

	export let icon: string;
	export let text = "";
	export let isChecked: boolean;
</script>

<MenuItem
	as="button"
	class={{
		base: "w-full px-6 py-3 | flex items-center justify-between | outline-none border-2 hover:bg-zinc-800",
		selected: { on: "border-white", off: "border-transparent" }
	}}
	let:isSelected
	on:click
>
	<div class="flex items-center gap-3">
		<span class="h-10 min-w-10 w-10 | grid place-content-center | bg-sky-600 rounded-full">
			<i class="bx {icon} text-2xl" />
		</span>
		<span> {text} </span>
	</div>
	{#if isChecked}
		<i class="bx bx-check text-xl text-zinc-400" />
	{/if}
</MenuItem>
