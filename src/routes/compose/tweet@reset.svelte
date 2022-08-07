<script lang="ts">
	import type { WhoCanReply } from "@root/types";
	import { ButtonRounded, Header, TweetCompose } from "$lib/components";
	import { sendTweet } from "@root/services/db";
	import { user } from "@root/state";

	let canReply: WhoCanReply;
	let value: string | null;
	let imagePathURL: string | null;

	async function tweet() {
		if (!$user?.document || (!imagePathURL && !value)) return;

		const initialImagePathURL = imagePathURL;
		imagePathURL = null;
		const initialText = value;
		value = "";
		const initialCanReply = canReply;
		canReply = "EVERYONE";

		await sendTweet($user.document, {
			text: initialText,
			imageURL: initialImagePathURL,
			whoCanReply: initialCanReply
		});
	}
</script>

<svelte:head>
	<title>Compose new Tweet / Twitter</title>
</svelte:head>

<Header class="justify-between">
	<ButtonRounded as="a" class="grid place-content-center" href="/home">
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</ButtonRounded>
	<ButtonRounded backgroundColor="bg-sky-500" on:click={tweet}>
		<i class="bx bx-pen | text-2xl" />
		<span class="sr-only">Tweet</span>
	</ButtonRounded>
</Header>

<main class="max-w-md w-full mx-auto my-24 px-6 | grid gap-12">
	<TweetCompose bind:value bind:canReply bind:imagePathURL />
</main>
