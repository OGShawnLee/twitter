<script lang="ts">
	import type { MessageDocument } from "@root/types";
	import { MessageTime } from "$lib/components";
	import { user } from "@root/state";

	export let message: MessageDocument;

	$: isOwner = $user?.account.uid === message.user.uid;
</script>

<div class="flex flex-col gap-0.75 {isOwner ? 'ml-auto items-end' : 'mr-auto items-start'}">
	<div
		class="py-2 px-3.5 | {isOwner
			? 'bg-zinc-700 rounded-br-none'
			: 'bg-zinc-800 rounded-bl-none'} rounded-xl"
	>
		<span> {message.text} </span>
	</div>
	<MessageTime {isOwner} createdAt={message.createdAt} />
</div>
