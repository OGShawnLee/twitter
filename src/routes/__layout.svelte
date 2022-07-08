<script>
	import "virtual:windi.css";
</script>

<slot />

<nav class="fixed bottom-0 inset-x-0 h-15 | bg-zinc-800">
	<ul class="max-w-md h-full w-full px-6 mx-auto | flex items-center justify-between | text-32px">
		<li>
			<a href="/home">
				<i class="bx bxs-home-circle" />
			</a>
		</li>
		<li>
			<a href="/search">
				<i class="bx bx-search" />
			</a>
		</li>
		<li>
			<a href="/notifications">
				<i class="bx bx-bell" />
			</a>
		</li>
		<li class="relative">
			<a href="/notifications">
				<i class="bx bx-envelope" />
			</a>
			<a
				class="absolute -top-24 right-1/2 h-12 min-w-12 w-12 | grid place-content-center | bg-sky-500 rounded-full transform translate-x-1/2"
				href="/compose/tweet"
			>
				<i class="bx bx-pen | text-2xl" />
				<span class="sr-only">Tweet</span>
			</a>
		</li>
	</ul>
</nav>
