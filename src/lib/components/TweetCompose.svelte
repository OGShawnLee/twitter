<script lang="ts" context="module">
	function getCharCountColour(charCount: number) {
		if (charCount === 0) return "text-current";
		if (charCount < 160) return "text-green-500";
		if (charCount >= 160 && charCount < 280) return "text-orange-500";
		return "text-red-500";
	}
</script>

<script lang="ts">
	export let value = "";

	$: charCount = value.length;
	$: textColour = getCharCountColour(charCount);
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

	<div class="w-full">
		<label class="sr-only" for="tweet"> Tweet </label>
		<textarea
			class="w-full | bg-transparent outline-none text-white"
			placeholder="What's happening?"
			id="tweet"
			maxlength="280"
			bind:value
		/>
	</div>

	<div class="flex flex-col items-start gap-3">
		<button class="flex items-center gap-3 | text-sky-500">
			<i class="bx bx-world text-xl" />
			<span class="text-sm"> Everyone can reply </span>
		</button>

		<div class="h-0.5 w-full | bg-zinc-800 rounded-md" role="separator" />

		<div class="w-full | flex items-center justify-between">
			<div class="flex items-center gap-3">
				<button class="text-sky-600">
					<i class="bx bx-image" />
					<span class="sr-only">Add a Picture</span>
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
