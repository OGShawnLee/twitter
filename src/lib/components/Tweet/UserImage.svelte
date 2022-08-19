<script lang="ts">
	import type { Nullable } from "malachite-ui/types";

	export let displayName: string | null;
	export let imageURL: Nullable<string>;
</script>

<a class="rounded-full outline-none focus:(ring-2 ring-white) z-5" href="/{displayName}">
	<img class="h-10 min-w-10 w-10 rounded-full" src={imageURL} alt="" />
	<span class="sr-only">View {displayName} Profile</span>
</a>
