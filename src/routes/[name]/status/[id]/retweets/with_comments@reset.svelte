<script>
	import { MobileNavigation } from "$lib/layout";
	import { ButtonRounded, Header, MobileNavigationLink } from "$lib/components";
	import { Tweet, TweetQuote } from "$lib/components/Tweet";
</script>

<svelte:head>
	<title>Quote Tweets / Twitter</title>
</svelte:head>

<Header>
	<ButtonRounded on:click={() => history.back()}>
		<i class="bx bxs-left-arrow-alt | text-2xl" />
		<span class="sr-only">Go Back</span>
	</ButtonRounded>
	<h1 class="text-xl font-medium">Quote Tweets</h1>
</Header>

<main class="max-w-md w-full mx-auto px-6 my-24">
	<section class="after:text-red-400">
		<h2 class="sr-only">Tweets</h2>
		<div class="grid gap-12">
			<Tweet>
				<TweetQuote />
			</Tweet>
			<Tweet>
				<TweetQuote
					imageURL="https://i.pinimg.com/564x/86/b8/17/86b817cd726c5108bc786645939296c4.jpg"
				/>
			</Tweet>
			<Tweet>
				<TweetQuote />
			</Tweet>
		</div>
	</section>
</main>

<MobileNavigation>
	<MobileNavigationLink icon="bxs-home-circle" href="/home" />
	<MobileNavigationLink icon="bx-search" href="/search" />
	<MobileNavigationLink icon="bx-bell" href="/notifications" />
	<MobileNavigationLink icon="bx-envelope" href="/messages" />
</MobileNavigation>
