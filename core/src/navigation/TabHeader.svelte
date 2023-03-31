<script>
  import { onMount } from 'svelte';
  
  import { WebComponentService } from '../services/web-components';

  export let node;


  const __this = {
    get: () => ({
      node
    }),
    set: obj => {
      if (obj) {
        Object.getOwnPropertyNames(obj).forEach(prop => {
          if (prop === 'node') {
            node = obj.node;
          }
        });        
      }
    }
  };

  onMount(() => {
    console.log(node);
    setTimeout(() => {
      WebComponentService.renderWebComponent(node.viewUrl, document.querySelector('.lui-tab-header'), node.context, node);
    });
  });


</script>

{#if node}
  <div class="lui-tab-header"></div>
{/if}
