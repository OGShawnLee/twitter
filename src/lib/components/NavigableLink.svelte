<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { NavigableItem } from "malachite-ui/components";
	import { useClassNameResolver } from "malachite-ui/hooks";

	export let path = "";
	export let isRoot = false;
	export let name: string;

	$: route = $page.routeId;
	$: isActive = isRoot ? route?.includes("[name]") ?? false : route?.includes(path) ?? false;
	$: href = `/${name}/${path}`;

	$: className = useClassNameResolver<"isActive">({
		base: "py-2 | flex items-center justify-center flex-grow | text-sm outline-none focus:(text-white bg-zinc-800 ring-2)",
		active: { on: "text-white focus:ring-sky-500", off: "text-zinc-400 focus:ring-white" }
	})({ isActive });

	function handleClick(event: Event) {
		event.preventDefault();
		goto(href, { noscroll: true, keepfocus: true });
	}
</script>

<NavigableItem class="relative {className}" as="a" {href} on:click={handleClick}>
	<slot />
	<div
		class="absolute bottom-0 | h-1 w-full bg-sky-500 transform translate-y-1/2 {isActive
			? 'scale-x-100'
			: 'scale-x-0'}"
		aria-hidden="true"
	/>
</NavigableItem>
