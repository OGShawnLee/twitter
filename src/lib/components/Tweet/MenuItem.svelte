<script lang="ts">
	import { MenuItem } from "malachite-ui/components";

	export let icon: string;
	export let text = "";
	export let isDanger = false;
</script>

<MenuItem
	as="button"
	class={{
		base: "w-full px-6 py-3 | flex items-center gap-3 outline-none border-2 hover:bg-zinc-800",
		selected: { on: isDanger ? "border-rose-500" : "border-white", off: "border-transparent" }
	}}
	let:isSelected
	on:click
>
	<i
		class="bx {icon} text-xl {isSelected
			? isDanger
				? 'text-rose-500'
				: 'text-white'
			: 'text-zinc-400'}"
	/>
	<slot>
		<span> {text} </span>
	</slot>
</MenuItem>
