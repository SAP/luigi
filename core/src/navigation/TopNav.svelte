<script>
  import LogoTitle from './LogoTitle.svelte';
  import { beforeUpdate, createEventDispatcher, onMount, getContext } from 'svelte';
  import { LuigiAuth, LuigiConfig, LuigiI18N } from '../core-api';
  import {
    AuthHelpers,
    NavigationHelpers,
    StateHelpers
  } from '../utilities/helpers';

  const dispatch = createEventDispatcher();

  export let authorizationEnabled;
  export let autologinEnabled;
  export let isLoggedIn = false;
  export let hideNavComponent;
  export let responsiveNavSetting;
  export let pathData;
  let previousPathData;
  export let pathParams;
  export let dropDownStates = {};
  export let children;
  export let selectedNode;
  export let visibleNodeCount;
  export let totalBadgeNode;
  export let isProductSwitcherAvailable;
  export let productSwitcherConfig;
  export let openMobileDropDown;
  export let nodeForMobile;
  export let profileItemsAvailable;
  export let userInfo = {};
  export let urlAuthError;
  let store = getContext('store');

  const setTopNavData = async () => {
    if (pathData && 0 < pathData.length) {
      const tnd = await NavigationHelpers.generateTopNavNodes(pathData);
      children = tnd.children;
      selectedNode = tnd.selectedNode;
      visibleNodeCount = tnd.visibleNodeCount;
      totalBadgeNode = tnd.totalBadgeNode;
      window.TOPNAVDATA = tnd.children;
      previousPathData = pathData;
    }
  };

  const setLoggedInState = () => {
      isLoggedIn = AuthHelpers.isLoggedIn();
  };

  onMount(() => {
    StateHelpers.doOnStoreChange(
      store,
      () => {
        authorizationEnabled = LuigiAuth.isAuthorizationEnabled();
        profileItemsAvailable = LuigiConfig.getConfigValue('navigation.profile');
        autologinEnabled = !Boolean(LuigiConfig.getConfigValue('auth.disableAutoLogin'));
        isProductSwitcherAvailable = LuigiConfig.getConfigValue('navigation.productSwitcher');
        hideNavComponent = LuigiConfig.getConfigBooleanValue('settings.hideNavigation');
        responsiveNavSetting = LuigiConfig.getConfigValue('settings.responsiveNavigation');
        productSwitcherConfig = NavigationHelpers.getProductSwitcherConfig();
      },
      ['navigation']
    );
    urlAuthError = AuthHelpers.parseUrlAuthErrors();

    window.addEventListener('message', e => {
      if ('luigi.navigation.update-badge-counters' === e.data.msg) {
        setTopNavData();
      }
    });
  });

  // [svelte-upgrade warning]
  // beforeUpdate and afterUpdate handlers behave
  // differently to their v2 counterparts
  beforeUpdate(() => {
    if (!previousPathData || previousPathData != pathData) {
      setTopNavData();
    }
    setLoggedInState();
  });

  export let showTopNav;
  $: showTopNav = (authorizationEnabled && (!autologinEnabled || isLoggedIn)) ||
        !authorizationEnabled;

  function hasOpenUIicon(node) {
    return NavigationHelpers.isOpenUIiconName(node.icon);
  }

  function getNodeLabel(node) {
    return LuigiI18N.getTranslation(node.label);
  }

  function getTestId(node) {
    return node.testId
      ? node.testId
      : NavigationHelpers.prepareForTests(node.pathSegment, node.label);
  }

  export function openMobileProductSwitcher() {
    toggleDropdownState('productSwitcherPopover');
  }

  export function openMobileTopNavDropDown(node) {
    openMobileDropDown = true;
    nodeForMobile = node;
  }

  export function closeMobileTopNavDropDown() {
    openMobileDropDown = false;
  }

  export function handleClick(node) {
    dispatch('handleClick', { node });
  }

  export function toggleDropdownState(event) {
    const name = event.detail.name;
    const ddStates = dropDownStates || {};
    const dropDownState = !ddStates[name];

    closeAllDropdowns();
    closeMobileTopNavDropDown();

    ddStates[name] = dropDownState;

    dropDownStates = ddStates;
  }

  export function closeAllDropdowns() {
    const ddStates = dropDownStates || {};
    const keys = Object.keys(ddStates);
    if (keys && keys.length > 0) {
      keys.forEach(k => {
        ddStates[k] = false;
        dropDownStates = ddStates;
      });
    }
  }

  export function burgerClicked() {
    document.body.classList.toggle('lui-leftNavToggle');
  }

  export function userInfoUpdate(uInfo) {
    userInfo = uInfo ? uInfo : {};
  }
</script>

<svelte:window on:click="{closeAllDropdowns}" on:blur="{closeAllDropdowns}"/>
{#if showTopNav}
<div class="fd-shellbar {hideNavComponent ? 'hideNavComponent' : ''}">
  <div class="fd-shellbar__group fd-shellbar__group--start">
    {#if responsiveNavSetting==="simple" || responsiveNavSetting==="simpleMobileOnly"}
    <span
      class="sap-icon--menu2 lui-burger"
      on:click="{burgerClicked}"
    ></span>
    {/if}
    <LogoTitle
      pathData="{pathData}"
      pathParams="{pathParams}"
      bind:dropDownStates
      on:toggleDropdownState="{toggleDropdownState}"
      on:handleClick="{handleClick}"
    />
  </div>
  <div class="fd-shellbar__group fd-shellbar__group--end">
    <div class="fd-shellbar__actions">

      {#if children && pathData.length > 0}
      {#each children as node, i}
      {#if !node.hideFromNav}
      {#if node.isCat}
      <div
        class="fd-shellbar__action fd-shellbar__action--hide fd-shellbar__action--collapsible"
      >
        <div class="fd-popover fd-popover--right">
          <div class="fd-popover__control" on:click="{event => event.stopPropagation()}">
            <button
              title="{getNodeLabel(node)}"
              class="fd-button--shell {node === selectedNode ? 'is-selected' : ''}"
              aria-controls="dropDownPopover-{i}"
              aria-expanded="{dropDownStates[`dropDownPopover-${i}`] || false}"
              aria-haspopup="true"
              on:click="{() => toggleDropdownState(`dropDownPopover-${i}`)}"
              data-testid="{getTestId(node)}"
            >
              {#if node.icon}
              {#if hasOpenUIicon(node)}
              <span
                class="fd-top-nav__icon sap-icon--{node.icon} sap-icon--m"
              ></span>
              {:else}
              <img
                class="fd-top-nav__icon nav-icon"
                src="{node.icon}"
              >
              {/if}
              <!-- end hasOpenUIicon-->
              {:else}
              <span>{getNodeLabel(node)}</span>
              {/if}
              <!-- end node.icon -->

            </button>
          </div>
          <div
            class="fd-popover__body fd-popover__body--right"
            aria-hidden="{!(dropDownStates[`dropDownPopover-${i}`] || false)}"
            id="dropDownPopover-{i}"
          >

          </div>
        </div>
      </div>
      {:else}
      <div
        class="fd-shellbar__action fd-shellbar__action--hide fd-shellbar__action--collapsible"
      >
        <button
          title="{getNodeLabel(node)}"
          class="fd-button--shell {node === selectedNode ? 'is-selected' : ''}"
          aria-controls="0AcWE812"
          aria-expanded="false"
          aria-haspopup="true"
          on:click="{() => handleClick(node)}"
          data-testid="{getTestId(node)}"
        >
          {#if node.icon}
          {#if hasOpenUIicon(node)}
          <span
            class="fd-top-nav__icon sap-icon--{node.icon} sap-icon--m"
          ></span>
          {:else}
          <img
            class="fd-top-nav__icon nav-icon"
            src="{node.icon}"
          >
          {/if}
          <!-- end hasOpenUIicon-->
          {:else}
          <span>{getNodeLabel(node)}</span>
          {/if}
          <!-- end node.icon -->

        </button>
      </div>
      {/if}
      {/if}
      {/each}
      <!-- Sample Markup for Notifications
              <div class="fd-shellbar__action fd-shellbar__action--collapsible">
                <button class=" fd-button--shell sap-icon--bell" aria-label="Notifications">
                  <span class="fd-counter fd-counter--notification" aria-label="Unread count">25</span>
                </button>
              </div>
      -->

      <!-- dropdown for top nav nodes on smaller screens -->
      {#if visibleNodeCount > 0}
      <div class="fd-shellbar__action fd-shellbar__action--collapse">
        <div class="fd-shellbar-collapse">
          <div class="fd-popover fd-popover--right">
            <div class="fd-popover__control" on:click="{event => event.stopPropagation()}">
              <div
                class="fd-shellbar-collapse--control"
                aria-controls="eYVEJ960"
                aria-expanded="false"
                aria-haspopup="true"
                role="button"
              >
                <button
                  class="fd-button--shell sap-icon--overflow"
                  aria-controls="overflowPopover"
                  aria-expanded="{dropDownStates.overflowPopover || false}"
                  aria-haspopup="true"
                  on:click="{() => toggleDropdownState('overflowPopover')}"
                  data-testid="mobile-menu"
                >

                </button>
              </div>
            </div>
            <div
              class="fd-popover__body fd-popover__body--right"
              aria-hidden="{!(dropDownStates.overflowPopover || false)}"
              id="overflowPopover"
            >
              <nav class="fd-menu">
                <ul class="fd-menu__list">
                  {#each children as node,i}
                  {#if !node.hideFromNav}
                  {#if !node.isCat}
                  <li>
                    <a
                      class="fd-menu__item {node === selectedNode ? 'is-selected' : ''}"
                      on:click="{() => handleClick(node)}"
                      data-testid="{getTestId(node)}"
                    >
                      <span
                        class="fd-top-nav__icon {node.icon && hasOpenUIicon(node) ? 'sap-icon--' + node.icon + ' sap-icon--m' : '' }"
                      >
                        {#if !hasOpenUIicon(node)}
                        <img src="{node.icon}">
                        {/if}

                      </span>
                      <span>{getNodeLabel(node)}</span>
                    </a>
                  </li>
                  {:else}
                  <li>
                    <a
                      title="{getNodeLabel(node)}"
                      class="fd-menu__item"
                      on:click="{() => openMobileTopNavDropDown(node)}"
                      data-e2e="mobile-topnav-dropdown-category"
                    >
                      <span
                        class="fd-top-nav__icon {node.icon && hasOpenUIicon(node) ? 'sap-icon--' + node.icon + ' sap-icon--m' : '' }"
                      >
                        {#if !hasOpenUIicon(node)}
                        <img src="{node.icon}">
                        {/if}

                      </span>
                      <span>{getNodeLabel(node)}</span>
                    </a>
                  </li>
                  <!-- {:else}
                  <li>
                    <a
                      title="{getNodeLabel(node)}"
                      class="fd-menu__item"
                      on:click="openMobileTopNavDropDown(node)"
                      data-testid="mobile-topnav-dropdown-category"
                    >
                      {#if node.icon} {#if hasOpenUIicon(node)}
                      <span
                        class="fd-top-nav__icon sap-icon--{node.icon} sap-icon--m"
                      ></span>
                      {:else}
                      <img
                        class="fd-top-nav__icon nav-icon"
                        src="{node.icon}"
                      >
                      {/if} {/if}
                      <span>{getNodeLabel(node)}</span>
                    </a>
                  </li>-->
                  <!-- {/if} -->
                  {/if}
                  {/if}
                  {/each}
                  {#if isProductSwitcherAvailable}
                  <li>
                    <a
                      class="fd-menu__item"
                      on:click|stopPropagation="{openMobileProductSwitcher}"
                      data-testid="mobile-product-switcher"
                    >
                      {#if hasOpenUIicon(productSwitcherConfig) || !productSwitcherConfig.icon}
                      <span
                        class="fd-top-nav__icon sap-icon--{productSwitcherConfig.icon || 'grid'} sap-icon--m"
                      ></span>
                      {:else}
                      <img
                        class="fd-top-nav__icon nav-icon"
                        src="{productSwitcherConfig.icon}"
                      >
                      {/if}
                      {productSwitcherConfig.label}
                    </a>
                  </li>
                  {/if}
                </ul>
              </nav>
            </div>

          </div>
        </div>
      </div>
      {/if}
      {/if}
      <!-- closes {#if children && pathData.length > 0} -->
      {#if authorizationEnabled || profileItemsAvailable}
      <div
        class="fd-shellbar__action fd-shellbar__action--show-always"
        data-testid="luigi-topnav-profile"
      >
        <div class="fd-user-menu">
          <div class="fd-popover">
            <div class="fd-popover__control" on:click="{event => event.stopPropagation()}">
              <div class="{userInfo.picture ? 'fd-user-menu__control' : '' }">
                <button
                  class="fd-button--shell {!userInfo.picture?'sap-icon--customer':'fd-identifier fd-identifier--xs fd-identifier--circle'}"
                  style="{userInfo.picture?`background-image: url('${userInfo.picture}');background-size:30px;background-repeat: no-repeat;background-position: center;`:''}"
                  aria-expanded="{dropDownStates.profilePopover || false}"
                  aria-haspopup="true"
                  on:click="{() => toggleDropdownState('profilePopover')}"
                ></button>
              </div>
              <div
                class="fd-popover__body fd-popover__body--right"
                aria-hidden="{!(dropDownStates.profilePopover || false)}"
                id="profilePopover"
              >

              </div>
            </div>
          </div>
        </div>
      </div>
      {/if}

    </div>
  </div>
</div>
{:else}

{/if}

<style type="text/scss">
  // Change display type to avoid line-breaks if screen is too narrow
  .fd-shellbar__actions {
    display: flex;
    justify-content: flex-end;
  }

  // Fix for Fiori aligning everything to right inside shellbar end
  .fd-shellbar__group--end {
    text-align: unset;
  }

  .fd-side-nav__icon {
    padding-right: 0;
  }
  .hideNavComponent {
    display: none;
  }

  .nav-icon {
    height: 100%;
  }

  .fd-top-nav__icon {
    img {
      width: 16px;
      vertical-align: top;
    }
  }

  .fd-popover {
    .nav-icon {
      height: 2em;
    }
  }

  .lui-burger {
    margin-left: 8px;
    margin-right: 16px;
    cursor: pointer;
  }

  @media (min-width: 600px) {
    .lui-burger {
      margin-left: 0px;
    }
  }

  @media (min-width: 600px) {
    :global(.lui-mobileOnly) .lui-burger {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    .lui-burger {
      margin-left: -16px;
    }
  }

  :global(.no-side-nav) {
    .lui-burger {
      display: none;
    }
  }

  .fd-top-nav__icon {
    display: inline-block;
    vertical-align: middle;
    min-width: 16px;
  }

  .fd-popover__body {
    &.fd-popover__body--right {
      &:before,
      &:after {
        right: 14px;
      }
    }
  }
</style>
