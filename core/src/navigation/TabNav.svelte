<script>
  import {
    afterUpdate,
    beforeUpdate,
    createEventDispatcher,
    getContext,
    onDestroy,
    onMount,
  } from 'svelte';
  import { LuigiConfig } from '../core-api';
  import {
    NavigationHelpers,
    RoutingHelpers,
    StateHelpers,
  } from '../utilities/helpers';
  import StatusBadge from './StatusBadge.svelte';
  import { Navigation } from './services/navigation';

  import TabHeader from './TabHeader.svelte';

  export let children;
  export let pathData;
  export let pathParams;
  let previousPathData;
  export let hideNavComponent;
  export let virtualGroupPrefix = NavigationHelpers.virtualGroupPrefix;
  let selectedNode;
  export let selectedNodeForTabNav;
  export let dropDownStates = {};
  export let isMoreBtnExpanded = false;
  export let resizeTabNavToggle;
  let previousResizeTabNavToggle;
  let getTranslation = getContext('getTranslation');
  let store = getContext('store');
  let resizeObserver;
  let tabsContainer;
  let tabsContainerHeader;
  let moreButton;
  let moreLink;

  //TODO refactor
  const __this = {
    get: () => ({
      children,
      pathData,
      hideNavComponent,
      virtualGroupPrefix,
      selectedNode,
      selectedNodeForTabNav,
      dropDownStates,
      isMoreBtnExpanded,
    }),
    set: (obj) => {
      if (obj) {
        Object.getOwnPropertyNames(obj).forEach((prop) => {
          if (prop === 'pathData') {
            pathData = obj.pathData;
          } else if (prop === 'context') {
            context = obj.context;
          } else if (prop === 'children') {
            children = obj.children;
          } else if (prop === 'selectedNode') {
            selectedNode = obj.selectedNode;
          } else if (prop === 'selectedNodeForTabNav') {
            selectedNodeForTabNav = obj.selectedNodeForTabNav;
          }
        });
      }
    },
  };

  const dispatch = createEventDispatcher();

  function getNodeLabel(node) {
    return NavigationHelpers.getNodeLabel(node);
  }

  const setTabNavData = async () => {
    const componentData = __this.get();
    const tabNavData = await Navigation.getTabNavData(
      { ...componentData },
      componentData,
    );
    if (!tabNavData) {
      return;
    }
    __this.set({ ...tabNavData });
    previousPathData = pathData;
    window['LEFTNAVDATA'] = tabNavData.groupedChildren;
    setTimeout(calcTabsContainer);
  };

  const calcTabsContainer = () => {
    clearTapNav();

    if (tabsContainerHeader && moreButton && moreLink) {
      moreLink.classList.remove('is-active');
      let tabsContainerHeaderStyles =
        tabsContainerHeader.currentStyle ||
        window.getComputedStyle(tabsContainerHeader);
      let availableSpaceForTabItems =
        tabsContainerHeader.offsetWidth -
        moreButton.offsetWidth -
        parseFloat(tabsContainerHeaderStyles.paddingLeft) -
        parseFloat(tabsContainerHeaderStyles.paddingRight);
      let totalTabsSize = 0;
      let hasMoreBtnElements = false;
      let style;
      let margin;

      [...tabsContainerHeader.children].forEach((tabElement) => {
        let uid = tabElement.getAttribute('uid');

        if (!uid) {
          return;
        }

        style = tabElement.currentStyle || window.getComputedStyle(tabElement);
        margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        totalTabsSize += tabElement.offsetWidth + margin;
        if (totalTabsSize >= availableSpaceForTabItems) {
          tabElement.classList.add('hide_element');
          if (tabElement.getAttribute('isSelected') === 'true') {
            moreLink.classList.add('is-active');
          }
          document
            .querySelector('li[uid="' + uid + '"]')
            .classList.remove('hide_element');
          hasMoreBtnElements = true;
        } else {
          document
            .querySelector('li[uid="' + uid + '"]')
            .classList.add('hide_element');
        }
      });
      hasMoreBtnElements
        ? moreButton.classList.remove('hide_element')
        : moreButton.classList.add('hide_element');
    }
  };

  const clearTapNav = () => {
    if (tabsContainerHeader !== undefined) {
      const tabs = [...tabsContainerHeader.children];
      tabs.forEach((element) => {
        element.classList.remove('hide_element');
      });
    }
  };

  /**
   * This function attaches on Svelte's ResizeObserver to detect the height of the component so that the 'top' distance property
   * is changed according to the variable horizontal tabnav web component height.
   */
  const handleHorizontalNavHeightChange = () => {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        document.documentElement.style.setProperty(
          '--luigi__horizontal-nav--live-height',
          entry.contentRect.height + 'px',
        );
      }
    });
    setTimeout(() => {
      if (tabsContainer) {
        resizeObserver.observe(tabsContainer);
      }
    });
  };

  /**
   * This function resets ResizeObserver's affected property to 0 and it is used to reset the state upon destroying of the TabNav component.
   */
  const resetResizeObserver = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  };

  onMount(() => {
    hideNavComponent = LuigiConfig.getConfigBooleanValue(
      'settings.hideNavigation',
    );
    handleHorizontalNavHeightChange();
    StateHelpers.doOnStoreChange(
      store,
      () => {
        setTabNavData();
      },
      ['navigation.viewgroupdata'],
    );
  });

  onDestroy(() => {
    resetResizeObserver();
    document.documentElement.style.removeProperty(
      '--luigi__horizontal-nav--live-height',
    );
  });

  // [svelte-upgrade warning]
  // beforeUpdate and afterUpdate handlers behave
  // differently to their v2 counterparts
  beforeUpdate(() => {
    if (!previousPathData || previousPathData != pathData) {
      setTabNavData();
    }
    if (
      previousResizeTabNavToggle === undefined ||
      previousResizeTabNavToggle !== resizeTabNavToggle
    ) {
      previousResizeTabNavToggle = resizeTabNavToggle;
      setTabNavData();
    }
  });

  afterUpdate(() => {
    resetResizeObserver();
    if (!resizeObserver) {
      handleHorizontalNavHeightChange();
    } else {
      setTimeout(() => {
        if (tabsContainer) {
          resizeObserver.observe(tabsContainer);
        }
      });
    }
  });

  function isOpenUIiconName(name) {
    return NavigationHelpers.isOpenUIiconName(name);
  }

  function isExpanded(nodes, expandedList) {
    return (
      expandedList && expandedList.indexOf(nodes.metaInfo.categoryUid) >= 0
    );
  }

  function isSelectedCat(key, selectedNodeForTabNav) {
    return (
      selectedNodeForTabNav &&
      selectedNodeForTabNav.category &&
      (selectedNodeForTabNav.category === key ||
        selectedNodeForTabNav.category.label === key)
    );
  }

  function getRouteLink(node) {
    return RoutingHelpers.getNodeHref(node, pathParams);
  }

  // [svelte-upgrade suggestion]
  // review these functions and remove unnecessary 'export' keywords
  export function handleClick(node) {
    closeAllDropdowns();
    dispatch('handleClick', { node });
  }

  export function toggleDropdownState(name) {
    let ddnStates = {};
    if (!dropDownStates[name]) {
      ddnStates[name] = true;
    }
    dropDownStates = ddnStates;
  }

  export function closeAllDropdowns() {
    dropDownStates = {};
    isMoreBtnExpanded = false;
  }

  export function onResize() {
    clearTapNav();
    calcTabsContainer();
  }
  export function toggleMoreBtn() {
    isMoreBtnExpanded = !isMoreBtnExpanded;
  }

  function isSingleTabItem(key) {
    return key === 'undefined' || key.indexOf(virtualGroupPrefix) === 0;
  }

  function isTabItemWithSubItems(nodes) {
    return nodes.some((node) => !node.hideFromNav && node.label);
  }

  function getNodeToNavigateTo(nodes) {
    return nodes.find((node) => node.category.navigateOnClick);
  }

  function tabItemNameCanNavigate(nodes) {
    return !!getNodeToNavigateTo(nodes);
  }
</script>

<svelte:window
  on:click={closeAllDropdowns}
  on:blur={closeAllDropdowns}
  on:resize={onResize}
/>
{#if children && pathData.length > 0 && (pathData[0].topNav === false || pathData.length > 1)}
  <div id="tabsContainer" bind:this={tabsContainer}>
    {#if selectedNode.parent && selectedNode.parent.tabNav && selectedNode.parent.tabNav.showAsTabHeader}
      <TabHeader node={selectedNode.parent} />
    {/if}
    <nav
      class="fd-icon-tab-bar fd-icon-tab-bar--lg"
      role="tablist"
      on:toggleDropdownState={(event) => toggleDropdownState(event.name)}
    >
      <div
        class="tabsContainerHeader luigi-tabsContainerHeader fd-icon-tab-bar__header"
        role="tablist"
        bind:this={tabsContainerHeader}
      >
        {#each Object.entries(children) as [key, nodes], index}
          {#if isSingleTabItem(key)}
            {#each nodes as node, index2}
              {#if !node.hideFromNav}
                {#if node.label}
                  {@const isSelected = node === selectedNodeForTabNav}
                  <span
                    role="presentation"
                    class="fd-icon-tab-bar__item"
                    uid="{index}-{index2}"
                    {isSelected}
                  >
                    <a
                      role="tab"
                      class="fd-icon-tab-bar__tab"
                      href={getRouteLink(node)}
                      data-testid={NavigationHelpers.getTestId(node)}
                      aria-selected={isSelected}
                      on:click|preventDefault={() => handleClick(node)}
                    >
                      <span class="fd-icon-tab-bar__tag"
                        >{getNodeLabel(node)}
                        <StatusBadge {node} /></span
                      >
                    </a>
                  </span>
                {/if}
              {/if}
            {/each}
          {:else if isTabItemWithSubItems(nodes)}
            {#if tabItemNameCanNavigate(nodes)}
              <span
                uid="{index}-0"
                role="presentation"
                class="fd-icon-tab-bar__item fd-icon-tab-bar__item--multi-click"
              >
                <!-- svelte-ignore a11y-missing-attribute -->
                <a role="tab" class="fd-icon-tab-bar__tab" tabindex="0">
                  <span class="fd-icon-tab-bar__tag"
                    >{$getTranslation(key)}</span
                  >
                </a>
                <div class="fd-popover fd-icon-tab-bar__popover">
                  <div class="fd-popover__control">
                    <div class="fd-icon-tab-bar__button-container">
                      <button
                        class="fd-button fd-button--transparent fd-icon-tab-bar__button"
                        aria-controls="TODO"
                        aria-expanded="true"
                        aria-haspopup="true"
                        aria-label="open menu button"
                        onclick="TODO"
                      >
                        <i class="sap-icon--slim-arrow-down"></i>
                      </button>
                    </div>
                  </div>
                  <div
                    class="fd-popover__body fd-popover__body--no-arrow fd-popover__body--right fd-icon-tab-bar__popover-body"
                    aria-hidden="false"
                    id="TODO"
                  >
                    <ul
                      class="fd-list fd-list--navigation fd-list--no-border fd-icon-tab-bar__list"
                    >
                      {#each nodes as node}
                        {#if !node.hideFromNav}
                          {#if node.label}
                            <li
                              tabindex="-1"
                              aria-level="1"
                              class="fd-list__item fd-list__item--link fd-icon-tab-bar__list-item"
                            >
                              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                              <!-- svelte-ignore a11y-missing-attribute -->
                              <a
                                tabindex="0"
                                class="fd-list__link fd-icon-tab-bar__list-link"
                              >
                                <span class="fd-list__title"
                                  >{getNodeLabel(node)}</span
                                >
                              </a>
                            </li>
                          {/if}
                        {/if}
                      {/each}
                    </ul>
                  </div>
                </div>
              </span>
            {:else}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span
                class="fd-icon-tab-bar__item fd-icon-tab-bar__item--single-click"
                uid="{index}-0"
                on:click={(event) => event.stopPropagation()}
                isSelected={isSelectedCat(key, selectedNodeForTabNav)}
              >
                <div class="fd-popover">
                  <div class="fd-popover__control">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <a
                      class="fd-icon-tab-bar__tab"
                      aria-expanded="false"
                      role="tab"
                      on:click|preventDefault={() => toggleDropdownState(key)}
                      aria-selected={isSelectedCat(key, selectedNodeForTabNav)}
                    >
                      <div class="fd-icon-tab-bar__tab-container">
                        <span class="fd-icon-tab-bar__tag"
                          >{$getTranslation(key)}</span
                        >
                        <span class="fd-icon-tab-bar__arrow">
                          <i
                            class="sap-icon--slim-arrow-down"
                            role="presentation"
                          ></i>
                        </span>
                      </div>
                    </a>
                  </div>
                  <div
                    class="fd-popover__body fd-popover__body--no-arrow fd-popover__body--right fd-icon-tab-bar__popover-body"
                    aria-hidden={!dropDownStates[key]}
                  >
                    <ul
                      class="fd-list fd-list--navigation fd-list--no-border fd-icon-tab-bar__list"
                    >
                      {#each nodes as node}
                        {#if !node.hideFromNav}
                          {#if node.label}
                            <li
                              class="fd-list__item fd-list__item--link fd-icon-tab-bar__list-item"
                            >
                              <a
                                href={getRouteLink(node)}
                                class="fd-list__link fd-icon-tab-bar__list-link"
                                data-testid={NavigationHelpers.getTestId(node)}
                                on:click|preventDefault={() =>
                                  handleClick(node)}
                                aria-selected={node === selectedNodeForTabNav}
                              >
                                <span class="fd-list__title"
                                  >{getNodeLabel(node)}
                                  <StatusBadge {node} /></span
                                >
                              </a>
                            </li>
                          {/if}
                        {/if}
                      {/each}
                    </ul>
                  </div>
                </div>
              </span>
            {/if}
          {/if}
        {/each}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class="luigi-tabsMoreButton fd-icon-tab-bar__item fd-icon-tab-bar__item--overflow"
          on:click={(event) => event.stopPropagation()}
          bind:this={moreButton}
        >
          <div class="fd-popover">
            <!-- svelte-ignore a11y-missing-attribute -->
            <div
              class="fd-popover__control has-child luigi__more"
              aria-expanded="false"
              role="tab"
            >
              <button class="fd-icon-tab-bar__overflow" on:click|preventDefault={toggleMoreBtn} bind:this={moreLink}>
                <span class="label fd-icon-tab-bar__overflow-text">More</span>
                <span class="sap-icon--slim-arrow-down" />
              </button>
            </div>
            <div
              class="fd-popover__body fd-popover__body--no-arrow fd-popover__body--right fd-icon-tab-bar__popover-body"
              aria-hidden={!isMoreBtnExpanded}
            >
              <ul
                class="fd-nested-list fd-nested-list--compact fd-nested-list--text-only"
              >
                {#each Object.entries(children) as [key, nodes], index}
                  {#if key === 'undefined' || key.indexOf(virtualGroupPrefix) === 0}
                    {#each nodes as node, index2}
                      <li class="fd-nested-list__item" uid="{index}-{index2}">
                        <a
                          href={getRouteLink(node)}
                          class="fd-nested-list__link"
                          data-testid={NavigationHelpers.getTestId(node)}
                          on:click|preventDefault={() => handleClick(node)}
                          aria-selected={node === selectedNodeForTabNav}
                        >
                          <span class="fd-nested-list__title"
                            >{getNodeLabel(node)}
                            <StatusBadge {node} /></span
                          >
                        </a>
                      </li>
                    {/each}
                  {:else}
                    <li class="fd-nested-list__item" uid="{index}-0">
                      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                      <div
                        class="fd-nested-list__content has-child"
                        tabindex="0"
                      >
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a
                          href="javascript:void(null)"
                          tabindex="-1"
                          class="fd-nested-list__link"
                          id="tabnav_list_level1_{index}"
                          aria-haspopup="true"
                          aria-expanded={dropDownStates[key + index]}
                          aria-selected={isSelectedCat(
                            key,
                            selectedNodeForTabNav,
                          )}
                          on:click|preventDefault={() =>
                            toggleDropdownState(key + index)}
                        >
                          <span class="fd-nested-list__title"
                            >{$getTranslation(key)}</span
                          >
                        </a>
                        <button
                          class="fd-button fd-nested-list__button"
                          href="#"
                          tabindex="-1"
                          aria-label="Expand submenu"
                          aria-haspopup="true"
                          aria-expanded={dropDownStates[key + index]}
                          on:click|preventDefault={() =>
                            toggleDropdownState(key + index)}
                        >
                          <i
                            class={dropDownStates[key + index]
                              ? 'sap-icon--navigation-down-arrow'
                              : 'sap-icon--navigation-right-arrow'}
                            role="presentation"
                          />
                        </button>
                      </div>
                      <ul
                        class="fd-nested-list level-2"
                        aria-hidden={!dropDownStates[key + index]}
                      >
                        {#each nodes as node}
                          {#if node.label}
                            <li
                              class="fd-nested-list__item"
                              aria-labelledby="tabnav_list_level1_{index}"
                            >
                              <a
                                class="fd-nested-list__link"
                                href={getRouteLink(node)}
                                data-testid={NavigationHelpers.getTestId(node)}
                                on:click|preventDefault={() =>
                                  handleClick(node)}
                                aria-selected={node === selectedNodeForTabNav}
                              >
                                <span class="fd-nested-list__title"
                                  >{getNodeLabel(node)}
                                  <StatusBadge {node} />
                                </span>
                              </a>
                            </li>
                          {/if}
                        {/each}
                      </ul>
                    </li>
                  {/if}
                {/each}
              </ul>
            </div>
          </div>
        </span>
      </div>
    </nav>
  </div>
{/if}

<style lang="scss">
  .tabsContainerHeader {
    width: 100%;
  }

  .luigi-tabsMoreButton {
    .fd-popover__body {
      > .fd-nested-list {
        max-height: calc(100vh - 110px);
        overflow-y: auto !important;
        padding-top: 4px;
        padding-bottom: 4px;

        .fd-nested-list__item {
          &:last-child {
            .fd-nested-list__content {
              border-bottom: none;
            }
          }

          :global(.hide_element) {
            display: none;
          }
        }
        .fd-nested-list__title {
          display: inline-block;
          height: auto;
        }
      }
    }

    :global(.hide_element) {
      display: none;
    }
  }

  .lui-breadcrumb .luigi-tabsContainerHeader .fd-popover__body {
    max-height: calc(
      100vh - calc(
          var(--luigi__shellbar--height) + var(--luigi__breadcrumb--height) +
            var(
              --luigi__horizontal-nav--live-height,
              var(--luigi__horizontal-nav--height)
            )
        )
    );
    overflow-y: auto;
  }

  .luigi-tabsContainerHeader .fd-popover__body {
    max-height: calc(
      100vh - calc(
          var(--luigi__shellbar--height) +
            var(
              --luigi__horizontal-nav--live-height,
              var(--luigi__horizontal-nav--height)
            )
        )
    );
    overflow-y: auto;
  }

  :global(.fd-tool-layout .lui-main-content) {
    #tabsContainer {
      left: 0;
    }
  }

  #tabsContainer {
    right: 0;
    left: var(--luigi__left-sidenav--width);
    border: none;
    position: absolute;

    @media (max-width: 599px) {
      left: 0;
    }

    :global(.hide_element) {
      display: none;
    }
  }
</style>
