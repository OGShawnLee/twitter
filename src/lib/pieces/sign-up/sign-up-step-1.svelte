<script lang="ts">
	import "@root/styles/button-rounded.css";
	import { InputGroup, PasswordToggler } from "$lib/components";
	import { createEventDispatcher } from "svelte";

	const dispath = createEventDispatcher<{ success: void }>();

	export let name = "";

	let isShowingPassword = false;

	$: charCount = name.length;
	$: passwordType = isShowingPassword ? "text" : "password";

	function handleSubmit() {
		dispath("success");
	}
</script>

<form class="grid gap-8" on:submit|preventDefault={handleSubmit}>
	<div class="grid gap-8">
		<h3 class="text-2xl font-medium">Create your Account</h3>
		<div class="grid gap-4">
			<InputGroup id="name" icon="bx-user-circle" {charCount} charLimit="50" let:className let:id>
				<input class={className} type="text" {id} placeholder="John Doe" bind:value={name} />
			</InputGroup>
			<InputGroup id="email" icon="bx-envelope" let:className let:id>
				<input class={className} type="email" {id} placeholder="equilibrium@gmail.com" />
			</InputGroup>
			<InputGroup id="password" icon="bx-lock" let:className let:id>
				<div class="w-full | flex">
					<input class="{className} pr-0" type={passwordType} {id} placeholder="Password" />
					<PasswordToggler bind:isShowingPassword />
				</div>
			</InputGroup>
			<InputGroup id="birth-date" label="Birth Date" icon="bx-calendar" let:className let:id>
				<input class={className} type="date" {id} max="2020-01-01" min="1902-01-01" />
			</InputGroup>
		</div>
	</div>
	<button
		class="px-6 py-2.5 | bg-sky-500 rounded-full text-lg font-bold hover:bg-sky-400 focus:(ring-2 ring-white)"
	>
		Continue
	</button>
</form>

<style>
	input[type="date"] {
		color-scheme: dark;
	}
</style>
