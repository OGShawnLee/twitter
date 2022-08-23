<script lang="ts">
	import { goto } from "$app/navigation";
	import { user } from "@root/state";

	export let uid: string;
	export let displayName: string | null;

	function handleClick() {
		if (!$user) return;
		goto(`/messages/${$user.account.uid}-${uid}`);
	}
</script>

<button
	class="h-9.5 w-9.5 min-w-9.5 | grid place-content-center | rounded-full border-2 border-zinc-600 outline-none focus:(border-white)"
	on:click={handleClick}
>
	<i class="bx bx-envelope" />
	<span class="sr-only">Send {displayName} a Message </span>
</button>
