<script>
  import { onMount } from 'svelte';
  import { WebComponentService } from '../services/web-components';
  import { RoutingHelpers } from '../utilities/helpers';
  import { Navigation } from './services/navigation';
  import { Routing } from '../services';

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
    
    document.querySelector('.lui-tab-header').innerHTML = '';
    setTimeout(async ()=>{
      // render webcomponent based on passed node object only if it is a webcomponent and showAsTabHeader is set to true
      if (node.webcomponent && node.tabNav.showAsTabHeader) {
        const route = RoutingHelpers.mapPathToNode(Routing.getCurrentPath(), node);
        const data = await Navigation.extractDataFromPath(route);
        WebComponentService.renderWebComponent(node.viewUrl, document.querySelector('.lui-tab-header'), data?.pathData?.context || node.context, node);
      } else { 
        console.warn('Horizontal navigation custom header microfrontend requires a webcomponent type node and tabNav.showAsTabHeader property set.')
      }
    });
  });


</script>

{#if node}
  <div class="lui-tab-header" />
{/if}
