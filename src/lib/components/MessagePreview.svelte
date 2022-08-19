<script lang="ts">
	import type { Nullable } from "malachite-ui/types";
	import { TweetMenuItem, TweetUserImage } from "$lib/components";
	import { Menu, MenuButton, MenuItem } from "malachite-ui/components";
	import { hideScrollbar } from "$lib/actions";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";

	export let name: string;
	export let displayName: string;
	export let imageURL: Nullable<string>;
</script>

<article
	class="px-6 py-3 | border-2 border-transparent outline-none hover:bg-zinc-800 focus-visible:border-white"
	tabindex="0"
>
	<div class="grid gap-3">
		<header class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<TweetUserImage {displayName} {imageURL} />
				<div class="grid">
					<h3 class="font-medium">
						<a class="relative outline-none focus:underline z-5" href="/{displayName}">
							{name}
						</a>
					</h3>
					<div class="flex items-center gap-2.5 | text-xs">
						<span class="text-zinc-400">@{displayName}</span>
						<div class="text-zinc-500" label="Dec 12, 2018">
							<time datetime="2018-12-12T21:53:35.2572"> Dec 12, 2018 </time>
						</div>
					</div>
				</div>
			</div>

			<Menu let:items let:isOpen>
				<MenuButton
					class="button-after button-after-10 button-after--zinc | z-5 | group outline-none after:transition"
				>
					<span class="sr-only">Options</span>
					<i
						class="bx bx-dots-horizontal-rounded text-zinc-400 text-2xl group-hover:text-white group-focus:text-white"
					/>
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
					<TweetMenuItem icon="bx-pin" text="Pin conversation" />
					<TweetMenuItem icon="bx-bell-off" text="Snooze conversation" />
					<TweetMenuItem icon="bxs-radiation" text="Report conversation" isDanger />
					<TweetMenuItem icon="bx-trash" text="Delete conversation" isExtremeDanger />
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
		</header>
		<p class="text-sm text-zinc-400 leading-relaxed">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus a magnam laborum.
		</p>
	</div>
</article>
