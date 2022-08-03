<script lang="ts">
	export let href: string;
	export let stat: string;
	export let value: string | number;
</script>

<a class="space-x-0.6 | text-sm outline-none border-b border-transparent focus:border-white" {href}>
	<span class="text-zinc-100 font-medium"> {value} </span>
	<span class="text-zinc-400"> {stat} </span>
</a>
