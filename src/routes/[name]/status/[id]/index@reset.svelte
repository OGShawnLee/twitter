<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { collections, db } from "@root/firebase";
	import { doc } from "firebase/firestore";
	import { isRuntimeTweet, isTweetDocument } from "$lib/predicate/db";
	import { toRuntimeTweet } from "$lib/utils";
	import { getTweetDocument, getTweetReplies } from "@root/services/db";

	export const load: Load = async ({ params: { name, id } }) => {
		const [tweet, err] = await getTweetDocument(id, name);
		if (err) return { status: 500 };
		if (tweet) {
			const [replies = []] = await getTweetReplies(id);
			return { status: 200, props: { name, initialTweet: tweet, replies } };
		}
		return { status: 404 };
	};
</script>

<script lang="ts">
	import type { RuntimeTweet } from "@root/types";
	import { MobileNavigation, TweetReplyInput } from "$lib/layout";
	import { ButtonRounded, Header, MobileNavigationLink, Tweet } from "$lib/components";
	import {
		TweetButton,
		TweetButtonLike,
		TweetHeader,
		TweetMenuItem,
		TweetStat
	} from "$lib/components/Tweet";
	import { Menu, MenuItem } from "malachite-ui/components";
	import { page } from "$app/stores";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { hideScrollbar } from "$lib/actions";
	import { user } from "@root/state";
	import { useClientDocumentSnapshot } from "$lib/hooks";

	$: path = $page.url.pathname;

	export let name: string;
	export let initialTweet: RuntimeTweet;
	export let replies: RuntimeTweet[];

	const tweet = useClientDocumentSnapshot<RuntimeTweet>({
		ref: doc(db, collections.tweets, initialTweet.id),
		initialValue: initialTweet,
		isCorrectType: isRuntimeTweet,
		useMutation: (document) => {
			if (isTweetDocument(document)) return toRuntimeTweet(document);
		}
	});
</script>

<svelte:head>
	{#if $tweet.text}
		<title>@{name} on Twitter: "{$tweet.text}"</title>
	{:else}
		<title>@{name} on Twitter</title>
	{/if}
</svelte:head>

<Header>
	<ButtonRounded on:click={() => history.back()}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</ButtonRounded>
	<div class="grid">
		<div class="flex items-center gap-3">
			<h1 class="text-xl font-medium">Tweet</h1>
		</div>
		<span class="text-xs text-zinc-500">@{$tweet.user.displayName}</span>
	</div>
</Header>

<main class="max-w-md w-full mx-auto px-6 my-24 | grid gap-5">
	<div>
		<TweetHeader user={$tweet.user}>
			<TweetMenuItem icon="bx-user-x">
				<span> Unfollow <b>@{$tweet.user.displayName}</b> </span>
			</TweetMenuItem>
			<TweetMenuItem icon="bx-detail">
				<span> Add/remove <b>@{$tweet.user.displayName}</b> from lists </span>
			</TweetMenuItem>
			<TweetMenuItem icon="bx-volume-mute">
				<span> Mute <b>@{$tweet.user.displayName}</b> </span>
			</TweetMenuItem>
			<TweetMenuItem icon="bx-volume-mute" text="Mute this conversation" />
			<TweetMenuItem icon="bx-block" isDanger>
				<span> Block <b>@{$tweet.user.displayName}</b> </span>
			</TweetMenuItem>
			<TweetMenuItem icon="bx-code-alt" text="Embed Tweet" />
			<TweetMenuItem icon="bxs-radiation" text="Report Tweet" isDanger />
			<TweetMenuItem icon="bxs-show" text="View hidden replies" />
			<MenuItem
				as="button"
				class={{
					base: "min-h-10.5 mx-6 my-4 px-6 py-2 | rounded-full border-2",
					selected: { on: "border-white", off: "border-zinc-600" }
				}}
			>
				Cancel
			</MenuItem>
		</TweetHeader>
	</div>

	<section class="grid gap-5">
		<h2 class="sr-only">Tweet Content</h2>

		{#if $tweet.text}
			<p class="leading-relaxed">{$tweet.text}</p>
		{/if}

		{#if $tweet.imageURL}
			<img class="rounded-lg" src={$tweet.imageURL} alt="" />
		{/if}
	</section>

	<div>
		<div
			class="pb-2.5 | flex items-center justify-between | border-b-2 border-zinc-800 text-sm text-zinc-400"
		>
			<span> 5:02 PM </span>
			<span aria-hidden="true"> • </span>
			<span> Jun 15, 2022 </span>
			<span aria-hidden="true"> • </span>
			<span> Twitter Web App </span>
		</div>

		{#if $tweet.stats.favouritedCount || $tweet.stats.replyCount || $tweet.stats.retweetCount}
			<div class="py-2.5 | flex items-center justify-between | border-b-2 border-zinc-800">
				<TweetStat href="{path}/retweets" value={$tweet.stats.retweetCount} stat="Retweets" />
				<TweetStat
					href="{path}/retweets/with_comments"
					value={$tweet.stats.replyCount}
					stat="Quote Tweets"
				/>
				<TweetStat href="{path}/likes" value={$tweet.stats.favouritedCount} stat="Likes" />
			</div>
		{/if}

		<div class="py-2.5 | flex items-center justify-around | border-t-2 border-zinc-800">
			<TweetButton
				icon="bx-message-rounded"
				buttonClass="hover:text-sky-500 focus:text-sky-500"
				backgroundSize="2.5rem"
				iconClass="after:bg-sky-900/30 group-focus:after:border-sky-300"
				iconSize="text-xl"
			/>
			<Menu let:isOpen let:button let:items>
				<TweetButton
					icon="bx-recycle"
					buttonClass="hover:text-green-500 focus:text-green-500"
					backgroundSize="2.5rem"
					iconClass="after:bg-green-900/30 group-focus:after:border-green-300"
					iconSize="text-xl"
					use={button}
				/>

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
					<TweetMenuItem icon="bx-recycle" text="Retweet" />
					<TweetMenuItem icon="bxs-quote-left" text="Quote Tweet" />
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

			<TweetButtonLike tweet={$tweet} let:handleClick let:isDisabled let:isFavourite>
				<TweetButton
					icon="bx-heart"
					backgroundSize="2.5rem"
					buttonClass="hover:text-rose-500 focus:text-rose-500"
					iconClass="after:bg-rose-900/30 group-focus:after:border-rose-300"
					iconSize="text-xl"
					isActive={isFavourite}
					activeClass="text-rose-500"
					on:click={handleClick}
					{isDisabled}
				/>
			</TweetButtonLike>

			<Menu let:isOpen let:button let:items>
				<TweetButton
					icon="bx-upload"
					buttonClass="hover:text-sky-500 focus:text-sky-500"
					backgroundSize="2.5rem"
					iconClass="after:bg-sky-900/30 group-focus:after:border-sky-300"
					iconSize="text-xl"
					use={button}
				/>

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
					<TweetMenuItem icon="bx-envelope" text="Send via Direct Message" />
					<TweetMenuItem icon="bx-bookmark" text="Bookmark" />
					<TweetMenuItem icon="bx-link" text="Copy link to Tweet" />
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
		</div>

		{#if $user?.document}
			<TweetReplyInput displayName={name} id={initialTweet.id} uid={initialTweet.user.uid} />
		{/if}
	</div>

	<section>
		<h2 class="sr-only">Replies</h2>

		<div class="grid gap-12">
			{#each replies as reply}
				<Tweet tweet={reply} />
			{/each}
		</div>
	</section>
</main>

<MobileNavigation>
	<MobileNavigationLink icon="bxs-home-circle" href="/home" />
	<MobileNavigationLink icon="bx-search" href="/search" />
	<MobileNavigationLink icon="bx-bell" href="/notifications" />
	<MobileNavigationLink icon="bx-envelope" href="/messages" />
</MobileNavigation>
