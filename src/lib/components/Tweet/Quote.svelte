<script lang="ts">
	import { goto } from "$app/navigation";

	export let imageURL: string | undefined = undefined;
</script>

<div
	class="relative z-5 p-3 | rounded-lg outline-none border-2 border-zinc-700 overflow-hidden focus:border-white"
	role="link"
	tabindex="0"
	on:keydown|self={({ code }) => code === "Enter" && goto("/OGShawnLee/status/1548398191246069760")}
>
	<div class="space-y-3">
		<header>
			<div class="flex items-center gap-3">
				<a
					class="z-6 | rounded-full outline-none focus:(ring-2 ring-white)"
					href="/OGShawnLee"
					tabindex="-1"
				>
					<img
						class="h-8 min-w-8 w-8 rounded-full"
						src="https://avatars.githubusercontent.com/u/86738291?v=4"
						alt=""
					/>
					<span class="sr-only">View OGShawnLee Profile</span>
				</a>

				<div class="grid">
					<h2 class="z-6 | text-sm font-medium">
						<a class="relative outline-none focus:underline" href="/OGShawnLee" tabindex="-1">
							Shawn Lee
						</a>
					</h2>
					<div class="space-x-1 | text-xs">
						<span class="text-zinc-400">@ShawnLee</span>
						<span class="text-zinc-500">Jun 12 </span>
					</div>
				</div>
			</div>
		</header>

		<div class="grid gap-4">
			<p class="text-xs leading-relaxed">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus, lacus vel vulputate
				consequat, mauris sapien faucibus nisl, et malesuada velit urna vitae tortor. Quisque ac
				pretium eros. Suspendisse at faucibus ex. In eu ultrices est, vel eleifend mi. Nulla at
				efficitur diam. Ut ultricies accumsan tempor.
			</p>

			{#if imageURL}
				<img class="rounded-xl" src={imageURL} alt="" />
			{/if}
		</div>
	</div>

	<a class="full-container-link" href="/OGShawnLee/status/1548398191246069760" tabindex="-1">
		<span class="sr-only"> View Tweet </span>
	</a>
</div>

<style>
	.full-container-link::after {
		content: "";
		position: absolute;
		inset: 0;
		pointer-events: auto;
	}
</style>
