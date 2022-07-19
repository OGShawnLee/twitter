<script lang="ts">
	import "@root/styles/button-after.css";
	import { TweetButton, TweetMenuItem } from "$lib/components";
	import { Menu, MenuButton, MenuItem } from "malachite-ui/components";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { hideScrollbar } from "$lib/actions";

	export let isReply = false;
	export let imageURL: string | undefined = undefined;
</script>

<article class="relative | grid gap-5" class:reply-tweet={isReply}>
	<header class="flex items-center justify-between">
		<div class="flex items-center gap-4">
			<a class="rounded-full outline-none focus:(ring-2 ring-white) z-5" href="/Windows">
				<img
					class="h-10 min-w-10 w-10 rounded-full"
					src="https://avatars.githubusercontent.com/u/86738291?v=4"
					alt=""
				/>
				<span class="sr-only">View Profile Picture</span>
			</a>

			<div class="grid">
				<h3 class="font-medium">
					<a class="relative outline-none focus:underline z-5" href="/Windows"> Shawn Lee </a>
				</h3>
				<div class="space-x-1 | text-xs">
					<span class="text-zinc-400">@ShawnLee</span>
					<span class="text-zinc-500">Jun 12 </span>
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

	<div class="grid">
		<div class="mb-4 | grid gap-4">
			<p class="text-sm leading-relaxed">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus, lacus vel vulputate
				consequat, mauris sapien faucibus nisl, et malesuada velit urna vitae tortor. Quisque ac
				pretium eros. Suspendisse at faucibus ex. In eu ultrices est, vel eleifend mi. Nulla at
				efficitur diam. Ut ultricies accumsan tempor.
			</p>

			{#if imageURL}
				<img class="rounded-lg" src={imageURL} alt="" />
			{/if}

			<slot />
		</div>

		<a class="full-container-link" href="/OGShawnLee/status/1548398191246069760">
			<span class="sr-only"> View Tweet </span>
		</a>

		<div class="flex items-center justify-between | text-zinc-400">
			<TweetButton
				icon="bx-message-rounded"
				value={122}
				buttonClass="hover:text-sky-500 focus:text-sky-500"
				iconClass="after:bg-sky-900/30 group-focus:after:border-sky-300"
			/>
			<TweetButton
				icon="bx-recycle"
				value={19}
				buttonClass="hover:text-green-500 focus:text-green-500"
				iconClass="after:bg-green-900/30 group-focus:after:border-green-300"
			/>
			<TweetButton
				icon="bx-heart"
				value={234}
				buttonClass="hover:text-rose-500 focus:text-rose-500"
				iconClass="after:bg-rose-900/30 group-focus:after:border-rose-300"
			/>
			<TweetButton
				icon="bx-upload"
				buttonClass="hover:text-sky-500 focus:text-sky-500"
				iconClass="after:bg-sky-900/30 group-focus:after:border-sky-300"
			/>
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

	.full-container-link::after {
		content: "";
		position: absolute;
		inset: 0;
		pointer-events: auto;
	}
</style>
