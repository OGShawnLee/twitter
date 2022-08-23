<script lang="ts">
	import "@root/styles/button-after.css";
	import { InputImage } from "$lib/components";

	export let message: string | null;
	export let imagePathURL: string | null;
</script>

<form class="fixed bottom-0 inset-x-0" on:submit|preventDefault>
	<div class="h-12 py-1 px-2.25 | bg-zinc-800">
		<div class="h-full w-full | flex items-center gap-1.75">
			<InputImage bind:imagePathURL />
			<div class="flex-grow">
				<label class="sr-only" for="message">Message</label>
				<textarea
					class="h-9.5 min-h-9.5 w-full px-3 pt-2.5 | bg-transparent rounded-xl border-2 border-zinc-600 outline-none text-sm focus:border-zinc-500"
					placeholder="Start a new message"
					maxlength="300"
					autocapitalize="sentences"
					autocomplete="on"
					spellcheck="true"
					bind:value={message}
				/>
			</div>
			<button class="outline-none" type="submit">
				<i class="bx bx-send text-xl" />
			</button>
		</div>
	</div>
</form>
