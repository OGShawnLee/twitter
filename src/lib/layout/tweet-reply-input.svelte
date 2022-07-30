<script lang="ts">
	import { slide } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { user } from "@root/state";

	export let value = "";
	export let displayName: string;

	let isReplyActive = false;
</script>

<form class="py-2.5 | grid gap-3 | border-y-2 border-zinc-800">
	{#if isReplyActive}
		<span class="text-sm text-zinc-400" transition:slide|local={{ easing: cubicOut }}>
			Replying to <span class="text-sky-400 font-medium">@{displayName}</span>
		</span>
	{/if}

	<div class="flex gap-3">
		<a class="self-start | rounded-full outline-none focus:(ring-2 ring-white) z-5" href="/Windows">
			<img class="h-10 min-w-10 w-10 rounded-full" src={$user?.document?.imageURL} alt="" />
			<span class="sr-only">View Profile Picture</span>
		</a>

		<div class="w-full h-[fit-content]">
			<label class="sr-only" for="tweet-reply">Reply</label>
			<textarea
				class="w-full pt-2.5 | bg-transparent outline-none"
				placeholder="Tweet your reply"
				id="tweet-reply"
				maxlength="280"
				spellcheck="true"
				bind:value
				on:focus={() => (isReplyActive = true)}
			/>
		</div>
	</div>

	{#if isReplyActive}
		<div
			class="w-full | flex items-center justify-between"
			transition:slide|local={{ easing: cubicOut }}
		>
			<div class="flex items-center gap-3">
				<button class="text-sky-600" type="button">
					<i class="bx bx-image" />
					<span class="sr-only">Add a Picture</span>
					<input class="hidden" type="file" />
				</button>
				<button class="text-sky-600" type="button">
					<i class="bx bx-poll" />
					<span class="sr-only">Create a Poll</span>
				</button>
			</div>
			<button class="py-2 px-6 | bg-sky-500 rounded-full text-sm font-medium" type="submit">
				Reply
			</button>
		</div>
	{/if}
</form>
