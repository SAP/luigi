<section class="fd-section">
  <div class="fd-section__header">
    <h1 class="fd-section__title">Home</h1>
  </div>
  <div class="fd-panel">
    { message }
  </div>
</section>
<script>
  import LuigiClient from '@luigi-project/client';
  import { onMount } from 'svelte';

  let message = 'The app loaded without Luigi';

  onMount(() => {
    LuigiClient.addInitListener(() => {
      message = 'Luigi Client initialized.'
    });
    LuigiClient.addContextUpdateListener(() => {
      message = 'Luigi Client updated.'
    });
  });
</script>
