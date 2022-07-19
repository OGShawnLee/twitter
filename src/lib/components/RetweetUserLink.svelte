<script lang="ts">
	import { goto } from "$app/navigation";

	export let displayName: string;
	export let name: string;
</script>

<div
	class="px-6 py-3 | border-2 border-transparent outline-none hover:bg-zinc-800 focus:border-white"
	role="button"
	tabindex="0"
	aria-label="View {displayName} Profile"
	on:click={() => goto("/" + displayName)}
	on:keydown={({ code }) => code === "Enter" && goto("/" + displayName)}
>
	<div class="grid gap-3">
		<header class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<a
					class="rounded-full outline-none focus:(ring-2 ring-white)"
					href="/{displayName}"
					tabindex="-1"
				>
					<img
						class="h-10 min-w-10 w-10 rounded-full"
						src="https://avatars.githubusercontent.com/u/86738291?v=4"
						alt=""
					/>
					<span class="sr-only">View {displayName} Profile</span>
				</a>

				<div class="grid">
					<h2 class="font-medium">
						<a class="relative outline-none focus:underline" href="/{displayName}"> {name} </a>
					</h2>
					<span class="text-sm text-zinc-400">@{displayName}</span>
				</div>
			</div>

			<button class="w-[fit-content] px-6 py-1.5 | bg-white rounded-full text-zinc-900 font-medium">
				Follow
			</button>
		</header>

		<p class="text-sm leading-relaxed">
			<slot />
		</p>
	</div>
</div>
