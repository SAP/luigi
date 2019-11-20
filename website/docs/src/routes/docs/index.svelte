<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`docs.json`).then(r => r.json()).then(docs => {
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

{#each docs as doc}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		{#if doc.shortName == "README"}
			{@html doc.contents}
		{:else}
			<li><a rel='prefetch' href='docs/{doc.shortName}'>{doc.name}</a></li>
		{/if}
{/each}
