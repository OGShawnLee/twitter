<script lang="ts">
	import type { MessageDocument } from "@root/types";
	import { user } from "@root/state";

	export let message: MessageDocument;

	$: isOwner = $user?.account.uid === message.user.uid;
</script>

<div class={isOwner ? "ml-auto" : "mr-auto"}>
	<div
		class="py-2 px-3.5 | {isOwner
			? 'bg-zinc-700 rounded-br-none'
			: 'bg-zinc-800 rounded-bl-none'} rounded-xl"
	>
		<span> {message.text} </span>
	</div>
</div>
