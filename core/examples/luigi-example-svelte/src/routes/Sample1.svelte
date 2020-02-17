<section class="fd-section">
  <div class="fd-section__header">
    <h1 class="fd-section__title">Sample 1</h1>
  </div>
  <div class="fd-panel">
    Luigi ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
  </div>
</section>
<script>
	import LuigiClient from '@kyma-project/luigi-client';

	function showAlert() {
		LuigiClient.uxManager().showAlert({text: 'Hello World!'});
	}
</script>
