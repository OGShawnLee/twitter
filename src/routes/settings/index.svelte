<script lang="ts">
	import { ButtonRounded, Header, SettingsLink } from "$lib/components";
	import { Navigable } from "malachite-ui/components";
	import { user } from "@root/state";
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
		<span class="text-xs text-zinc-500">@{$user?.document?.displayName}</span>
	</div>
</Header>

<main class="max-w-md w-full mx-auto my-24">
	<Navigable vertical>
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
	</Navigable>
</main>
