<script>
	import { ButtonRounded, Header, RetweetUserLink } from "$lib/components";
</script>

<svelte:head>
	<title>Retweeted by / Twitter</title>
</svelte:head>

<Header>
	<ButtonRounded on:click={() => history.back()}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</ButtonRounded>
	<h1 class="text-xl font-medium">Retweeted by</h1>
</Header>

<main class="max-w-md w-full mx-auto mt-24 mb-12">
	<RetweetUserLink displayName="OGShawnLee" name="Shawn Lee">
		Quisque ac pretium eros. Suspendisse at faucibus ex. In eu ultrices est, vel eleifend mi. Nulla
		at efficitur diam. Ut ultricies accumsan tempor.
	</RetweetUserLink>
	<RetweetUserLink displayName="OGShawnLee" name="Shawn Lee">
		In eu ultrices est, vel eleifend mi. Nulla at efficitur diam. Ut ultricies accumsan tempor.
	</RetweetUserLink>
	<RetweetUserLink displayName="OGShawnLee" name="Shawn Lee">
		Quisque ac pretium eros.
	</RetweetUserLink>
	<RetweetUserLink displayName="OGShawnLee" name="Shawn Lee">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus, lacus vel vulputate
		consequat, mauris sapien faucibus nisl, et malesuada velit urna vitae tortor.
	</RetweetUserLink>
	<RetweetUserLink displayName="OGShawnLee" name="Shawn Lee">
		Ut ultricies accumsan tempor.
	</RetweetUserLink>
</main>
