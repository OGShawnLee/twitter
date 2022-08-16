<script lang="ts">
	import type { Timestamp } from "firebase/firestore";
	import { Time } from "$lib/utils";
	import { useInterval } from "$lib/hooks";

	export let createdAt: Timestamp;

	const date = createdAt.toDate();
	let timeText = Time.getTimeMessage(date);

	useInterval(() => {
		timeText = Time.getTimeMessage(date);
	}, 60000);
</script>

<span class="text-zinc-500"> {timeText} </span>
