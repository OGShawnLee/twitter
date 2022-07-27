<script lang="ts">
	import { InputGroup } from "$lib/components";
	import { getImageFilePathURL, toUnderscore } from "$lib/utils";

	export let name: string;

	let displayName = "";
	let imagePathURL =
		"https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";
	let inputRef: HTMLInputElement;
	let files: FileList | null = null;

	$: displayNameCount = displayName.length;
	$: file = files?.item(0);
	$: if (file) {
		getImageFilePathURL(file).then((imagePath) => (imagePathURL = imagePath));
	}
</script>

<form class="grid gap-8">
	<div class="grid gap-8">
		<header>
			<h3 class="text-2xl font-medium">Configure your Account</h3>
		</header>

		<div class="flex items-center gap-3">
			<img
				class="w-12 min-w-12 h-12 | object-cover object-center rounded-full ring-3 ring-zinc-900"
				src={imagePathURL}
				alt=""
			/>

			<div class="grid">
				<span class="text-lg font-medium">
					{name}
				</span>
				<span class="text-sm text-zinc-400">
					@{toUnderscore(displayName || name)}
				</span>
			</div>
		</div>

		<div class="grid gap-4">
			<InputGroup
				id="display-name"
				label="Display Name"
				icon="bx-at"
				charCount={displayNameCount}
				charLimit="18"
				let:className
				let:id
			>
				<input
					class={className}
					type="text"
					{id}
					placeholder="OGJohnDoe"
					bind:value={displayName}
					maxlength="18"
				/>
			</InputGroup>
			<InputGroup
				id="profile-picture"
				label="Profile Picture"
				icon="bx-image-alt"
				let:className
				let:id
			>
				<button
					class="{className} text-left text-zinc-400"
					type="button"
					on:click={() => inputRef.click()}
				>
					Select Image
				</button>
				<input class="sr-only" type="file" {id} bind:files bind:this={inputRef} />
			</InputGroup>
		</div>
	</div>
	<button
		class="px-6 py-2.5 | bg-sky-500 rounded-full text-lg font-bold hover:bg-sky-400 focus:(ring-2 ring-white)"
	>
		Continue
	</button>
</form>
