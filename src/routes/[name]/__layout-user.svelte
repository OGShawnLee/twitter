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
	import { Header, NavigableLink, TweetMenuItem } from "$lib/components";
	import { Menu, MenuButton, MenuItem, Navigable } from "malachite-ui/components";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { hideScrollbar } from "$lib/actions";

	export let name: string;
</script>

<svelte:head>
	<title>ShawnLee (@{name}) | Twitter</title>
</svelte:head>

<Header>
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
</Header>

<main class="my-20 | flex flex-col gap-0">
	<header>
		<div class="h-36">
			<img
				class="w-full h-full"
				src="https://pbs.twimg.com/profile_banners/15670515/1630414145/1500x500"
				alt=""
			/>
		</div>

		<div class="relative max-w-md w-full mx-auto px-6 py-3 | flex items-center">
			<img
				class="absolute top-0 h-25 w-25 min-w-25 | rounded-full ring-3 ring-zinc-900 transform -translate-y-1/2"
				src="https://pbs.twimg.com/profile_images/1408089447455891461/hwvI8tM1_400x400.jpg"
				alt=""
			/>

			<div class="ml-auto | flex items-center gap-3">
				<Menu let:items let:isOpen>
					<MenuButton
						class="h-9.5 w-9.5 min-w-9.5 | grid place-content-center | rounded-full border-2 border-zinc-600 outline-none focus:(border-white)"
					>
						<span class="sr-only">Options</span>
						<i class="bx bx-dots-horizontal-rounded text-xl" />
					</MenuButton>

					{#if isOpen}
						<div
							class="fixed inset-0 z-20 | bg-zinc-800/70"
							transition:fade|local={{ easing: cubicOut }}
						/>
					{/if}

					<div
						class="fixed inset-x-0 bottom-0 z-20 bg-zinc-900 | grid | outline-none"
						slot="items"
						use:items
						use:hideScrollbar
						transition:fly|local={{ y: 250 }}
					>
						<TweetMenuItem icon="bx-recycle" text="Turn off Retweets" />
						<TweetMenuItem icon="bx-category" text="View Topics" />
						<TweetMenuItem icon="bxs-bolt" text="View Moments" />
						<TweetMenuItem icon="bx-detail">
							<span> Add/remove <b>@Windows</b> from lists </span>
						</TweetMenuItem>
						<TweetMenuItem icon="bx-detail" text="View Lists" />
						<TweetMenuItem icon="bx-link" text="Copy link to profile" />
						<TweetMenuItem icon="bx-volume-mute">
							<span> Mute <b>@Windows</b> </span>
						</TweetMenuItem>
						<TweetMenuItem icon="bx-block" isDanger>
							<span> Block <b>@Windows</b> </span>
						</TweetMenuItem>
						<TweetMenuItem icon="bxs-radiation" isDanger>
							<span> Report <b>@Windows</b> </span>
						</TweetMenuItem>
						<MenuItem
							as="button"
							class={{
								base: "min-h-10.5 mx-6 my-4 px-6 py-2 | rounded-full border-2",
								selected: { on: "border-white", off: "border-zinc-600" }
							}}
						>
							Cancel
						</MenuItem>
					</div>
				</Menu>

				<button class="h-9.5 px-8 | bg-white rounded-full text-sm text-zinc-900 font-medium">
					Follow
				</button>
			</div>
		</div>

		<div class="max-w-md w-full mx-auto my-4 px-6 | flex flex-col gap-3">
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

	<Navigable class="max-w-md w-full mx-auto px-6 | grid gap-8">
		<div class="flex items-center justify-between">
			<NavigableLink {name} isRoot>Tweets</NavigableLink>
			<NavigableLink {name} path="with_replies">Tweets & Replies</NavigableLink>
			<NavigableLink {name} path="media">Media</NavigableLink>
			<NavigableLink {name} path="likes">Likes</NavigableLink>
		</div>
		<slot />
	</Navigable>
</main>
