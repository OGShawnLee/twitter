<script lang="ts">
	export let title: string;
</script>

<section>
	<h2 class="text-xl font-semibold">{title}</h2>
	<div class="py-6">
		<span class="text-sm text-zinc-400">
			<slot />
		</span>
	</div>
</section>
