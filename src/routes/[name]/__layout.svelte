<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = ({ params: { name } }) => {
		return {
			status: 200,
			props: { name }
		};
	};
</script>

<script lang="ts">
	import { NavigableLink } from "$lib/components";
	import { Navigable } from "malachite-ui/components";

	export let name: string;
</script>

<svelte:head>
	<title>ShawnLee (@{name}) | Twitter</title>
</svelte:head>

<header class="fixed top-0 inset-x-0 h-20 z-90 | flex items-center justify-center | bg-zinc-900/90">
	<div class="max-w-xs w-full mx-auto flex items-center gap-4">
		<button class="h-12 min-w-12 w-12 | bg-zinc-800 rounded-full" on:click={() => history.back()}>
			<i class="bx bxs-left-arrow-alt | text-2xl" />
			<span class="sr-only">Go Back</span>
		</button>
		<div class="grid">
			<div class="flex items-center gap-3">
				<h1 class="text-xl font-medium">{name}</h1>
				<i class="bx bxs-badge-check | text-2xl" />
			</div>
			<span class="text-xs text-zinc-500">374.6K Tweets</span>
		</div>
	</div>
</header>

<main class="my-20 | flex flex-col gap-0">
	<header>
		<div class="h-36">
			<img
				class="w-full h-full"
				src="https://pbs.twimg.com/profile_banners/15670515/1630414145/1500x500"
				alt=""
			/>
		</div>

		<div class="relative max-w-xs mx-auto py-3 | flex items-center">
			<img
				class="absolute top-0 h-25 w-25 min-w-25 | rounded-full ring-3 ring-zinc-900 transform -translate-y-1/2"
				src="https://pbs.twimg.com/profile_images/1408089447455891461/hwvI8tM1_400x400.jpg"
				alt=""
			/>
			<button class="ml-auto px-6 py-1.5 | bg-white rounded-full text-sm text-zinc-900 font-medium">
				Follow
			</button>
		</div>

		<div class="max-w-xs mx-auto my-4 | flex flex-col gap-3">
			<div class="grid">
				<div class="flex items-center gap-3">
					<h1 class="text-2xl font-semibold tracking-wide">
						{name}
					</h1>
					<i class="bx bxs-badge-check | text-2xl" />
				</div>
				<span class="text-sm text-zinc-400"> @Windows </span>
			</div>

			<p>Brings you closer to what you love.</p>

			<div class="flex flex-wrap items-center gap-x-6">
				<div class="flex items-center gap-2 | text-xs text-zinc-400">
					<i class="bx bx-map text-xl" />
					<span> Redwood, Washington </span>
				</div>
				<div class="flex items-center gap-2 | text-xs text-sky-400">
					<i class="bx bx-link text-xl" />
					<span> Windows.com </span>
				</div>
				<div class="flex items-center gap-2 | text-xs text-zinc-400">
					<i class="bx bx-calendar text-xl" />
					<span> Joined July 2008 </span>
				</div>
			</div>
		</div>
	</header>

	<Navigable class="max-w-xs w-full mx-auto | grid gap-8">
		<div class="flex items-center justify-between">
			<NavigableLink {name} isRoot>Tweets</NavigableLink>
			<NavigableLink {name} path="with_replies">Tweets & Replies</NavigableLink>
			<NavigableLink {name} path="media">Media</NavigableLink>
			<NavigableLink {name} path="likes">Likes</NavigableLink>
		</div>
		<slot />
	</Navigable>
</main>
