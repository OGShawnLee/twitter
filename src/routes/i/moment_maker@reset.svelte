<script lang="ts">
	import { EmptyState, MobileNavigation, MobileSidebar } from "$lib/layout";
	import { MobileNavigationLink } from "$lib/components";
	import { PopoverButton } from "malachite-ui/components";
	import { user } from "@root/state";
</script>

<svelte:head>
	<title>Moments / Twitter</title>
</svelte:head>

<MobileSidebar>
	<div class="flex items-center gap-4">
		<PopoverButton class="h-12 min-w-12 rounded-full outline-none focus:(ring-2 ring-white)">
			<img class="h-full w-full rounded-full" src={$user?.document.imageURL} alt="" />
			<span class="sr-only">View Account Info</span>
		</PopoverButton>
		<div class="grid">
			<h1 class="text-xl font-medium">Moments</h1>
			<span class="text-xs text-zinc-500">@{$user?.document?.displayName}</span>
		</div>
	</div>
	<button>
		<i class="bx bxs-bolt text-2xl" />
	</button>
</MobileSidebar>

<main class="max-w-md w-full mx-auto px-6 my-24">
	<EmptyState
		class="grid gap-6"
		title="Waiting on a Moment"
		imageURL="https://abs.twimg.com/sticky/illustrations/empty-states/cracked-egg-microphones-800x400.v1.png"
		width="800"
		height="400"
		buttonText="Learn More"
	>
		Moments are curated stories about what's happening—powered by Tweets.
	</EmptyState>
</main>

<MobileNavigation class="justify-around">
	<MobileNavigationLink icon="bx-home-circle" href="/home" />
	<MobileNavigationLink icon="bxs-bolt" href="/i/moment_maker" />
</MobileNavigation>
