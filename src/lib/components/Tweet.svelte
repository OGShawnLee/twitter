<script lang="ts">
	import { TweetMenuItem } from "$lib/components";
	import { Menu, MenuButton, MenuItem } from "malachite-ui/components";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { hideScrollbar } from "$lib/actions";

	export let isReply = false;
	export let imageURL: string | undefined = undefined;
</script>

<article class="grid gap-5" class:reply-tweet={isReply}>
	<header class="flex items-center justify-between">
		<div class="flex items-center gap-4">
			<a href="/Windows">
				<img
					class="h-10 min-w-10 w-10 rounded-full"
					src="https://avatars.githubusercontent.com/u/86738291?v=4"
					alt=""
				/>
				<span class="sr-only">View Profile Picture</span>
			</a>

			<div class="grid">
				<h3 class="font-medium">
					<a href="/Windows"> Shawn Lee </a>
				</h3>
				<div class="space-x-1 | text-xs">
					<span class="text-zinc-400">@ShawnLee</span>
					<span class="text-zinc-500">Jun 12 </span>
				</div>
			</div>
		</div>

		<Menu let:items let:isOpen>
			<MenuButton>
				<span class="sr-only">Options</span>
				<i class="bx bx-dots-horizontal-rounded text-3xl" />
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
				transition:fly={{ y: 250 }}
			>
				<TweetMenuItem icon="bx-sad" text="Not interested in this Tweet" />
				<TweetMenuItem icon="bx-user-x">
					<span> Unfollow <b>@OGShawnLee</b> </span>
				</TweetMenuItem>
				<TweetMenuItem icon="bx-detail">
					<span> Add/remove <b>@OGShawnLee</b> from lists </span>
				</TweetMenuItem>
				<TweetMenuItem icon="bx-volume-mute">
					<span> Mute <b>@OGShawnLee</b> </span>
				</TweetMenuItem>
				<TweetMenuItem icon="bx-block" isDanger>
					<span> Block <b>@OGShawnLee</b> </span>
				</TweetMenuItem>
				<TweetMenuItem icon="bxs-radiation" text="Report Tweet" isDanger />
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

	<div class="grid gap-4">
		<div class="contents">
			<p class="text-sm leading-relaxed">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus, lacus vel vulputate
				consequat, mauris sapien faucibus nisl, et malesuada velit urna vitae tortor. Quisque ac
				pretium eros. Suspendisse at faucibus ex. In eu ultrices est, vel eleifend mi. Nulla at
				efficitur diam. Ut ultricies accumsan tempor.
			</p>

			{#if imageURL}
				<img class="rounded-lg" src={imageURL} alt="" />
			{/if}
		</div>

		<div class="flex items-center justify-between | text-zinc-400">
			<button class="flex items-center gap-2">
				<i class="bx bx-message-rounded text-lg" />
				<span class="text-sm"> 122 </span>
			</button>
			<button class="flex items-center gap-2">
				<i class="bx bx-recycle text-lg" />
				<span class="text-sm"> 19 </span>
			</button>
			<button class="flex items-center gap-2">
				<i class="bx bx-heart text-lg" />
				<span class="text-sm"> 234 </span>
			</button>
			<button class="flex items-center">
				<i class="bx bx-upload text-lg transform -translate-y-0.5" />
			</button>
		</div>
	</div>
</article>

<style>
	.reply-tweet {
		@apply relative pl-5;
	}

	.reply-tweet::before {
		content: "";
		@apply absolute left-0 inset-y-0 w-1 bg-zinc-800 rounded-md;
	}
</style>
