<script lang="ts">
	import type { UserHeader } from "@root/types";
	import { Menu, MenuButton } from "malachite-ui/components";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { hideScrollbar } from "$lib/actions";

	export let user: UserHeader;
	export let createdAt: string | null = null;
</script>

<header class="flex items-center justify-between">
	<div class="flex items-center gap-4">
		<a class="rounded-full outline-none focus:(ring-2 ring-white) z-5" href="/{user.displayName}">
			<img class="h-10 min-w-10 w-10 rounded-full" src={user.imageURL} alt="" />
			<span class="sr-only">View {user.displayName} Profile</span>
		</a>

		<div class="grid">
			<h3 class="font-medium">
				<a class="relative outline-none focus:underline z-5" href="/{user.displayName}">
					{user.name}
				</a>
			</h3>
			<div class="space-x-1 | text-xs">
				<span class="text-zinc-400">@{user.displayName}</span>
				{#if createdAt}
					<span class="text-zinc-500">{createdAt}</span>
				{/if}
			</div>
		</div>
	</div>

	<Menu let:items let:isOpen>
		<MenuButton
			class="button-after button-after-10 button-after--zinc | z-5 | group outline-none after:transition"
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
			/>
		{/if}

		<div
			class="fixed inset-x-0 bottom-0 z-20 bg-zinc-900 | grid | outline-none"
			slot="items"
			use:items
			use:hideScrollbar
			transition:fly|local={{ y: 250 }}
		>
			<slot />
		</div>
	</Menu>
</header>
