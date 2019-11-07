<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`docs.json`).then(r => r.json()).then(doc => {
			return { doc };
		});
	}
	
</script>

<script>
	export let doc;
</script>

<style>
	
</style>

<svelte:head>
	<title>Documentation</title>
</svelte:head>

{@html doc.contents}
