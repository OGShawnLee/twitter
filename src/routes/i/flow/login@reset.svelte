<script>
	import "@root/styles/button-rounded.css";
	import { Header, InputGroup, PasswordToggler, Separator } from "$lib/components";

	let isShowingPassword = false;

	$: passwordType = isShowingPassword ? "text" : "password";
</script>

<Header>
	<a class="button-rounded size-12 background-zinc" href="/login">
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</a>
</Header>

<main class="max-w-md w-full mx-auto px-6 mt-24 mb-12">
	<h1 class="mb-8 text-2xl font-bold">Join Twitter today.</h1>
	<div class="grid gap-4">
		<button class="px-6 py-2 | bg-white rounded-full text-zinc-900 font-bold">
			<span class="mx-auto inline-flex items-center gap-2">
				<i class="bx bxl-google | text-2xl" />
				<span> Continue with Google </span>
			</span>
		</button>
		<button class="px-6 py-2 | bg-white rounded-full text-zinc-900 font-bold">
			<span class="mx-auto inline-flex items-center gap-2">
				<i class="bx bxl-apple | text-2xl" />
				<span> Continue with Apple </span>
			</span>
		</button>
	</div>
	<Separator class="my-6" />
	<form class="grid gap-4">
		<InputGroup id="email" icon="bx-envelope" let:className let:id>
			<input class={className} {id} placeholder="equilibrium@example.com" />
		</InputGroup>
		<InputGroup id="password" icon="bx-lock" let:className let:id>
			<div class="w-full | flex">
				<input class="{className} pr-0" type={passwordType} {id} placeholder="Password" />
				<PasswordToggler bind:isShowingPassword />
			</div>
		</InputGroup>
		<button class="mt-6 px-6 py-3 | bg-sky-500 rounded-full text-lg font-bold"> Continue </button>
	</form>
	<div class="grid gap-10">
		<button
			class="mt-3 px-6 py-3 | border-2 border-zinc-700 rounded-full text-zinc-400 font-medium focus:(ring-2 ring-white)"
		>
			Forgot Password?
		</button>
		<section class="grid gap-4">
			<h2 class="text-xl text-center font-bold">Don't have an account?</h2>
			<button
				class="px-6 py-3 | border-2 border-zinc-400 rounded-full | text-lg text-sky-500 font-medium"
			>
				Sign Up
			</button>
		</section>
	</div>
</main>
