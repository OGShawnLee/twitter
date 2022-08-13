<script lang="ts" context="module">
	function getIconColor(isSelected: boolean, isExtremeDanger: boolean, isDanger: boolean) {
		if (isExtremeDanger) return "text-rose-500";
		return isSelected ? (isDanger ? "text-rose-500" : "text-white") : "text-zinc-400";
	}
</script>

<script lang="ts">
	import { MenuItem } from "malachite-ui/components";

	export let icon: string;
	export let text = "";
	export let isDanger = false;
	export let isExtremeDanger = false;

	$: isDangerous = isExtremeDanger || isDanger;
</script>

<MenuItem
	as="button"
	class={{
		base: "w-full px-6 py-3 | flex items-center gap-3 outline-none border-2 hover:bg-zinc-800",
		selected: { on: isDangerous ? "border-rose-500" : "border-white", off: "border-transparent" }
	}}
	let:isSelected
	on:click
>
	<i class="bx {icon} text-xl {getIconColor(isSelected, isExtremeDanger, isDanger)}" />
	<slot>
		<span> {text} </span>
	</slot>
</MenuItem>
