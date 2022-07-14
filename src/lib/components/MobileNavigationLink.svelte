<script lang="ts">
	let className: string | undefined = undefined;

	export { className as class };
	export let icon: string;
	export let href: string;
</script>

<li class={className}>
	<a {href}>
		<i class="bx {icon}" />
		<slot />
	</a>
</li>
