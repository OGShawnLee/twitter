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
	import { MobileNavigation, TweetReplyInput } from "$lib/layout";
	import {
		ButtonRounded,
		Header,
		MobileNavigationLink,
		Tweet,
		TweetButton,
		TweetHeader,
		TweetMenuItem,
		TweetStat
	} from "$lib/components";
	import { MenuItem } from "malachite-ui/components";
	import { page } from "$app/stores";

	$: path = $page.url.pathname;

	export let imageURL: string | undefined = undefined;
	export let name: string;
</script>

<svelte:head>
	<title>
		@{name} on Twitter: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus, lacus
		vel vulputate consequat, mauris sapien faucibus nisl, et malesuada velit urna vitae tortor. Quisque
		ac pretium eros. Suspendisse at faucibus ex. In eu ultrices est, vel eleifend mi. Nulla at efficitur
		diam. Ut ultricies accumsan tempor."
	</title>
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
		<span class="text-xs text-zinc-500">@OGShawnLee</span>
	</div>
</Header>

<main class="max-w-md w-full mx-auto px-6 my-24 | grid gap-5">
	<div>
		<TweetHeader hasDate={false}>
			<TweetMenuItem icon="bx-user-x">
				<span> Unfollow <b>@OGShawnLee</b> </span>
			</TweetMenuItem>
			<TweetMenuItem icon="bx-detail">
				<span> Add/remove <b>@OGShawnLee</b> from lists </span>
			</TweetMenuItem>
			<TweetMenuItem icon="bx-volume-mute">
				<span> Mute <b>@OGShawnLee</b> </span>
			</TweetMenuItem>
			<TweetMenuItem icon="bx-volume-mute" text="Mute this conversation" />
			<TweetMenuItem icon="bx-block" isDanger>
				<span> Block <b>@OGShawnLee</b> </span>
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

		<p class="leading-relaxed">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus, lacus vel vulputate
			consequat, mauris sapien faucibus nisl, et malesuada velit urna vitae tortor. Quisque ac
			pretium eros. Suspendisse at faucibus ex. In eu ultrices est, vel eleifend mi. Nulla at
			efficitur diam. Ut ultricies accumsan tempor.
		</p>

		{#if imageURL}
			<img class="rounded-lg" src={imageURL} alt="" />
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

		<div class="py-2.5 | flex items-center justify-between | border-b-2 border-zinc-800">
			<TweetStat href="{path}/retweets" value="19" stat="Retweets" />
			<TweetStat href="{path}/retweets/with_comments" value="21" stat="Quote Tweets" />
			<TweetStat href="{path}/likes" value="234" stat="Likes" />
		</div>

		<div class="py-2.5 | flex items-center justify-around | border-t-2 border-zinc-800">
			<TweetButton
				icon="bx-message-rounded"
				buttonClass="hover:text-sky-500 focus:text-sky-500"
				backgroundSize="2.5rem"
				iconClass="after:bg-sky-900/30 group-focus:after:border-sky-300"
				iconSize="text-xl"
			/>
			<TweetButton
				icon="bx-recycle"
				buttonClass="hover:text-green-500 focus:text-green-500"
				backgroundSize="2.5rem"
				iconClass="after:bg-green-900/30 group-focus:after:border-green-300"
				iconSize="text-xl"
			/>
			<TweetButton
				icon="bx-heart"
				buttonClass="hover:text-rose-500 focus:text-rose-500"
				backgroundSize="2.5rem"
				iconClass="after:bg-rose-900/30 group-focus:after:border-rose-300"
				iconSize="text-xl"
			/>
			<TweetButton
				icon="bx-upload"
				buttonClass="hover:text-sky-500 focus:text-sky-500"
				backgroundSize="2.5rem"
				iconClass="after:bg-sky-900/30 group-focus:after:border-sky-300"
				iconSize="text-xl"
			/>
		</div>

		<TweetReplyInput />
	</div>

	<section>
		<h2 class="sr-only">Replies</h2>

		<div class="grid gap-12">
			<Tweet />
			<Tweet />
			<Tweet />
		</div>
	</section>
</main>

<MobileNavigation>
	<MobileNavigationLink icon="bxs-home-circle" href="/home" />
	<MobileNavigationLink icon="bx-search" href="/search" />
	<MobileNavigationLink icon="bx-bell" href="/notifications" />
	<MobileNavigationLink icon="bx-envelope" href="/messages" />
</MobileNavigation>
