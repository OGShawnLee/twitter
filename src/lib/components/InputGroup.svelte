<script lang="ts">
	import { isEmpty, isNumber, isString } from "malachite-ui/predicate";

	export let id: string;
	export let label = id;
	export let icon: string;
	export let charCount: number | undefined = undefined;
	export let charLimit: string | undefined = undefined;
</script>

<div class="grid gap-4">
	<div class="grid gap-1.25">
		<div class="flex items-center justify-between">
			<label class="capitalize" for={id}>{label}</label>
			{#if isNumber(charCount) && isString(charLimit) && !isEmpty(charLimit)}
				<span class="text-sm text-zinc-400">
					{charCount} / {charLimit}
				</span>
			{/if}
		</div>
		<div class="flex group | border-2 border-zinc-800 focus-within:border-white">
			<div class="w-12 min-w-12 h-12 | grid place-content-center | bg-zinc-800 text-sky-500">
				<i class="bx {icon} | text-2xl text-sky-500 group-focus-within:text-white" />
			</div>
			<!-- svelte-ignore invalid-html-attribute -->
			<slot
				className="w-full h-full px-3 | bg-transparent outline-none font-medium placeholder-zinc-500"
				{id}
			/>
		</div>
	</div>
</div>
