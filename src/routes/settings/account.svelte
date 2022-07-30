<script>
	import "@root/styles/button-rounded.css";
	import { Header, SettingsLink } from "$lib/components";
	import { Navigable } from "malachite-ui/components";
	import { user } from "@root/state";
</script>

<svelte:head>
	<title>Account / Twitter</title>
</svelte:head>

<Header>
	<button class="button-rounded size-12 background-zinc" on:click={() => history.back()}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</button>
	<div class="grid">
		<div class="flex items-center gap-3">
			<h1 class="text-xl font-medium">Account</h1>
		</div>
		<span class="text-xs text-zinc-500">@{$user?.document.displayName}</span>
	</div>
</Header>

<main class="max-w-md w-full mx-auto mt-20 mb-24">
	<span class="px-6 | block | text-xs text-zinc-400">
		See information about your account, download an archive of your data, or learn your account
		deactivation options.
	</span>
	<div class="mt-3">
		<Navigable vertical>
			<SettingsLink text="Account Information" href="/your_twitter_data/account" icon="bx-user-pin">
				See your account information like your phone number and email address.
			</SettingsLink>
			<SettingsLink text="Change Password" href="/password" icon="bx-key">
				Change your password at any time.
			</SettingsLink>
			<SettingsLink text="Download and Archive" href="/download_your_data" icon="bx-download">
				Get insights into the type of information stored for your account.
			</SettingsLink>
			<SettingsLink text="Deactivate Account" href="/deactivate" icon="bx-trash" isDanger>
				Find out how you can deactivate your account.
			</SettingsLink>
		</Navigable>
	</div>
</main>
