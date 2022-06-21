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
	.invisible {
		height: 0;
		overflow: hidden;
	}
</style>

<svelte:head>
	<title>Documentation</title>
</svelte:head>

{#each docs as doc}
		{#if doc.shortName == "README"}
			{@html doc.contents}
		{:else}
		  <!-- Used as SvelteKit sitemap -->
			<li class="invisible"><a rel='prefetch' href='docs/{doc.shortName}'>{doc.name}</a></li>
		{/if}
{/each}
