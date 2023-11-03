<script>
  import { NavigationHelpers } from '../utilities/helpers';
  import StatusBadge from './StatusBadge.svelte';
  
  export let node;
  
  function hasOpenUIicon(node) {
    return NavigationHelpers.isOpenUIiconName(node.icon);
  }

  function getSapIconStr(iconString) {
    return NavigationHelpers.renderIconClassName(iconString);
  }

  function getNodeLabel(node) {
    return NavigationHelpers.getNodeLabel(node);
  }
  /*
  console.log("111111111111111111111111111111111111111111111");
  console.log(node);
  console.log(node.showLabel);
  console.log(node.isCat);
*/
</script>

{#if node.icon} <!--wenn es ein icon gibt-->
  {#if hasOpenUIicon(node) && node.isCat === true && node.showLabel === true}
    <span class="fd-top-nav__icon777 sap-icon {getSapIconStr(node.icon)}" />
    <!-- <span>{getNodeLabel(node)}</span> fügt label neben icon hinzu, aber auch bei nicht categories-->
  {:else if hasOpenUIicon(node)}  
    <span class="fd-top-nav__icon777 sap-icon {getSapIconStr(node.icon)}" />
  {:else}
    <img
      class="fd-top-nav__icon sap-icon"
      src={node.icon}
      alt={node.altText ? node.altText : ''}
    />
  {/if}
  <!-- end hasOpenUIicon-->
{/if}
<!-- end node.icon -->
{#if !node.icon || node.showLabel}  <!--wenn es kein icon gibt-->
  <span
    >{getNodeLabel(node)}
    <StatusBadge {node} />
  </span>
{/if}
