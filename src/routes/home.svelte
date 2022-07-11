<script lang="ts">
	import { hideScrollbar } from "$lib/actions";
	import { Tweet, NavigableLinkSidebar } from "$lib/components";
	import { Popover, PopoverButton, Navigable, NavigableItem } from "malachite-ui/components";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
</script>

<svelte:head>
	<title>Twitter</title>
</svelte:head>

<Popover as="slot" forceFocus let:close let:overlay let:panel>
	<header
		class="fixed top-0 inset-x-0 h-20 z-10 | flex items-center justify-center | bg-zinc-900/90"
	>
		<div class="max-w-md w-full mx-auto px-6 | flex items-center gap-4">
			<PopoverButton class="h-12 min-w-12 rounded-full outline-none focus:(ring-2 ring-white)">
				<img
					class="h-full w-full rounded-full"
					src="https://avatars.githubusercontent.com/u/86738291?v=4"
					alt=""
				/>
				<span class="sr-only">View Account Info</span>
			</PopoverButton>
			<h1 class="text-2xl font-medium">Home</h1>
		</div>
	</header>

	<div
		slot="overlay"
		class="fixed inset-0 z-20 | bg-zinc-800/70"
		use:overlay
		transition:fade|local={{ easing: cubicOut }}
	/>

	<aside
		slot="panel"
		class="fixed inset-y-0 left-0 min-w-xs z-30 | overflow-y-auto | bg-zinc-900"
		use:panel
		use:hideScrollbar
		transition:fly|local={{ x: -250, easing: cubicOut }}
	>
		<Navigable global vertical>
			<div class="px-6 | grid gap-4">
				<header class="h-20 | flex items-center gap-4">
					<NavigableItem
						as="button"
						class="h-12 min-w-12 w-12 rounded-full bg-zinc-800 outline-none focus:(ring-2 ring-white)"
						on:click={close}
					>
						<i class="bx bx-x text-2xl" />
						<span class="sr-only">Close Account Information</span>
					</NavigableItem>
					<h2 class="text-lg font-medium">Account Information</h2>
				</header>

				<section class="grid gap-6">
					<div class="flex items-center gap-4">
						<NavigableItem
							as="a"
							class="h-10 min-w-10 w-10 rounded-full outline-none focus:(ring-2 ring-white)"
							href="/Windows"
						>
							<img
								class="h-full w-full rounded-full"
								src="https://avatars.githubusercontent.com/u/86738291?v=4"
								alt=""
							/>
							<span class="sr-only">View Profile</span>
						</NavigableItem>

						<div class="grid">
							<NavigableItem
								as="a"
								class="outline-none font-medium focus:(underline underline-white)"
								href="/Windows"
								role="heading"
								aria-level="3"
							>
								Shawn Lee
							</NavigableItem>
							<span class="text-xs text-zinc-400">@ShawnLee</span>
						</div>
					</div>

					<div class="flex items-center gap-3">
						<div class="space-x-1 | text-xs">
							<span class="font-medium">129</span>
							<span class="text-zinc-400">Following</span>
						</div>
						<div class="space-x-1 | text-xs">
							<span class="font-medium">78</span>
							<span class="text-zinc-400">Followers</span>
						</div>
					</div>
				</section>
			</div>

			<div class="mt-8">
				<NavigableLinkSidebar icon="bx-user-circle" href="/Windows" text="Profile" />
				<NavigableLinkSidebar icon="bx-detail" href="/Windows/lists" text="Lists" />
				<NavigableLinkSidebar icon="bx-bookmark" href="/i/bookmarks" text="Bookmarks" />
				<NavigableLinkSidebar icon="bx-category" href="/Windows/topics" text="Topics" />
				<NavigableLinkSidebar icon="bxs-bolt" href="/i/moment_maker" text="Moments" />
				<div class="h-1 w-full bg-zinc-800" role="separator" />
				<NavigableLinkSidebar icon="bx-cog" href="/settings" text="Settings" />
				<div class="h-1 w-full bg-zinc-800" role="separator" />
				<NavigableLinkSidebar icon="bx-log-out" href="/logout" text="Log Out" />
			</div>
		</Navigable>
	</aside>
</Popover>

<main class="max-w-md w-full mx-auto px-6 my-24">
	<section>
		<h2 class="sr-only">Tweets</h2>
		<div class="grid gap-12">
			<Tweet />
			<Tweet />
			<Tweet />
		</div>
	</section>
</main>
