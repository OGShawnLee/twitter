<script lang="ts">
	import { MobileNavigation } from "$lib/layout";
	import { ButtonRounded, Header, MobileNavigationLink, SettingsLink } from "$lib/components";
</script>

<Header>
	<ButtonRounded on:click={() => history.back()}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</ButtonRounded>
	<div class="grid">
		<div class="flex items-center gap-3">
			<h1 class="text-xl font-medium">Settings</h1>
		</div>
		<span class="text-xs text-zinc-500">@OGShawnLee</span>
	</div>
</Header>

<main class="max-w-md w-full mx-auto my-24">
	<div>
		<SettingsLink text="Account" href="/account" icon="bx-user-circle" />
		<SettingsLink
			text="Security and Account Access"
			href="/security_and_account_access"
			icon="bx-fingerprint"
		/>
		<SettingsLink text="Privacy and Safety" href="/privacy_and_safety" icon="bx-lock" />
		<SettingsLink text="Notifications" href="/notifications" icon="bx-bell" />
		<SettingsLink
			text="Accessibility, Display and Languages"
			href="/accessibility_display_and_languages"
			icon="bx-accessibility"
		/>
		<SettingsLink text="Additional Resources" href="/about" icon="bx-info-circle" />
	</div>
</main>

<MobileNavigation>
	<MobileNavigationLink icon="bxs-home-circle" href="/home" />
	<MobileNavigationLink icon="bx-search" href="/search" />
	<MobileNavigationLink icon="bx-bell" href="/notifications" />
	<MobileNavigationLink icon="bx-envelope" href="/messages" />
</MobileNavigation>
