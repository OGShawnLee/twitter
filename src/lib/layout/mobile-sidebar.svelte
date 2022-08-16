<script lang="ts">
	import { hideScrollbar } from "$lib/actions";
	import { Header, NavigableLinkSidebar, UserFollowStats } from "$lib/components";
	import { Popover, Navigable, NavigableItem } from "malachite-ui/components";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { user } from "@root/state";
</script>

<Popover as="slot" forceFocus let:close let:overlay let:panel>
	<Header class="justify-between">
		<slot />
	</Header>

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
							href="/{$user?.document?.displayName}"
						>
							<img class="h-full w-full rounded-full" src={$user?.document.imageURL} alt="" />
							<span class="sr-only">View Profile</span>
						</NavigableItem>

						<div class="grid">
							<NavigableItem
								as="a"
								class="outline-none font-medium focus:(underline underline-white)"
								href="/{$user?.document?.displayName}"
								role="heading"
								aria-level="3"
							>
								{$user?.document?.name}
							</NavigableItem>
							<span class="text-xs text-zinc-400">@{$user?.document?.displayName}</span>
						</div>
					</div>
					<UserFollowStats
						followerCount={$user?.document.stats.followerCount}
						followingCount={$user?.document.stats.followingCount}
					/>
				</section>
			</div>

			<div class="mt-8">
				<NavigableLinkSidebar
					icon="bx-user-circle"
					href="/{$user?.document?.displayName}"
					text="Profile"
				/>
				<NavigableLinkSidebar
					icon="bx-detail"
					href="/{$user?.document?.displayName}/lists"
					text="Lists"
				/>
				<NavigableLinkSidebar icon="bx-bookmark" href="/i/bookmarks" text="Bookmarks" />
				<NavigableLinkSidebar
					icon="bx-category"
					href="/{$user?.document?.displayName}/topics"
					text="Topics"
				/>
				<NavigableLinkSidebar icon="bxs-bolt" href="/i/moment_maker" text="Moments" />
				<div class="h-1 w-full bg-zinc-800" role="separator" />
				<NavigableLinkSidebar icon="bx-cog" href="/settings" text="Settings" />
				<div class="h-1 w-full bg-zinc-800" role="separator" />
				<NavigableLinkSidebar icon="bx-log-out" href="/logout" text="Log Out" />
			</div>
		</Navigable>
	</aside>
</Popover>
