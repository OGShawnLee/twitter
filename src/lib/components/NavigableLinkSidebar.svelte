<script lang="ts">
	import { NavigableItem } from "malachite-ui/components";

	export let href: string;
	export let icon: string;
	export let text: string;
</script>

<NavigableItem
	as="a"
	class="px-6 py-3 | flex items-center gap-3 | group outline-none border-2 border-transparent focus:(border-white) hover:bg-zinc-800"
	{href}
>
	<i class="bx {icon} text-xl text-zinc-400 group-focus:text-white" />
	<span class="capitalize"> {text} </span>
</NavigableItem>
