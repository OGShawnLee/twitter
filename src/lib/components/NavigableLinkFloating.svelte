<script lang="ts">
	import { NavigableItem } from "malachite-ui/components";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	export let path: string;
	export let text: string;
	export let displayName: string;

	$: route = $page.routeId;
	$: isActive = route === `[name]/${path}@follow`;
	$: href = `/${displayName}/${path}`;

	function navigate(event: Event) {
		event.preventDefault();
		goto(href, { keepfocus: true });
	}
</script>

<NavigableItem
	as="a"
	class="relative min-w-max h-full px-4 | flex flex-grow items-center justify-center | outline-none border-2 border-transparent active:bg-zinc-800 focus-visible:border-white"
	{href}
	on:click={navigate}
>
	<span class="font-medium text-sm {isActive ? 'text-white' : 'text-zinc-400'}">
		{text}
	</span>
	<span
		class="absolute bottom-0 right-1/2 h-1 w-1/2 transform translate-x-1/2 {isActive
			? 'scale-x-100'
			: 'scale-x-0'} | bg-sky-500 transition | lg:w-full"
	/>
</NavigableItem>
