<script>
	import "virtual:windi.css";
	import { MobileNavigation } from "$lib/layout";
	import { ButtonRounded, MobileNavigationLink } from "$lib/components";
</script>

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
