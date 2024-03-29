<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { getTweetDocument, getTweetReplies, getTweetReplyingTo } from "@root/services/db";

	export const load: Load = async ({ params: { name, id } }) => {
		const [tweet, err] = await getTweetDocument(id, name);
		if (err) return { status: 500 };
		if (tweet) {
			const [replies = []] = await getTweetReplies(id);
			const replyingTo = await getTweetReplyingTo(tweet);
			return {
				status: 200,
				props: { name, tweet, replies, replyingTo }
			};
		}
		return { status: 404 };
	};
</script>

<script lang="ts">
	import type { TweetDocument } from "@root/types";
	import { TweetContext } from "$lib/components/Context";
	import { MobileNavigation, TweetReplyInput, TweetStatusDate } from "$lib/layout";
	import { ButtonRounded, Header, MobileNavigationLink, Tweet } from "$lib/components";
	import {
		TweetButton,
		TweetButtonDelete,
		TweetButtonLike,
		TweetHeader,
		TweetMenuItem,
		TweetMenuShare,
		TweetStat
	} from "$lib/components/Tweet";
	import { Menu, MenuItem } from "malachite-ui/components";
	import { page } from "$app/stores";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { hideScrollbar } from "$lib/actions";
	import { user } from "@root/state";
	import { writable } from "svelte/store";
	import { goto } from "$app/navigation";

	$: path = $page.url.pathname;

	export let name: string;
	export let tweet: TweetDocument;
	export let replies: TweetDocument[];
	export let replyingTo: TweetDocument[];

	$: isOwner = $user?.account.uid === tweet.user.uid;
	$: isStranger = $user?.account.uid !== tweet.user.uid;

	TweetContext.setContext({
		isBookmarked: writable(false),
		onDelete: () => goto("/home")
	});
</script>

<svelte:head>
	{#if tweet.text}
		<title>@{name} on Twitter: "{tweet.text}"</title>
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
		<span class="text-xs text-zinc-500">@{tweet.user.displayName}</span>
	</div>
</Header>

<main class="max-w-md w-full mx-auto px-6 my-24 | grid gap-5">
	{#each replyingTo as tweet}
		<Tweet {tweet} isReply />
	{/each}
	<div>
		<TweetHeader user={tweet.user}>
			{#if $user && isOwner}
				<TweetButtonDelete id={tweet.id} uid={$user.account.uid} hasImageURL={tweet.hasMedia} />
				<TweetMenuItem icon="bx-detail">
					<span> Add/remove <b>@{tweet.user.displayName}</b> from lists </span>
				</TweetMenuItem>
				<TweetMenuItem icon="bx-volume-mute" text="Mute this conversation" />
			{:else}
				<TweetMenuItem icon="bx-user-x">
					<span> Unfollow <b>@{tweet.user.displayName}</b> </span>
				</TweetMenuItem>
				<TweetMenuItem icon="bx-detail">
					<span> Add/remove <b>@{tweet.user.displayName}</b> from lists </span>
				</TweetMenuItem>
				<TweetMenuItem icon="bx-volume-mute">
					<span> Mute <b>@{tweet.user.displayName}</b> </span>
				</TweetMenuItem>
				<TweetMenuItem icon="bx-volume-mute" text="Mute this conversation" />
				<TweetMenuItem icon="bx-block" isDanger>
					<span> Block <b>@{tweet.user.displayName}</b> </span>
				</TweetMenuItem>
			{/if}
			<TweetMenuItem icon="bx-code-alt" text="Embed Tweet" />
			{#if isStranger}
				<TweetMenuItem icon="bxs-radiation" text="Report Tweet" isDanger />
			{/if}
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

		{#if tweet.isReply && tweet.inReplyToDisplayName}
			<span class="text-xs">
				<span class="text-zinc-400"> Replying to </span>
				<a
					class="outline-none text-sky-500 font-medium hover:text-sky-400 focus:(underline underline-offset-3)"
					href="/{tweet.inReplyToDisplayName}"
				>
					@{tweet.inReplyToDisplayName}
				</a>
			</span>
		{/if}

		{#if tweet.text}
			<p class="leading-relaxed">{tweet.text}</p>
		{/if}

		{#if tweet.imageURL}
			<img class="rounded-lg" src={tweet.imageURL} alt="" />
		{/if}
	</section>

	<div>
		<TweetStatusDate createdAt={tweet.createdAt} />

		{#if tweet.favouriteCount || tweet.replyCount || tweet.retweetCount}
			<div class="py-2.5 | flex items-center justify-between | border-b-2 border-zinc-800">
				<TweetStat href="{path}/retweets" value={tweet.retweetCount} stat="Retweets" />
				<TweetStat
					href="{path}/retweets/with_comments"
					value={tweet.replyCount}
					stat="Quote Tweets"
				/>
				<TweetStat href="{path}/likes" value={tweet.favouriteCount} stat="Likes" />
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

			<TweetButtonLike {tweet} let:handleClick let:isDisabled let:isFavourite>
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

			<TweetMenuShare id={tweet.id} let:button>
				<TweetButton
					icon="bx-upload"
					buttonClass="hover:text-sky-500 focus:text-sky-500"
					backgroundSize="2.5rem"
					iconClass="after:bg-sky-900/30 group-focus:after:border-sky-300"
					iconSize="text-xl"
					use={button}
				/>
			</TweetMenuShare>
		</div>

		{#if $user?.document}
			<TweetReplyInput displayName={name} id={tweet.id} uid={tweet.user.uid} />
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
