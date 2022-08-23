<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { collections, db } from "@root/firebase";
	import { isUserDocument } from "$lib/predicate/db";
	import { joinWithIDs } from "$lib/utils";
	import { collection } from "firebase/firestore";

	export const load: Load = async ({ params: { conversation } }) => {
		const userUIDs = conversation.split("-");
		const members = await joinWithIDs(collection(db, collections.users), userUIDs, isUserDocument);
		return { status: 200, props: { members } };
	};
</script>

<script lang="ts">
	import "@root/styles/button-after.css";
	import "@root/styles/button-rounded.css";
	import type { UserDocument } from "@root/types";
	import { Header, Message, MessageInput, TweetUserImage } from "$lib/components";
	import { onMount } from "svelte";
	import { createChat, getChatDocument, sendMessage, useChatSnapshot } from "@root/services/db";
	import { user } from "@root/state";
	import { isLoggedIn } from "@root/state/user";

	export let members: UserDocument[];

	const { messages, initialiseChatSnapshot } = useChatSnapshot();
	const [currentUser, otherUser] = members.reduce((acc, member) => {
		member.uid === $user?.account.uid ? (acc[0] = member) : (acc[1] = member);
		return acc;
	}, [] as UserDocument[]);

	let message: string | null = "";
	let imagePathURL: string | null = "";
	let id: string | null = null;

	async function handleSubmit() {
		if (!$isLoggedIn || !id) return;
		await sendMessage(id, {
			user: currentUser,
			text: message,
			imageURL: imagePathURL
		});
		message = null;
		imagePathURL = null;
	}

	onMount(async () => {
		if (!$isLoggedIn) return;

		const [chat, err] = await getChatDocument(currentUser.uid, otherUser.uid);
		if (err) return;
		if (chat) return initialiseChatSnapshot((id = chat.id));

		const [cid, error] = await createChat(currentUser, otherUser);
		if (error || !cid) return;
		return initialiseChatSnapshot((id = cid));
	});
</script>

<svelte:head>
	<title>{otherUser.name} | Twitter</title>
</svelte:head>

<Header class="justify-between">
	<div class="flex items-center gap-4">
		<div class="contents">
			<a class="button-rounded size-10 background-zinc" href="/messages">
				<i class="bx bxs-left-arrow-alt | text-2xl" />
				<span class="sr-only">Go Back to Messages</span>
			</a>
			<TweetUserImage displayName={otherUser.displayName} imageURL={otherUser.imageURL} />
		</div>
		<div class="grid">
			<h1 class="text-sm font-medium">{otherUser.name}</h1>
			<span class="text-xs text-zinc-500">@{otherUser.displayName}</span>
		</div>
	</div>
	<button
		class="button-after button-after-10 button-after--zinc | z-5 | group outline-none after:transition"
	>
		<span class="sr-only">About this Conversation</span>
		<i
			class="bx bx-info-circle text-zinc-400 text-2xl group-hover:text-white group-focus:text-white"
		/>
	</button>
</Header>

<main class="max-w-md w-full mx-auto px-6 mt-24 mb-12">
	<div class="grid gap-6">
		{#each $messages as message}
			<Message {message} />
		{/each}
	</div>
</main>

<MessageInput bind:message bind:imagePathURL on:submit={handleSubmit} />
