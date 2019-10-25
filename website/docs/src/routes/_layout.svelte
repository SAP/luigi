<script>
	export let segment;
</script>

<style type="text/scss">
	/* main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	} */
	.fd-ui {
		.fd-page {
			// background: green;
		}
	}
</style>

<main class="fd-ui fd-ui--fundamental">
		<div class="fd-page">
		<slot></slot>
		</div>
</main>