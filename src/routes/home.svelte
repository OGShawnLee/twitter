<script lang="ts">
	import { MobileSidebar, TopTweetPreferences } from "$lib/layout";
	import { Tweet } from "$lib/components";
	import { PopoverButton } from "malachite-ui/components";
	import { user } from "@root/state";
</script>

<svelte:head>
	<title>Twitter</title>
</svelte:head>

<MobileSidebar>
	<div class="flex items-center gap-4">
		<PopoverButton class="h-12 min-w-12 rounded-full outline-none focus:(ring-2 ring-white)">
			<img class="h-full w-full rounded-full" src={$user?.imageURL} alt="" />
			<span class="sr-only">View Account Info</span>
		</PopoverButton>
		<h1 class="text-2xl font-medium">Home</h1>
	</div>
	<TopTweetPreferences />
</MobileSidebar>

<main class="max-w-md w-full mx-auto px-6 my-24">
	<section class="after:text-red-400">
		<h2 class="sr-only">Tweets</h2>
		<div class="grid gap-12">
			<Tweet />
			<Tweet />
			<Tweet />
		</div>
	</section>
</main>
