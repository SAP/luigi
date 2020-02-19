<section class="fd-section">
  <div class="fd-section__header">
    <h1 class="fd-section__title">Home</h1>
  </div>
  <div class="fd-panel">
    { message }
  </div>
</section>
<script>
  import LuigiClient from '@kyma-project/luigi-client';
  import { onMount } from 'svelte';

  export let message;

  onMount(() => {
    LuigiClient.addInitListener(() => {
      message = 'Luigi Client initialized.'
    });
    LuigiClient.addContextUpdateListener(() => {
      message = 'Luigi Client updated.'
    });
  });
</script>
