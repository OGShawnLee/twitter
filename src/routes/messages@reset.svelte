<script lang="ts">
	import "@root/styles/button-after.css";
	import "@root/styles/button-rounded.css";
	import { MobileNavigation, MobileSidebar } from "$lib/layout";
	import { ButtonRounded, MessagePreview, MobileNavigationLink } from "$lib/components";
	import { PopoverButton } from "malachite-ui/components";
	import { user } from "@root/state";
</script>

<MobileSidebar>
	<div class="flex items-center gap-4">
		<PopoverButton class="h-12 min-w-12 rounded-full outline-none focus:(ring-2 ring-white)">
			<img class="h-full w-full rounded-full" src={$user?.document.imageURL} alt="" />
			<span class="sr-only">View Account Info</span>
		</PopoverButton>
		<div class="grid">
			<h1 class="text-xl font-medium">Messages</h1>
			<span class="text-xs text-zinc-500">@{$user?.document?.displayName}</span>
		</div>
	</div>
	<button
		class="button-after button-after-10 button-after--zinc | z-5 | group outline-none after:transition"
	>
		<span class="sr-only">Options</span>
		<i class="bx bx-cog text-zinc-400 text-2xl group-hover:text-white group-focus:text-white" />
	</button>
</MobileSidebar>

<main class="max-w-md w-full mx-auto mt-24 mb-12">
	<MessagePreview
		name="Shawn"
		displayName="elonmusk"
		imageURL="https://lh3.googleusercontent.com/a-/AFdZucpJfiM9IztWXzGvcuh_JnoCEwlACG5tk74pV_Ty=s96-c"
	/>
	<MessagePreview name="Shawn Lee" displayName="OGShawnLee" imageURL={$user?.document.imageURL} />
</main>

<MobileNavigation>
	<MobileNavigationLink icon="bx-home-circle" href="/home" />
	<MobileNavigationLink icon="bx-search" href="/search" />
	<MobileNavigationLink icon="bx-bell" href="/notifications" />
	<MobileNavigationLink icon="bxs-envelope" href="/messages" class="relative">
		<ButtonRounded
			as="a"
			class="absolute -top-24 right-1/2 | grid place-content-center | transform translate-x-1/2"
			backgroundColor="bg-sky-500"
			href="/messages/compose"
		>
			<i class="bx bx-message-square-add | text-2xl" />
			<span class="sr-only">Send a Message</span>
		</ButtonRounded>
	</MobileNavigationLink>
</MobileNavigation>
