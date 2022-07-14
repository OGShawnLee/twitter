<script lang="ts">
	import { MobileNavigationLink } from "$lib/components";
	import { PopoverButton } from "malachite-ui/components";
	import { MobileNavigation, MobileSidebar } from "$lib/layout";
</script>

<svelte:head>
	<title>Moments / Twitter</title>
</svelte:head>

<MobileSidebar>
	<div class="flex items-center gap-4">
		<PopoverButton class="h-12 min-w-12 rounded-full outline-none focus:(ring-2 ring-white)">
			<img
				class="h-full w-full rounded-full"
				src="https://avatars.githubusercontent.com/u/86738291?v=4"
				alt=""
			/>
			<span class="sr-only">View Account Info</span>
		</PopoverButton>
		<div class="grid">
			<h1 class="text-xl font-medium">Moments</h1>
			<span class="text-xs text-zinc-500">@OGShawnLee</span>
		</div>
	</div>
	<button>
		<i class="bx bxs-bolt text-2xl" />
	</button>
</MobileSidebar>

<main class="max-w-md w-full mx-auto px-6 my-24">
	<div class="grid gap-6">
		<img
			src="https://abs.twimg.com/sticky/illustrations/empty-states/cracked-egg-microphones-800x400.v1.png"
			width="800"
			height="400"
			alt=""
		/>
		<div class="flex flex-col items-center gap-1.5 text-center">
			<span class="text-3xl font-semibold"> Waiting on a Moment </span>
			<span class="text-sm text-zinc-400">
				Moments are curated stories about what's happening—powered by Tweets.
			</span>
			<button
				class="w-[fit-content] min-h-10.5 mt-6 px-12 py-2 | bg-sky-500 rounded-full font-medium"
			>
				Learn More
			</button>
		</div>
	</div>
</main>

<MobileNavigation class="justify-around">
	<MobileNavigationLink icon="bx-home-circle" href="/home" />
	<MobileNavigationLink icon="bxs-bolt" href="/i/moment_maker" />
</MobileNavigation>
