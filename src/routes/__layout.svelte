<script>
	import "virtual:windi.css";
	import { Loader, MobileNavigation } from "$lib/layout";
	import { ButtonRounded, MobileNavigationLink } from "$lib/components";
	import { useAuthStateWatcher } from "$lib/hooks";
	import { isRestrictedRoute } from "$lib/predicate";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { user } from "@root/state";

	const { isLoading } = useAuthStateWatcher({
		isRestrictedRoute: $user ? false : isRestrictedRoute($page.url.pathname),
		onNullishState: async () => {
			if (isRestrictedRoute($page.url.pathname)) await goto("/login");
		}
	});
</script>

{#if $isLoading}
	<Loader />
{:else}
	<slot />

	<MobileNavigation>
		<MobileNavigationLink icon="bxs-home-circle" href="/home" />
		<MobileNavigationLink icon="bx-search" href="/search" />
		<MobileNavigationLink icon="bx-bell" href="/notifications" />
		<MobileNavigationLink icon="bx-envelope" href="/messages" class="relative">
			<ButtonRounded
				as="a"
				class="absolute -top-24 right-1/2 | grid place-content-center | transform translate-x-1/2"
				backgroundColor="bg-sky-500"
				href="/compose/tweet"
			>
				<i class="bx bx-pen | text-2xl" />
				<span class="sr-only">Tweet</span>
			</ButtonRounded>
		</MobileNavigationLink>
	</MobileNavigation>
{/if}
