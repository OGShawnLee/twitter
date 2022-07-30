<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { Header, SettingsLink } from "$lib/components";
	import { Navigable } from "malachite-ui/components";
	import { user } from "@root/state";
</script>

<svelte:head>
	<title>Account Information / Twitter</title>
</svelte:head>

<Header>
	<button class="button-rounded size-12 background-zinc" on:click={() => history.back()}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</button>
	<div class="grid">
		<div class="flex items-center gap-3">
			<h1 class="text-xl font-medium">Account Information</h1>
		</div>
		<span class="text-xs text-zinc-500">@{$user?.document.displayName}</span>
	</div>
</Header>

<main class="max-w-md w-full mx-auto mt-20 mb-24">
	<Navigable vertical>
		<SettingsLink text="Display Name" href="/display_name" icon="bx-at">
			@{$user?.document.displayName}
		</SettingsLink>
		<SettingsLink text="Verified" href="/account/request_verification" icon="bxs-badge-check" />
	</Navigable>
</main>
