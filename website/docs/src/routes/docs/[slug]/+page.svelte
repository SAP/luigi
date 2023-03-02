<script context="module">

	
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
		  <!-- Used as sapper sitemap -->
			<li class="invisible"><a rel='prefetch' href='docs/{doc.shortName}'>{doc.name}</a></li>
		{/if}
{/each}
