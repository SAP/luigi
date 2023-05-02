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
</script>

{#if node.icon}
  {#if hasOpenUIicon(node)}
    <span class="fd-top-nav__icon sap-icon {getSapIconStr(node.icon)}" />
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
{#if !node.icon || node.showLabel}
  <span
    >{getNodeLabel(node)}
    <StatusBadge {node} />
  </span>
{/if}
