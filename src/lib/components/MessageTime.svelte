<script lang="ts">
	import type { Timestamp } from "firebase/firestore";
	import { Time } from "$lib/utils";

	export let createdAt: Timestamp;
	export let isOwner: boolean;

	const date = createdAt.toDate();
	let timeText = Time.getTimeMessage(date, undefined, true);
</script>

<div class="text-xs {isOwner ? 'ml-auto' : 'mr-auto'}" label={date.toLocaleDateString()}>
	<time class="text-zinc-500" datetime={date.toISOString()}> {timeText} </time>
</div>
