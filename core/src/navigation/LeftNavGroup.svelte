<script>
  import { NavigationHelpers } from '../utilities/helpers';

  export let navGroup;
  export let expanded = true;

  function toggleExpanded() {
    expanded = !expanded;
    NavigationHelpers.storeExpandedState(navGroup.uid, expanded);
    if (!navGroup.isSingleEntry) {
      NavigationHelpers.storeCollapsedSuperCategoriesState(navGroup.uid, expanded);
    }
  }
</script>

{#if navGroup.isSingleEntry}
  <slot />
{:else}
  <li class="fd-navigation__list-item" aria-hidden="true">
    <div
      class="fd-navigation__item fd-navigation__item--group"
      aria-level="1"
      role="treeitem"
      title="{navGroup.title} Group"
      aria-roledescription="Navigation List Tree Item - Group"
      aria-selected="false"
      aria-expanded={expanded}
    >
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        class="fd-navigation__link"
        role="button"
        tabindex="0"
        on:click|preventDefault|stopPropagation={toggleExpanded}
        on:keyup={(event) => {
          (event.code === 'Enter' || event.code === 'Space') && toggleExpanded();
        }}
      >
        <span class="fd-navigation__text">{navGroup.title}</span>
        <span
          class="fd-navigation__has-children-indicator"
          role="presentation"
          aria-hidden="true"
          aria-label="has children indicator, expanded"
        />
      </a>
    </div>

    <ul
      class="fd-navigation__list fd-navigation__list--parent-items"
      role="tree"
      aria-roledescription="Navigation List Tree - Parent Items"
      tabindex="-1"
      navGroupId={navGroup.uid}
    >
      <slot />
      <li class="fd-navigation__list-item fd-navigation__list-item--separator" role="presentation" aria-hidden="true" />
    </ul>
  </li>
{/if}

<style lang="scss">
  .fd-navigation__link {
    -webkit-user-select: none;
    user-select: none;
  }

  :global(.fd-navigation--snapped) .fd-navigation__list--parent-items {
    --fdNavigation_List_Parent_Items_Display: flex;
  }
</style>
