<script lang="ts">
	import type { UserDocument } from "@root/types";
	import { goto } from "$app/navigation";

	export let user: UserDocument;
</script>

<div
	class="px-6 py-3 | border-2 border-transparent outline-none hover:bg-zinc-800 focus:border-white"
	role="button"
	tabindex="0"
	aria-label="View {user.displayName} Profile"
	on:click={() => goto("/" + user.displayName)}
	on:keydown={({ code }) => code === "Enter" && goto("/" + user.displayName)}
>
	<div class="grid gap-3">
		<header class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<a
					class="rounded-full outline-none focus:(ring-2 ring-white)"
					href="/{user.displayName}"
					tabindex="-1"
				>
					<img class="h-10 min-w-10 w-10 rounded-full" src={user.imageURL} alt="" />
					<span class="sr-only">View {user.displayName} Profile</span>
				</a>

				<div class="grid">
					<h2 class="font-medium">
						<a class="relative outline-none focus:underline" href="/{user.displayName}">
							{user.name}
						</a>
					</h2>
					<span class="text-sm text-zinc-400">@{user.displayName}</span>
				</div>
			</div>

			<button class="w-[fit-content] px-6 py-1.5 | bg-white rounded-full text-zinc-900 font-medium">
				Follow
			</button>
		</header>

		{#if user.description}
			<p class="text-sm leading-relaxed">{user.description}</p>
		{/if}
	</div>
</div>
