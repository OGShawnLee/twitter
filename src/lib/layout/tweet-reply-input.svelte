<script lang="ts">
	import { ButtonRounded, InputImage } from "$lib/components";
	import { slide } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { user } from "@root/state";
	import { sendTweet } from "@root/services/db";

	export let displayName: string;
	export let uid: string;
	export let id: string;

	let value = "";
	let isReplyActive = false;
	let imagePathURL: string | null = null;

	async function handleSubmit() {
		if (!$user) return;
		await sendTweet($user.document, {
			text: value,
			imageURL: imagePathURL,
			whoCanReply: "EVERYONE",
			inReplyTo: { uid, id, displayName }
		});
		value = "";
		imagePathURL = null;
	}
</script>

<form
	class="py-2.5 | grid gap-3 | border-y-2 border-zinc-800"
	on:submit|preventDefault={handleSubmit}
>
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

		<div class="w-full h-[fit-content] | grid gap-4">
			<div>
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

			{#if imagePathURL}
				<div class="relative w-full">
					<ButtonRounded
						class="absolute top-2 left-2"
						size="h-8 w-8 min-w-8"
						on:click={() => (imagePathURL = null)}
					>
						<i class="bx bx-x text-2xl text-white" />
						<span class="sr-only">Remove Image</span>
					</ButtonRounded>
					<img src={imagePathURL} alt="" class="w-full rounded-lg" />
				</div>
			{/if}
		</div>
	</div>

	{#if isReplyActive}
		<div
			class="w-full | flex items-center justify-between"
			transition:slide|local={{ easing: cubicOut }}
		>
			<div class="flex items-center gap-3">
				<InputImage bind:imagePathURL />
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
