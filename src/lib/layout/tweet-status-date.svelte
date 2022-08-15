<script lang="ts">
	import type { Timestamp } from "firebase/firestore";
	import { formatHour, formatStatusDate } from "$lib/utils";

	export let createdAt: Timestamp;

	$: jsDate = createdAt.toDate();
	$: hour = formatHour(jsDate);
	$: date = formatStatusDate(jsDate);
</script>

<div
	class="pb-2.5 | flex items-center justify-between | border-b-2 border-zinc-800 text-sm text-zinc-400"
>
	<span> {hour} </span>
	<span aria-hidden="true"> • </span>
	<span> {date} </span>
	<span aria-hidden="true"> • </span>
	<span> Twitter Web App </span>
</div>
