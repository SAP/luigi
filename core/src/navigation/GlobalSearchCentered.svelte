<script>
  import { beforeUpdate, createEventDispatcher, onMount, getContext } from 'svelte';
  import { LuigiI18N } from '../core-api';
  import { GenericHelpers, GlobalSearchHelper } from '../utilities/helpers';
  import { Routing } from '../services/routing';
  import {
    KEYCODE_ARROW_UP,
    KEYCODE_ARROW_DOWN,
    KEYCODE_ENTER,
    KEYCODE_ESC
  } from '../utilities/keycode.js';
  import { TOP_NAV_DEFAULTS } from '../utilities/luigi-config-defaults';
  export let searchResult = [];
  export let displaySearchResult;
  export let displayCustomSearchResult;
  export let inputElem;
  export let luigiCustomSearchRenderer__slot;
  export let luigiCustomSearchItemRenderer__slotContainer;
  export let globalSearchConfig;
  const dispatch = createEventDispatcher();
  const searchApiObj = {
    fireItemSelected: item => {
      search.searchProvider.onSearchResultItemSelected(item);
    }
  };
  let cancelBtn = TOP_NAV_DEFAULTS.globalSearchCenteredCancelButton;
  export let isSearchFieldVisible;
  let search = {};
  let isCustomSearchRenderer;
  let isCustomSearchResultItemRenderer;
  let displayClearSearchFieldBtn = false;
  let getTranslation = getContext('getTranslation');

  onMount(async () => {
    search = globalSearchConfig;
    cancelBtn = search.globalSearchCenteredCancelButton
      ? search.globalSearchCenteredCancelButton
      : cancelBtn;
    let inputElement = inputElem;
    const placeHolder = getSearchPlaceholder(search.searchProvider);
    if (placeHolder) {
      inputElement.placeholder = placeHolder;
    }
    getCustomRenderer();
    GlobalSearchHelper.handleVisibilityGlobalSearch();
    const globalSearchCtn = document.querySelector('.lui-global-search');
    if (globalSearchCtn) {
      const resizeObserver = new ResizeObserver(entries => {
        GlobalSearchHelper.handleVisibilityGlobalSearch();
      });

      resizeObserver.observe(globalSearchCtn);
    }
  });

  beforeUpdate(() => {
    search = globalSearchConfig;
    getCustomRenderer();
    renderClearBtn();
  });

  function getCustomRenderer() {
    isCustomSearchRenderer = GenericHelpers.isFunction(
      search.searchProvider.customSearchResultRenderer
    );
    isCustomSearchResultItemRenderer = GenericHelpers.isFunction(
      search.searchProvider.customSearchResultItemRenderer
    );
  }

  function getSearchPlaceholder(searchProvider) {
    if (!searchProvider || !searchProvider.inputPlaceholder) {
      return undefined;
    }
    const currentLocale = LuigiI18N.getCurrentLocale();
    if (GenericHelpers.isFunction(searchProvider.inputPlaceholder)) {
      return searchProvider.inputPlaceholder();
    }
    if (typeof searchProvider.inputPlaceholder === 'string') {
      const translated = LuigiI18N.getTranslation(searchProvider.inputPlaceholder);
      if (!!translated && translated.trim().length > 0) {
        return translated;
      }
      return searchProvider.inputPlaceholder;
    }
    if (typeof searchProvider.inputPlaceholder === 'object') {
      return searchProvider.inputPlaceholder[currentLocale];
    }
  }

  function renderCustomSearchItem(item, slotContainer, index) {
    setTimeout(() => {
      search.searchProvider.customSearchResultItemRenderer(
        item,
        slotContainer.children[index],
        searchApiObj
      );
    });
    return '';
  }

  function closeSearchResult() {
    dispatch('closeSearchResult');
  }

  function onKeyUp({ keyCode }) {
    if (search) {
      if (
        GenericHelpers.isFunction(search.searchProvider.onEnter) &&
        keyCode === KEYCODE_ENTER
      ) {
        search.searchProvider.onEnter();
      } else if (
        GenericHelpers.isFunction(search.searchProvider.onEscape) &&
        keyCode === KEYCODE_ESC
      ) {
        search.searchProvider.onEscape();
      } else if (keyCode === KEYCODE_ARROW_DOWN) {
        if (displaySearchResult) {
          document
            .querySelector('.luigi-search-result-item__0')
            .childNodes[0].setAttribute('aria-selected', 'true');
          document.querySelector('.luigi-search-result-item__0').focus();
        }
      } else if (GenericHelpers.isFunction(search.searchProvider.onInput)) {
        search.searchProvider.onInput();
      }
    } else {
      console.warn('GlobalSearchCentered is not available.');
    }
  }

  function searchBtnClicked() {
    if (search && GenericHelpers.isFunction(search.searchProvider.onSearchBtnClick)) {
      search.searchProvider.onSearchBtnClick();
    }
  }

  function renderClearBtn() {
    inputElem && inputElem.value
      ? (displayClearSearchFieldBtn = true)
      : (displayClearSearchFieldBtn = false);
  }

  function clearSearchField() {
    inputElem.value = '';
    closeSearchResult();
    displayClearSearchFieldBtn = false;
  }

  function calcSearchResultItemSelected(direction) {
    let renderedSearchResultItems = luigiCustomSearchItemRenderer__slotContainer.children;
    if (renderedSearchResultItems) {
      for (let index = 0; index < renderedSearchResultItems.length; index++) {
        let { childNodes, nextSibling, previousSibling } = renderedSearchResultItems[
          index
        ];
        let nodeSibling;
        if (childNodes[0].getAttribute('aria-selected') === 'true') {
          if (direction === KEYCODE_ARROW_DOWN) {
            nodeSibling =
              nextSibling !== null ? nextSibling : renderedSearchResultItems[0];
          }
          if (direction === KEYCODE_ARROW_UP) {
            nodeSibling =
              previousSibling !== null
                ? previousSibling
                : renderedSearchResultItems[renderedSearchResultItems.length - 1];
          }
          childNodes[0].setAttribute('aria-selected', 'false');
          nodeSibling.childNodes[0].setAttribute('aria-selected', 'true');
          nodeSibling.focus();
          break;
        }
      }
    }
  }

  function clearAriaSelected() {
    let renderedSearchResultItems = luigiCustomSearchItemRenderer__slotContainer.children;
    if (renderedSearchResultItems) {
      for (let index = 0; index < renderedSearchResultItems.length; index++) {
        let element = renderedSearchResultItems[index];
        if (element.childNodes[0].getAttribute('aria-selected') === 'true') {
          element.childNodes[0].setAttribute('aria-selected', 'false');
        }
      }
    }
  }

  function onSearchResultItemSelected(searchResultItem) {
    if (
      search &&
      GenericHelpers.isFunction(search.searchProvider.onSearchResultItemSelected)
    ) {
      search.searchProvider.onSearchResultItemSelected(searchResultItem);
    } else if (
      GenericHelpers.isFunction(search.searchProvider.onEscape) &&
      event.keyCode === KEYCODE_ESC
    ) {
      search.searchProvider.onEscape();
    }
  }

  function handleKeydown(result, { keyCode }) {
    if (keyCode === KEYCODE_ENTER) {
      search.searchProvider.onSearchResultItemSelected(result);
    }
    if (keyCode === KEYCODE_ARROW_UP || keyCode === KEYCODE_ARROW_DOWN) {
      calcSearchResultItemSelected(keyCode);
    } else if (
      GenericHelpers.isFunction(search.searchProvider.onEscape) &&
      keyCode === KEYCODE_ESC
    ) {
      clearAriaSelected();
      setTimeout(() => {
        inputElem.focus();
      });
      search.searchProvider.onEscape();
    }
  }

  export function onActionClick(searchResultItem) {
    let node = searchResultItem.pathObject;
    if (node.externalLink) {
      Routing.navigateToLink(node);
    } else {
      dispatch('handleSearchNavigation', { node });
    }
  }

  function setFocusOnGlobalSearchFieldDesktop() {
    if (inputElem) {
      inputElem.focus();
    }
  }

  export function toggleSearch() {
    if (!isSearchFieldVisible)
      setTimeout(() => {
        setFocusOnGlobalSearchFieldDesktop();
      });
    else {
      displaySearchResult = false;
    }
    dispatch('toggleSearch', {
      isSearchFieldVisible,
      inputElem,
      luigiCustomSearchRenderer__slot
    });

    if (GenericHelpers.isFunction(search.searchProvider.toggleSearch)) {
      const fieldVisible =
        isSearchFieldVisible === undefined ? true : !isSearchFieldVisible;
      search.searchProvider.toggleSearch(inputElem, fieldVisible);
    }
  }
</script>

<svelte:window on:click={closeSearchResult} on:blur={closeSearchResult} />
<div
  class="fd-shellbar__action lui-global-search-input {isSearchFieldVisible
    ? 'lui-global-search-mobile--active'
    : ''}"
>
  <div class="fd-popover">
    <div
      class="fd-popover__control luigi-search"
      on:click|stopPropagation={() => {}}
      aria-hidden={!isSearchFieldVisible}
      aria-haspopup="true"
    >
      <div
        class="fd-input-group fd-shellbar__input-group luigi-search-input-ctn"
      >
        {#if search && search.disableInputHandlers}
          <input
            type="text"
            class="fd-input fd-input-group__input fd-shellbar__input-group__input luigi-search__input"
            data-testid="luigi-search-input__no-handlers"
          />
        {:else}
          <input
            type="text"
            on:keyup={event => onKeyUp(event)}
            class="fd-input
        fd-input-group__input fd-shellbar__input-group__input luigi-search__input"
            data-testid="luigi-search-input"
            bind:this={inputElem}
            on:input={() => renderClearBtn()}
          />
          <span
            class="fd-input-group__addon fd-shellbar__input-group__addon fd-input-group__addon--button lui-search-btn-ctn"
          >
            {#if displayClearSearchFieldBtn}
              <button
                aria-label="button-decline"
                class="fd-shellbar__button fd-button"
                on:click={clearSearchField}
              >
                <i class="sap-icon--decline" />
              </button>
            {/if}
            <button
              aria-label="button-search"
              class="fd-shellbar__button fd-button"
              on:click={searchBtnClicked}
            >
              <i class="sap-icon--search" />
            </button>
          </span>
        {/if}
      </div>
      {#if !isCustomSearchRenderer}
        <div
          class="fd-popover__body fd-popover__body--right luigi-search-popover__body"
          aria-hidden={!displaySearchResult}
        >
          <nav class="fd-menu">
            {#if searchResult}
              <ul
                class="fd-menu__list fd-menu__list--top"
                bind:this={luigiCustomSearchItemRenderer__slotContainer}
              >
                {#each searchResult as result, index}
                  <li
                    class="fd-menu__item luigi-search-result-item__{index}"
                    on:click={event =>
                      onSearchResultItemSelected(result, event)}
                    on:keyup={event => handleKeydown(result, event)}
                    tabindex="0"
                  >
                    {#if !isCustomSearchResultItemRenderer}
                      <a
                        class="fd-menu__link"
                        on:click|preventDefault={() => {}}
                      >
                        <div class="fd-product-switch__text">
                          <div class="fd-product-switch__title">
                            {result.label}
                          </div>
                          <div class="fd-product-switch__subtitle">
                            {result.description}
                          </div>
                        </div>
                      </a>
                    {:else}
                      {@html renderCustomSearchItem(
                        result,
                        luigiCustomSearchItemRenderer__slotContainer,
                        index
                      )}
                    {/if}
                  </li>
                {/each}
              </ul>
            {/if}
          </nav>
        </div>
      {:else}
        <div bind:this={luigiCustomSearchRenderer__slot} />
      {/if}
    </div>
  </div>
</div>
{#if !isSearchFieldVisible}
  <div class="lui-global-search-btn">
    <div on:click|stopPropagation={() => {}}>
      <button
        class="fd-button fd-shellbar__button"
        aria-haspopup="true"
        aria-expanded={!isSearchFieldVisible}
        on:click={toggleSearch}
        data-testid="luigi-search-btn-desktop"
      >
        <i class="sap-icon sap-icon--search" />
      </button>
    </div>
  </div>
{/if}
{#if isSearchFieldVisible}
  <div
    class="lui-global-search-cancel-btn {isSearchFieldVisible
      ? 'lui-global-search-cancel-btn--active'
      : ''}"
  >
    <button
      class="fd-button fd-shellbar__button"
      aria-haspopup="true"
      aria-expanded={!isSearchFieldVisible}
      on:click|stopPropagation={() => toggleSearch()}
      data-testid="luigi-search-cancel-btn"
    >
      {$getTranslation(cancelBtn)}
    </button>
  </div>
{/if}

<style type="text/scss">
  @import 'src/styles/_variables.scss';
  //remove default browser outline on focus for search results
  .luigi-search-popover__body {
    li[class*='luigi-search-result']:focus {
      outline: none;
    }
  }

  .luigi-search {
    .fd-input-group {
      isolation: isolate;
    }

    .fd-input-group,
    .fd-button,
    .luigi-search__input {
      height: 2rem;
    }

    .fd-input-group__addon,
    .luigi-search__input {
      isolation: isolate;
      z-index: -1;
    }

    .luigi-search__input {
      flex: 1;
    }

    .fd-input-group__addon {
      min-height: 2rem;
    }
  }

  .luigi-search__input:hover + .fd-input-group__addon--button {
    background-color: var(--sapShell_Hover_Background, #283848) !important;
  }

  :global(.lui-global-search) {
    order: 2;
    flex-grow: 10;
    max-width: 43rem;
    .fd-popover {
      width: 100%;
    }
  }

  @media (min-width: 1440px) {
    :global(.lui-global-search) {
      margin-left: 3rem;
      margin-right: 3rem;
    }
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    :global(.lui-global-search) {
      margin-left: 2rem;
      margin-right: 2rem;
    }
  }

  @media (min-width: 1023px) and (max-width: 600px) {
    :global(.lui-global-search) {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  :global(.lui-global-search) {
    display: flex;
    justify-content: center;
  }

  :global(.lui-global-search.lui-global-search-toggle) {
    justify-content: flex-end;
    .lui-global-search-btn {
      display: inline-block;
    }
  }

  .lui-search-btn-ctn {
    font-size: 0;
  }

  .fd-input-group__addon--button {
    display: inline-block;
  }

  div.luigi-search-input-ctn:focus-within {
    -webkit-box-shadow: none;
    box-shadow: none;
    outline-offset: -0.1875rem;
    outline-width: 0.0625rem;
    outline-width: var(--sapContent_FocusWidth, 0.0625rem);
    outline-color: #fff;
    outline-color: var(--sapContent_ContrastFocusColor, #fff);
    outline-style: dotted;
    outline-style: var(--sapContent_FocusStyle, dotted);
  }

  :global(.lui-global-search.lui-global-search-toggle) {
    .lui-global-search-input {
      display: none;
    }
    .lui-global-search-input.lui-global-search-mobile--active {
      position: absolute;
      display: block;
      background-color: var(--sapShellColor, #354a5f);
      width: calc(100% - 90px);
      left: 0;
      top: 0;
      z-index: 2;
      padding-left: 1rem;
      .fd-shellbar__input-group {
        margin-top: 6px;
      }
    }

    .lui-global-search-cancel-btn.lui-global-search-cancel-btn--active {
      text-align: center;
      position: absolute;
      right: 0;
      display: block;
      display: inline-block;
      background-color: var(--sapShellColor, #354a5f);
      top: 0;
      z-index: 2;
      width: 90px;
      .fd-shellbar__button {
        margin-top: 4px;
      }
    }
    .lui-global-search-btn {
      right: 0;
    }
  }

  .lui-global-search-cancel-btn {
    display: none;
  }

  .lui-global-search-btn {
    display: none;
  }

  .lui-global-search-input {
    flex: 0 0 100%;
  }

  :global(.fd-shellbar__group) {
    flex-grow: 1;
  }

  @media (max-width: 599px) {
    :global(.fd-shellbar__logo) {
      display: none;
    }
  }
</style>
