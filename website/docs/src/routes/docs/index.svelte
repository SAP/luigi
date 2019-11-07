<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`docs.json`,{"Strict-Transport-Security": "max-age=31536000;includeSubDomains; preload"}).then(r => r.json()).then(docs => {
			return { docs };
		});
	}
	
</script>

<script>
	export let docs;
</script>

<style>
	
</style>

<svelte:head>
	<title>Documentation</title>
</svelte:head>

<h1>All docs</h1>

	{#each docs as doc}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='docs/{doc.shortName}'>{doc.name}</a></li>
	{/each}
