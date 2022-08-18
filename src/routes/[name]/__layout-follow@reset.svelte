<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { getUserDocumentWithDisplayName } from "@root/services/db";

	export const load: Load = async ({ params: { name: displayName } }) => {
		const [user, error] = await getUserDocumentWithDisplayName(displayName);

		if (error) return { status: 500, error };
		if (user)
			return {
				status: 200,
				props: { name: user.name!, displayName },
				stuff: { name: user.name!, displayName, uid: user.uid }
			};

		return { status: 404 };
	};
</script>

<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { MobileNavigation } from "$lib/layout";
	import { Header, MobileNavigationLink, NavigableLinkFloating } from "$lib/components";
	import { Navigable } from "malachite-ui/components";
	import { goto } from "$app/navigation";

	export let displayName: string;
	export let name: string;
</script>

<Header>
	<button class="button-rounded size-12 background-zinc" on:click={() => goto(`/${displayName}`)}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</button>
	<div class="grid">
		<div class="flex items-center gap-3">
			<h1 class="text-xl font-medium">{name}</h1>
		</div>
		<span class="text-xs text-zinc-500">@{displayName}</span>
	</div>
</Header>

<Navigable class="fixed top-20 inset-x-0 h-12 | overflow-x-auto">
	<div class="h-full w-full max-w-md mx-auto | flex items-center">
		<NavigableLinkFloating {displayName} path="following" text="Following" />
		<NavigableLinkFloating {displayName} path="followers" text="Followers" />
	</div>
</Navigable>

<main class="max-w-md w-full mx-auto mt-32 mb-24 | grid gap-5">
	<slot />
</main>

<MobileNavigation>
	<MobileNavigationLink icon="bxs-home-circle" href="/home" />
	<MobileNavigationLink icon="bx-search" href="/search" />
	<MobileNavigationLink icon="bx-bell" href="/notifications" />
	<MobileNavigationLink icon="bx-envelope" href="/messages" />
</MobileNavigation>
