<script>
  import { onMount } from 'svelte';
  import { WebComponentService } from '../services/web-components';

  export let node;

  // define get and setters 
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
    // render webcomponent based on pased node object 
    if (node.webcomponent) {
      WebComponentService.renderWebComponent(node.viewUrl, document.querySelector('.lui-tab-header'), node.context, node);
    } else { 
      console.warn('Horizontal navigation custom header microfrontend requires a webcomponent type node.')
    }
  });


</script>

{#if node}
  <div class="lui-tab-header" />
{/if}
