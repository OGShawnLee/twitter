<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { getUserDocumentWithDisplayName } from "@root/services/db";

	export const load: Load = async ({ params: { name: displayName } }) => {
		const [userDoc, error] = await getUserDocumentWithDisplayName(displayName);

		if (error) return { status: 500, error };
		if (userDoc) return { status: 200, props: { userDoc } };

		return { status: 404 };
	};
</script>

<script lang="ts">
	import type { UserDocument } from "@root/types";
	import { ButtonRounded, Header, NavigableLink, TweetMenuItem } from "$lib/components";
	import { Menu, MenuButton, MenuItem, Navigable } from "malachite-ui/components";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { hideScrollbar } from "$lib/actions";
	import { user } from "@root/state";

	export let userDoc: UserDocument;

	$: isUserProfile = $user?.document?.uid === userDoc.uid;
</script>

<svelte:head>
	<title>{userDoc.name} (@{userDoc?.displayName}) | Twitter</title>
</svelte:head>

<Header>
	<ButtonRounded on:click={() => history.back()}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</ButtonRounded>
	<div class="grid">
		<div class="flex items-center gap-3">
			<h1 class="text-xl font-medium">{userDoc.name}</h1>
			{#if userDoc.isVerified}
				<i class="bx bxs-badge-check | text-2xl" />
			{/if}
		</div>
		<span class="text-xs text-zinc-500">{userDoc.stats.tweetCount} Tweets</span>
	</div>
</Header>

<main class="my-20 | flex flex-col gap-0">
	<header>
		<div class="h-36">
			{#if userDoc.bannerURL}
				<img class="w-full h-full" src={userDoc.bannerURL} alt="" />
			{:else}
				<div class="w-full h-full bg-zinc-800" />
			{/if}
		</div>

		<div class="relative max-w-md w-full mx-auto px-6 py-3 | flex items-center">
			<img
				class="absolute top-0 h-25 w-25 min-w-25 | rounded-full ring-3 ring-zinc-900 transform -translate-y-1/2"
				src={userDoc.imageURL ||
					"https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"}
				alt=""
			/>

			<div class="ml-auto | flex items-center gap-3">
				{#if isUserProfile}
					<button class="h-9.5 px-8 | border-2 border-zinc-700 rounded-full text-sm font-medium">
						Edit Profile
					</button>
				{:else}
					{#if $user}
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
									<span> Add/remove <b>@{userDoc.displayName}</b> from lists </span>
								</TweetMenuItem>
								<TweetMenuItem icon="bx-detail" text="View Lists" />
								<TweetMenuItem icon="bx-link" text="Copy link to profile" />
								<TweetMenuItem icon="bx-volume-mute">
									<span> Mute <b>@{userDoc.displayName}</b> </span>
								</TweetMenuItem>
								<TweetMenuItem icon="bx-block" isDanger>
									<span> Block <b>@{userDoc.displayName}</b> </span>
								</TweetMenuItem>
								<TweetMenuItem icon="bxs-radiation" isDanger>
									<span> Report <b>@{userDoc.displayName}</b> </span>
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
					{/if}

					<button class="h-9.5 px-8 | bg-white rounded-full text-sm text-zinc-900 font-medium">
						Follow
					</button>
				{/if}
			</div>
		</div>

		<div class="max-w-md w-full mx-auto my-4 px-6 | flex flex-col gap-3">
			<div class="grid">
				<div class="flex items-center gap-3">
					<h1 class="text-2xl font-semibold tracking-wide">
						{userDoc.name}
					</h1>
					{#if userDoc.isVerified}
						<i class="bx bxs-badge-check | text-2xl" />
					{/if}
				</div>
				<span class="text-sm text-zinc-400"> @{userDoc.displayName} </span>
			</div>

			{#if userDoc.description}
				<p>{userDoc.description}</p>
			{/if}

			<div class="flex flex-wrap items-center gap-x-6">
				{#if userDoc.location}
					<div class="flex items-center gap-2 | text-xs text-zinc-400">
						<i class="bx bx-map text-xl" />
						<span> {userDoc.location} </span>
					</div>
				{/if}
				{#if userDoc.url}
					<div class="flex items-center gap-2 | text-xs text-sky-400">
						<i class="bx bx-link text-xl" />
						<span> {userDoc.url} </span>
					</div>
				{/if}
				<div class="flex items-center gap-2 | text-xs text-zinc-400">
					<i class="bx bx-calendar text-xl" />
					<span> Joined {userDoc.createdAt}</span>
				</div>
			</div>
		</div>
	</header>

	<Navigable class="max-w-md w-full mx-auto px-6 | grid gap-8">
		<div class="flex items-center justify-between">
			<NavigableLink name={userDoc.displayName} isRoot>Tweets</NavigableLink>
			<NavigableLink name={userDoc.displayName} path="with_replies">Tweets & Replies</NavigableLink>
			<NavigableLink name={userDoc.displayName} path="media">Media</NavigableLink>
			<NavigableLink name={userDoc.displayName} path="likes">Likes</NavigableLink>
		</div>
		<slot />
	</Navigable>
</main>
