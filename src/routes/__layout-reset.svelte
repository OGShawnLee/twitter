<script>
	import "virtual:windi.css";
	import { Loader } from "$lib/layout";
	import { useAuthStateWatcher } from "$lib/hooks";
	import { isRestrictedRoute } from "$lib/predicate";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	const { isLoading } = useAuthStateWatcher({
		isRestrictedRoute: isRestrictedRoute($page.url.pathname),
		onNullishState: async () => {
			if (isRestrictedRoute($page.url.pathname)) await goto("/login");
		}
	});
</script>

{#if $isLoading}
	<Loader />
{:else}
	<slot />
{/if}
