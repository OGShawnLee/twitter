<script lang="ts">
	import "@root/styles/button-after.css";
	import type { TweetDocument } from "@root/types";
	import { TweetContext } from "$lib/components/Context";
	import { TweetButton, TweetMenuItem, TweetMenuShare, TweetTime } from "$lib/components";
	import { TweetButtonDelete, TweetButtonLike } from "$lib/components/Tweet/Button";
	import { Menu, MenuButton, MenuItem } from "malachite-ui/components";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { hideScrollbar } from "$lib/actions";
	import { user } from "@root/state";
	import { writable } from "svelte/store";
	import { createEventDispatcher } from "svelte";

	export let tweet: TweetDocument;
	export let isReply = false;
	export let isBookmarked = false;

	const dispatch = createEventDispatcher<{ delete: string }>();

	TweetContext.setContext({
		isBookmarked: writable(isBookmarked),
		onDelete: (id) => {
			dispatch("delete", id);
		}
	});
</script>

<article class="relative | grid gap-5" class:reply-tweet={isReply}>
	<header class="flex items-center justify-between">
		<div class="flex items-center gap-4">
			<a
				class="rounded-full outline-none focus:(ring-2 ring-white) z-5"
				href="/{tweet.user.displayName}"
			>
				<img class="h-10 min-w-10 w-10 rounded-full" src={tweet.user.imageURL} alt="" />
				<span class="sr-only">View {tweet.user.displayName} Profile</span>
			</a>

			<div class="grid">
				<h3 class="font-medium">
					<a class="relative outline-none focus:underline z-5" href="/{tweet.user.displayName}">
						{tweet.user.name}
					</a>
				</h3>
				<div class="flex items-center gap-2.5 | text-xs">
					<span class="text-zinc-400">@{tweet.user.displayName}</span>
					<TweetTime createdAt={tweet.createdAt} />
				</div>
			</div>
		</div>

		{#if $user}
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
					{#if $user.account.uid === tweet.user.uid}
						<TweetButtonDelete id={tweet.id} uid={tweet.user.uid} hasImageURL={tweet.hasMedia} />
						<TweetMenuItem icon="bx-pin" text="Pin to your profile" />
						<TweetMenuItem icon="bx-detail">
							<span> Add/remove <b>@{tweet.user.displayName}</b> from lists </span>
						</TweetMenuItem>
						<TweetMenuItem icon="bx-message-rounded" text="Change who can reply" />
					{:else}
						<TweetMenuItem icon="bx-sad" text="Not interested in this Tweet" />
						<TweetMenuItem icon="bx-user-x">
							<span> Follow <b>@{tweet.user.displayName}</b> </span>
						</TweetMenuItem>
						<TweetMenuItem icon="bx-detail">
							<span> Add/remove <b>@{tweet.user.displayName}</b> from lists </span>
						</TweetMenuItem>
						<TweetMenuItem icon="bx-volume-mute">
							<span> Mute <b>@{tweet.user.displayName}</b> </span>
						</TweetMenuItem>
						<TweetMenuItem icon="bx-block" isDanger>
							<span> Block <b>@{tweet.user.displayName}</b> </span>
						</TweetMenuItem>
						<TweetMenuItem icon="bxs-radiation" text="Report Tweet" isDanger />
					{/if}
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
		{/if}
	</header>

	<div class="grid">
		<div class="mb-4 | grid gap-4">
			<p class="text-sm leading-relaxed">{tweet.text}</p>

			{#if tweet.imageURL}
				<img class="rounded-lg" src={tweet.imageURL} alt="" />
			{/if}

			<slot />
		</div>

		<a class="full-container-link" href="/{tweet.user.displayName}/status/{tweet.id}">
			<span class="sr-only"> View Tweet </span>
		</a>

		<div class="flex items-center justify-between | text-zinc-400">
			<TweetButton
				icon="bx-message-rounded"
				value={tweet.replyCount}
				buttonClass="hover:text-sky-500 focus:text-sky-500"
				iconClass="after:bg-sky-900/30 group-focus:after:border-sky-300"
			/>
			<TweetButton
				icon="bx-recycle"
				value={tweet.retweetCount}
				buttonClass="hover:text-green-500 focus:text-green-500"
				iconClass="after:bg-green-900/30 group-focus:after:border-green-300"
			/>

			<TweetButtonLike {tweet} let:handleClick let:isDisabled let:isFavourite>
				<TweetButton
					icon="bx-heart"
					value={tweet.favouriteCount}
					buttonClass="hover:text-rose-500 focus:text-rose-500"
					iconClass="after:bg-rose-900/30 group-focus:after:border-rose-300"
					isActive={isFavourite}
					activeClass="text-rose-500"
					on:click={handleClick}
					{isDisabled}
				/>
			</TweetButtonLike>

			<TweetMenuShare id={tweet.id} loaderSize={18} let:button>
				<TweetButton
					use={button}
					icon="bx-upload"
					buttonClass="hover:text-sky-500 focus:text-sky-500"
					iconClass="after:bg-sky-900/30 group-focus:after:border-sky-300"
				/>
			</TweetMenuShare>
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
