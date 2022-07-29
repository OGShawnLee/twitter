<script lang="ts">
	import { MobileNavigation } from "$lib/layout";
	import { MobileNavigationLink } from "$lib/components";
</script>

<slot />

<MobileNavigation>
	<MobileNavigationLink icon="bxs-home-circle" href="/home" />
	<MobileNavigationLink icon="bx-search" href="/search" />
	<MobileNavigationLink icon="bx-bell" href="/notifications" />
	<MobileNavigationLink icon="bx-envelope" href="/messages" />
</MobileNavigation>
