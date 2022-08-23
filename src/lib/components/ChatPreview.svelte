<script lang="ts">
	import type { ChatDocument } from "@root/types";
	import { TweetMenuItem, TweetTime, TweetUserImage } from "$lib/components";
	import { Menu, MenuButton, MenuItem } from "malachite-ui/components";
	import { hideScrollbar } from "$lib/actions";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { user } from "@root/state";
	import { goto } from "$app/navigation";
	import { isWithin } from "malachite-ui/predicate";

	export let chat: ChatDocument;

	const otherUser = chat.sender.uid === $user?.account.uid ? chat.receiver : chat.sender;

	let buttonRef: HTMLElement;
	let panelRef: HTMLElement;
	let overlayRef: HTMLElement;

	function viewChat(event?: MouseEvent | KeyboardEvent) {
		if (isWithin([buttonRef, panelRef, overlayRef], event?.target)) return;
		goto(`/messages/${$user?.account.uid}-${otherUser.uid}`);
	}
</script>

<div
	class="px-6 py-3 | border-2 border-transparent outline-none hover:bg-zinc-800 focus-visible:border-white"
	role="button"
	tabindex="0"
	aria-label="View your Conversation with {otherUser.displayName}"
	on:click={viewChat}
	on:keydown|self={({ code }) => code === "Enter" && viewChat()}
>
	<div class="grid gap-3">
		<header class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<TweetUserImage displayName={otherUser.displayName} imageURL={otherUser.imageURL} />
				<div class="grid">
					<h3 class="font-medium">
						<a class="relative outline-none focus:underline z-5" href="/{otherUser.displayName}">
							{otherUser.name}
						</a>
					</h3>
					<div class="flex items-center gap-2.5 | text-xs">
						<span class="text-zinc-400">@{otherUser.displayName}</span>
						<TweetTime createdAt={chat.lastUpdated} />
					</div>
				</div>
			</div>

			<Menu let:items let:isOpen>
				<MenuButton
					class="button-after button-after-10 button-after--zinc | z-5 | group outline-none after:transition"
					bind:element={buttonRef}
				>
					<span class="sr-only">Options</span>
					<i
						class="bx bx-dots-horizontal-rounded text-zinc-400 text-2xl group-hover:text-white group-focus:text-white"
					/>
				</MenuButton>

				{#if isOpen}
					<div
						class="fixed inset-0 z-20 | bg-zinc-800/70"
						transition:fade|local={{ easing: cubicOut }}
						bind:this={overlayRef}
					/>
				{/if}

				<div
					class="fixed inset-x-0 bottom-0 z-20 bg-zinc-900 | grid | outline-none"
					slot="items"
					use:items
					use:hideScrollbar
					transition:fly|local={{ y: 250 }}
					bind:this={panelRef}
				>
					<TweetMenuItem icon="bx-pin" text="Pin conversation" />
					<TweetMenuItem icon="bx-bell-off" text="Snooze conversation" />
					<TweetMenuItem icon="bxs-radiation" text="Report conversation" isDanger />
					<TweetMenuItem icon="bx-trash" text="Delete conversation" isExtremeDanger />
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
		</header>

		{#if chat.lastMessage?.text}
			<p class="text-sm text-zinc-400 leading-relaxed">
				{chat.lastMessage.text}
			</p>
		{/if}
	</div>
</div>
