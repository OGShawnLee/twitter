<script lang="ts" context="module">
	type WhoCanReply = "EVERYONE" | "FOLLOWED" | "MENTIONED";

	function getCharCountColour(charCount: number) {
		if (charCount === 0) return "text-current";
		if (charCount < 160) return "text-green-500";
		if (charCount >= 160 && charCount < 280) return "text-orange-500";
		return "text-red-500";
	}

	function getWhoCanReplyIcon(target: WhoCanReply) {
		if (target === "MENTIONED") return "bx-at";
		if (target === "FOLLOWED") return "bx-user-check";
		return "bx-world";
	}

	function getWhoCanReplyText(target: WhoCanReply) {
		if (target === "MENTIONED") return "Only people you mention can reply";
		if (target === "FOLLOWED") return "People you follow can reply";
		return "Everyone can reply";
	}

	function useChooseWhoCanReply(onClick: (target: WhoCanReply) => void) {
		return (target: WhoCanReply) => {
			return () => onClick(target);
		};
	}
</script>

<script lang="ts">
	import { ButtonRounded, TweetComposeMenuItem } from "$lib/components";
	import { Menu, MenuButton, MenuItem } from "malachite-ui/components";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { hideScrollbar } from "$lib/actions";
	import { browser } from "$app/env";
	import { isValidImageFileType } from "$lib/predicate";
	import { isEmpty, isString } from "malachite-ui/predicate";

	export let value = "";
	export let canReply: WhoCanReply = "EVERYONE";

	const setCanReply = useChooseWhoCanReply((target) => (canReply = target));

	let files: FileList;
	let fileInputRef: HTMLInputElement;
	let imagePathURL: string | null = null;

	$: if (files && browser) {
		const file = files.item(0);
		const reader = new FileReader();
		if (file && isValidImageFileType(file.type)) {
			reader.readAsDataURL(file);
			reader.onload = ({ target }) => {
				const imageResult = target?.result;
				const isValidImage = isString(imageResult) && !isEmpty(imageResult);
				if (isValidImage) imagePathURL = imageResult;
			};
		}
	}

	$: charCount = value.length;
	$: textColour = getCharCountColour(charCount);
	$: canReplyIcon = getWhoCanReplyIcon(canReply);
	$: canReplyText = getWhoCanReplyText(canReply);
</script>

<article class="grid gap-6">
	<header class="flex items-center justify-between">
		<div class="flex items-center gap-4">
			<a href="/Windows">
				<img
					class="h-10 min-w-10 w-10 rounded-full"
					src="https://avatars.githubusercontent.com/u/86738291?v=4"
					alt=""
				/>
				<span class="sr-only">View Profile Picture</span>
			</a>

			<div class="grid">
				<h1 class="font-medium">Shawn Lee</h1>
				<div class="space-x-1 | text-xs | text-zinc-400">
					<span>@ShawnLee</span>
					<span class="text-zinc-500">Jun 12 </span>
				</div>
			</div>
		</div>
	</header>

	<div class="w-full | grid gap-4">
		<label class="sr-only" for="tweet"> Tweet </label>
		<textarea
			class="w-full | bg-transparent outline-none text-white"
			placeholder="What's happening?"
			id="tweet"
			maxlength="280"
			bind:value
		/>

		{#if imagePathURL}
			<div class="relative w-full">
				<ButtonRounded class="absolute top-4 left-4" on:click={() => (imagePathURL = null)}>
					<i class="bx bx-x text-2xl text-white" />
					<span class="sr-only">Remove Image</span>
				</ButtonRounded>
				<img src={imagePathURL} alt="" class="w-full rounded-lg" />
			</div>
		{/if}
	</div>

	<div class="flex flex-col items-start gap-3">
		<Menu let:isOpen let:items>
			<MenuButton
				class="px-2 py-0.5 | flex items-center gap-1.5 outline-none | rounded-full text-sky-500 transition ease-out hover:(bg-sky-900 text-sky-200) focus:(bg-sky-900 ring-2 ring-white text-sky-200)"
			>
				<i class="bx {canReplyIcon} text-xl" />
				<span class="text-sm"> {canReplyText} </span>
			</MenuButton>

			{#if isOpen}
				<div
					class="fixed inset-0 z-20 | bg-zinc-800/70"
					transition:fade|local={{ easing: cubicOut }}
				/>
			{/if}

			<div
				class="fixed inset-x-0 bottom-0 z-20 bg-zinc-900 | grid | outline-none"
				slot="items"
				use:items
				use:hideScrollbar
				transition:fly|local={{ y: 250 }}
			>
				<div class="my-4 mx-6 | grid gap-1.5">
					<span class="text-xl font-medium">Who can reply?</span>
					<span class="text-zinc-400 text-sm">
						Choose who can reply to this Tweet. Anyone mentioned can always reply.
					</span>
				</div>
				<TweetComposeMenuItem
					icon="bx-world"
					text="Everyone"
					isChecked={canReply === "EVERYONE"}
					on:click={setCanReply("EVERYONE")}
				/>
				<TweetComposeMenuItem
					icon="bx-user-check"
					text="People you follow"
					isChecked={canReply === "FOLLOWED"}
					on:click={setCanReply("FOLLOWED")}
				/>
				<TweetComposeMenuItem
					icon="bx-at"
					text="Only people you mention"
					isChecked={canReply === "MENTIONED"}
					on:click={setCanReply("MENTIONED")}
				/>
				<MenuItem
					as="button"
					class={{
						base: "min-h-10.5 mx-6 my-4 px-6 py-2 | rounded-full border-2",
						selected: { on: "border-white", off: "border-zinc-600" }
					}}
				>
					Cancel
				</MenuItem>
			</div>
		</Menu>

		<div class="h-0.5 w-full | bg-zinc-800 rounded-md" role="separator" />

		<div class="w-full | flex items-center justify-between">
			<div class="flex items-center gap-3">
				<button class="text-sky-600" on:click={() => fileInputRef.click()}>
					<i class="bx bx-image" />
					<span class="sr-only">Add a Picture</span>
					<input class="hidden" type="file" bind:files bind:this={fileInputRef} />
				</button>
				<button class="text-sky-600">
					<i class="bx bx-poll" />
					<span class="sr-only">Create a Poll</span>
				</button>
			</div>
			<div class="h-full flex items-center gap-2">
				<div class="text-xs">
					<span class="transition {textColour}"> {charCount}</span>
					<span> / 280 </span>
				</div>
				<div class="h-full w-0.5 | bg-zinc-800 rounded-md" role="separator" />
				<button>
					<i class="bx bx-plus-circle text-xl text-sky-500" />
					<span class="sr-only">Add another Tweet</span>
				</button>
			</div>
		</div>
	</div>
</article>
