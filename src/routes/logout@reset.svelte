<script>
	import { auth } from "@root/firebase";
	import { signOut } from "firebase/auth";
	import { goto } from "$app/navigation";

	async function handleSignOut() {
		await signOut(auth);
		goto("/login");
	}
</script>

<main class="min-h-screen | flex items-center justify-center">
	<div class="max-w-xs p-7.5 | bg-zinc-800 rounded-2xl">
		<i class="bx bxl-twitter | mb-4 | text-40px" />
		<div class="flex flex-col gap-4">
			<h1 class="text-2xl font-medium">Log out of Twitter?</h1>
			<p class="text-zinc-400 leading-snug">
				You can always log back in at any time. If you just want to switch accounts, you can do that
				by adding an existing account
			</p>
		</div>
		<div class="grid gap-3 | mt-6">
			<button
				class="min-h-10.5 px-6 py-2 | bg-white rounded-full text-zinc-900 font-medium"
				on:click={handleSignOut}
			>
				Log Out
			</button>
			<a
				class="min-h-10.5 px-6 py-2 | flex justify-center | rounded-full border-2 border-white font-medium"
				href="/home"
			>
				Cancel
			</a>
		</div>
	</div>
</main>
