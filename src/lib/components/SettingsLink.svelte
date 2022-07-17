<script lang="ts">
	import { NavigableItem } from "malachite-ui/components";

	export let href: string;
	export let icon: string;
	export let text: string;
</script>

<NavigableItem
	as="a"
	class="group px-6 py-3 | flex items-center justify-between | outline-none border-2 border-transparent hover:bg-zinc-800 focus:border-white"
	href="/settings{href}"
>
	<div class="flex items-center gap-3">
		<i class="bx {icon} text-2xl text-zinc-400 group-focus:text-white" />
		<span class="text-sm font-medium"> {text} </span>
	</div>
	<i class="bx bx-chevron-right text-2xl text-zinc-400 group-focus:text-white" />
</NavigableItem>
