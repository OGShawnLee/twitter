<script lang="ts">
	export let isChecked: boolean;
	export let id: string;
	export let label: string;
</script>

<div class="flex items-center justify-between">
	<div class="grid">
		<label for={id}> {label} </label>
		<span class="text-xs text-zinc-400" id="{id}-description">
			<slot />
		</span>
	</div>
	<input type="checkbox" bind:checked={isChecked} {id} aria-describedby="{id}-description" />
</div>
