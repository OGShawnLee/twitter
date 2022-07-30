<script lang="ts">
	import { MobileNavigation } from "$lib/layout";
	import { MobileNavigationLink } from "$lib/components";
</script>

<svelte:head>
	<title>Settings / Twitter</title>
</svelte:head>

<slot />

<MobileNavigation>
	<MobileNavigationLink icon="bxs-home-circle" href="/home" />
	<MobileNavigationLink icon="bx-search" href="/search" />
	<MobileNavigationLink icon="bx-bell" href="/notifications" />
	<MobileNavigationLink icon="bx-envelope" href="/messages" />
</MobileNavigation>
