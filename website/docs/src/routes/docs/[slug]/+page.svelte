<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

{@html data.content}

<style>
	.invisible {
		height: 0;
		overflow: hidden;
	}
</style>
