<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`docs.json`).then(r => r.json()).then(docs => {
      console.log('docs', docs, 'docs end');
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

<h1>Recent docs</h1>

	{#each docs as doc}
    
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='docs/{doc.shortName}'>{doc.name}</a></li>
	{/each}
