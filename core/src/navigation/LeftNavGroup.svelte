<script>
  export let navGroup;
  export let expanded = true;

  function toggleExpanded() {
    expanded = !expanded;
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
      <a
        class="fd-navigation__link"
        role="button"
        tabindex="-1"
        on:click|preventDefault|stopPropagation={toggleExpanded}
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
    >
      <slot />
    </ul>
  </li>
{/if}

<style lang="scss">
  .fd-navigation__link {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
