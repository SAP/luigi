<script>
  import MobileTopNav from './MobileTopNavDropDown.svelte';
  import { createEventDispatcher, onMount, getContext } from 'svelte';
  import { LuigiConfig, LuigiI18N } from '../core-api';
  import { Routing } from '../services/routing';
  import { StateHelpers } from '../utilities/helpers';
  import { NavigationHelpers } from '../utilities/helpers';

  const dispatch = createEventDispatcher();

  export let productSwitcherItems;
  export let isMobile;
  export let config;
  export let dropDownStates;
  let store = getContext('store');
  let getUnsavedChangesModalPromise = getContext('getUnsavedChangesModalPromise');

  onMount(async () => {
    StateHelpers.doOnStoreChange(
      store,
      async () => {
        config = NavigationHelpers.getProductSwitcherConfig();
        if (config) {
          productSwitcherItems = await LuigiConfig.getConfigValueAsync(
            'navigation.productSwitcher.items'
          );
        }
        setViewportHeightVariable();
      },
      ['navigation.productSwitcher']
    );
  });

  // [svelte-upgrade suggestion]
  // review these functions and remove unnecessary 'export' keywords
  export function onActionClick(productSwitcherItem) {
    getUnsavedChangesModalPromise().then(() => {
      Routing.navigateToLink(productSwitcherItem);
    });
    toggleDropdownState();
  }

  export function onActionClickExternal(event) {
    onActionClick(event.detail);
  }

  export function toggleDropdownState() {
    dispatch('toggleDropdownState');
  }

  export function setViewportHeightVariable() {
    // get the viewport height and multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  function hasOpenUIicon(node) {
    return NavigationHelpers.isOpenUIiconName(node.icon);
  }

  function getNodeLabel(node) {
    return LuigiI18N.getTranslation(node.label);
  }

  function getTestId(node) {
    return node.testId
      ? node.testId
      : NavigationHelpers.prepareForTests(node.label);
  }
</script>

<svelte:window on:resize="{setViewportHeightVariable}"/>
{#if productSwitcherItems && productSwitcherItems.length &&
Object.keys(productSwitcherItems[0]).length }
<!-- DESKTOP VERSION (popover): -->
{#if !isMobile}
<div class="fd-shellbar__action fd-shellbar__action--collapsible">
  <div class="fd-product-switcher">
    <div class="fd-popover fd-popover--right">
      <div class="fd-popover__control" on:click="{event => event.stopPropagation()}">
        <!-- default: sap-icon--grid -->
        {#if hasOpenUIicon(config)}
        <button
          class="fd-button--shell sap-icon--{config.icon}"
          aria-expanded="{dropDownStates.productSwitcherPopover || false}"
          aria-haspopup="true"
          on:click|stopPropagation="{toggleDropdownState}"
          title="{config.label}"
          data-testid="{getTestId(config)}"
        ></button>
        {:else}
        <button
          class="fd-button--shell"
          aria-expanded="{dropDownStates.productSwitcherPopover || false}"
          aria-haspopup="true"
          on:click|stopPropagation="{toggleDropdownState}"
          title="{config.label}"
          data-testid="{getTestId(config)}"
        >
          <img src="{config.icon}">
        </button>
        {/if}
      </div>
      <div
        class="fd-popover__body fd-popover__body--right"
        aria-hidden="{!(dropDownStates.productSwitcherPopover || false)}"
        id="productSwitcherPopover"
      >
        <div class="fd-product-switcher__body">
          <nav class="fd-menu">
            <ul class="fd-menu__list">
              {#each productSwitcherItems as productSwitcherItem}
              {#if productSwitcherItem.label}
              <li
                on:click="{() => onActionClick(productSwitcherItem)}"
                data-testid="{getTestId(productSwitcherItem)}"
              >
                <a class="fd-menu__item">
                  <span
                    class="fd-product-switcher__product-icon {productSwitcherItem.icon && hasOpenUIicon(productSwitcherItem) ? 'sap-icon--' + productSwitcherItem.icon + ' sap-icon--m' : '' }"
                  >
                    {#if !hasOpenUIicon(productSwitcherItem)}
                    <img
                      src="{productSwitcherItem.icon}"
                    >
                    {/if}
                  </span>
                  <span
                    class="fd-product-switcher__product-title"
                  >{getNodeLabel(productSwitcherItem)}</span>
                </a>
              </li>
              {/if}
              {/each}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}
<!-- MOBILE VERSION (fullscreen modal): -->
{#if isMobile && dropDownStates.productSwitcherPopover}
<MobileTopNav
  on:click="{toggleDropdownState}"
  on:listClick="{onActionClickExternal}"
  nodes="{productSwitcherItems}"
  label="{config.label}"
  {hasOpenUIicon}
  {getNodeLabel}
  {getTestId}
/>
{/if}
{/if}

<style type="text/scss">
  .fd-product-switcher {
    position: relative;
    display: block;
  }
  .fd-product-switcher__product-icon > img {
    max-height: 40px;
  }

  .fd-product-switcher__body {
    overflow: auto;
    max-height: calc(100vh - 50px);
    max-height: calc(var(--vh, 1vh) * 100 - 50px);

    .fd-menu__item {
      padding: 0;
      text-align: center;

      &:hover {
        background-color: transparent;
      }
    }
  }

  @media (min-width: 1024px) {
    .fd-product-switcher {
      &__product-icon {
        &.sap-icon--m {
          &:before {
            font-size: 38px;
          }
        }
      }
    }
  }
</style>
