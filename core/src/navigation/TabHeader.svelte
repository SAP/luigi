<script>
  import { onMount } from 'svelte';
  import { WebComponentService } from '../services/web-components';
  import { RoutingHelpers } from '../utilities/helpers';
  import { Navigation } from './services/navigation';
  import { Routing } from '../services';

  export let node;


  async function getCurrentContext() {
    const route = RoutingHelpers.mapPathToNode(Routing.getCurrentPath(), node);
    const data = await Navigation.extractDataFromPath(route);
    return data?.pathData?.context || node.context;
  }

  onMount(() => {
    
    document.querySelector('.lui-tab-header').innerHTML = '';
    setTimeout(async ()=>{
      // render webcomponent based on passed node object only if it is a webcomponent and showAsTabHeader is set to true
      if (node.webcomponent && node.tabNav.showAsTabHeader) {        
        const tabHeaderCnt = document.querySelector('.lui-tab-header');
        WebComponentService.renderWebComponent(node.viewUrl, tabHeaderCnt, { context: await getCurrentContext(), ...(node.clientPermissions && {clientPermissions: node.clientPermissions}) }, node);
        tabHeaderCnt.addEventListener('lui_ctx_update', async () => {
          const wc = document.querySelector('.lui-tab-header [lui_web_component]');
          if (wc) {
            wc.context = await getCurrentContext();
          }
        });
      } else { 
        console.warn('Horizontal navigation custom header microfrontend requires a webcomponent type node and tabNav.showAsTabHeader property set.')
      }
    });
  });


</script>

{#if node}
  <div class="lui-tab-header" />
{/if}
