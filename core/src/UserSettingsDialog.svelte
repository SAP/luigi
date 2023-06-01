<script>
  import {
    createEventDispatcher,
    onMount,
    onDestroy,
    beforeUpdate,
    getContext
  } from 'svelte';
  import {
    NavigationHelpers,
    GenericHelpers,
    EventListenerHelpers,
    IframeHelpers,
    UserSettingsHelper
  } from './utilities/helpers';
  import { MessagesListeners } from './services/messages-listeners';
  import { ViewUrlDecorator } from './services/viewurl-decorator';
  import UserSettingsEditor from './UserSettingsEditor.svelte';
  import { CSS_BREAKPOINTS } from './utilities/constants';
  import { LuigiConfig } from './core-api';
  import { TOP_NAV_DEFAULTS } from './utilities/luigi-config-defaults';
  import { KEYCODE_ESC, KEYCODE_ENTER, KEYCODE_SPACE, KEYCODE_HOME, KEYCODE_END } from './utilities/keycode.js';
  export let schemaObj;
  export let userSettingGroups;


  const dispatch = createEventDispatcher();
  let userSettingGroup;
  export let storedUserSettings = {};
  let userSettingsGroupKey;
  let displayEditor = false;
  let previousUserSettings = {};
  let getTranslation = getContext('getTranslation');
  let dialogHeader = TOP_NAV_DEFAULTS.userSettingsDialog.dialogHeader;
  let saveBtn = TOP_NAV_DEFAULTS.userSettingsDialog.saveBtn;
  let dismissBtn = TOP_NAV_DEFAULTS.userSettingsDialog.dismissBtn;
  let customIframes = {};
  let storedUserSettingsData;
  let key;
  let userSettingsGroupTitle;
  let isComboOpen;
  let closeDropDown;

  onDestroy(() => {
    // Enable keyboard accessibility to the rest of the elements after dialog is closed
    IframeHelpers.enableA11YKeyboardBackdropExceptClassName('.lui-usersettings-dialog');
  });

  onMount(() => {
    const usLocalizationConfig = LuigiConfig.getConfigValue(
      'userSettings.userSettingsDialog'
    );
    const usLocalization = usLocalizationConfig
      ? usLocalizationConfig
      : LuigiConfig.getConfigValue('settings.userSettings.userSettingsDialog');
    if (usLocalization) {
      dialogHeader = usLocalization.dialogHeader
        ? usLocalization.dialogHeader
        : dialogHeader;
      saveBtn = usLocalization.saveBtn ? usLocalization.saveBtn : saveBtn;
      dismissBtn = usLocalization.dismissBtn ? usLocalization.dismissBtn : dismissBtn;
    }

    key =
      Object.keys(userSettingGroups[0]).length > 0
        ? Object.keys(userSettingGroups[0])[0]
        : undefined;

    EventListenerHelpers.addEventListener('message', e => {
      const iframe = IframeHelpers.getValidMessageSource(e);
      if (!iframe || 'custom' !== e.data.msg) return;
      iframe._ready = true;

      const message = MessagesListeners.convertCustomMessageInternalToUser(e.data);
      const userSettingsCMKey = 'luigi.updateUserSettings';
      if (message.id === userSettingsCMKey) {
        const iframe = UserSettingsHelper.findActiveCustomUserSettingsIframe(e.source);
        if (iframe) {
          let userSettingsGroupKey = iframe.getAttribute('userSettingsGroup');
          storedUserSettings[userSettingsGroupKey] = message.data;
        }
      }

      if (
        message.id === 'luigi.navBackMobile' &&
        window.window.innerWidth !== 0 &&
        window.innerWidth < CSS_BREAKPOINTS.desktopMinWidth
      ) {
        toggleNavMobile();
      }
    });

    LuigiConfig.readUserSettings()
      .then(storedUserSettingsData => {
        previousUserSettings = JSON.parse(JSON.stringify(storedUserSettingsData));
        if (storedUserSettingsData === null) {
          storedUserSettings = prepareUserSettingsObj(
            JSON.parse(JSON.stringify(userSettingGroups)),
            {}
          );
        } else {
          storedUserSettings = prepareUserSettingsObj(
            JSON.parse(JSON.stringify(userSettingGroups)),
            storedUserSettingsData
          );
        }
        openEditor([key, userSettingGroups[0][key]]);
      })
      .catch(error => {
        if (error && error.message) {
          console.error(error.message);
        }
        if (error && error.closeDialog) {
          dispatch('close');
        }
      });

    // disable keyboard accessibility for all elements outside the user settings dialog
    IframeHelpers.disableA11YKeyboardExceptClassName('.lui-usersettings-dialog');
  });

  function prepareUserSettingsObj(userSettingGroups, storedUserSettingsData) {
    let userSettingsObject = {};
    userSettingGroups.forEach(userSettingGroup => {
      for (let key in userSettingGroup) {
        for (let i in userSettingGroup[key].settings) {
          userSettingGroup[key].settings[i] = '';
        }
        userSettingsObject[key] = {
          ...userSettingGroup[key].settings,
          ...storedUserSettingsData[key]
        };
      }
    });
    return userSettingsObject;
  }

  function errorHandling(selectedUserSettingGroupData) {
    userSettingsGroupTitle = selectedUserSettingGroupData.title
      ? selectedUserSettingGroupData.title
      : '';
    if (!GenericHelpers.isObject(selectedUserSettingGroupData.settings)) {
      return;
    }
    for (let key in selectedUserSettingGroupData.settings) {
      let property = selectedUserSettingGroupData.settings[key];
      if (property.type === 'enum') {
        if (!Array.isArray(property.options)) {
          console.error(
            `There is no options array for '${key}' defined in the Luigi userSettings config.`
          );
        }
      } else if (property.type === undefined) {
        console.error(
          `There is no data type defined for '${key}' in the Luigi userSettings config.`
        );
      }
    }
  }

  function openEditor(selectedUserSettingGroup, event) {
    userSettingGroup = selectedUserSettingGroup;
    let selectedUserSettingGroupKey = selectedUserSettingGroup[0];
    let selectedUserSettingGroupData = selectedUserSettingGroup[1];
    errorHandling(selectedUserSettingGroupData);
    if (event) {
      document.querySelectorAll('.lui-us-list .lui-us-navlist__item').forEach(elem => {
        elem.classList.remove('is-selected');
      });
      const link = closest(event.target, '.lui-us-navlist__item', 20);
      link.classList.add('is-selected');
      if (window.innerWidth < CSS_BREAKPOINTS.desktopMinWidth) {
        closeNavOnCategoryClickMobile();
      }
    } else {
      const firstListItem = document.querySelectorAll(
        '.lui-us-list .lui-us-navlist__item'
      )[0];
      firstListItem.classList.add('is-selected');
      if (
        window.innerWidth !== 0 &&
        window.innerWidth < CSS_BREAKPOINTS.desktopMinWidth
      ) {
        handleSaveBtnVisibility();
      }
    }
    if (selectedUserSettingGroupData.viewUrl) {
      UserSettingsHelper.hideUserSettingsIframe();
      if (customIframes.hasOwnProperty(selectedUserSettingGroupKey)) {
        UserSettingsHelper.getUserSettingsIframesInDom().forEach(iframe => {
          if (iframe.userSettingsGroup === selectedUserSettingGroupKey) {
            iframe.style.display = 'block';
          }
        });
      } else {
        const viewUrl = ViewUrlDecorator.hasDecorators()
          ? ViewUrlDecorator.applyDecorators(selectedUserSettingGroupData.viewUrl)
          : selectedUserSettingGroupData.viewUrl;
        let iframe = UserSettingsHelper.createIframe(
          viewUrl,
          selectedUserSettingGroupKey
        );
        customIframes[selectedUserSettingGroupKey] = iframe;
      }

      displayCustomEditor();
    } else {
      diplayUserSettingsEditor();
    }
  }

  function displayCustomEditor() {
    document.querySelector('.iframeUserSettingsCtn').style.display = 'block';
    document.querySelector('.usersettingseditor').style.display = 'none';
  }

  function diplayUserSettingsEditor() {
    document.querySelector('.iframeUserSettingsCtn').style.display = 'none';
    document.querySelector('.usersettingseditor').style.display = 'block';
  }

  const updateSettingsObject = event => {
    storedUserSettings = event.detail.userSettings;
  };

  function storeUserSettings() {
    LuigiConfig.storeUserSettings(storedUserSettings, previousUserSettings)
      .then(() => {
        dispatch('close');
      })
      .catch(error => {
        if (error && error.message) {
          console.error(error.message);
        }
        if (error && error.closeDialog) {
          dispatch('close');
        }
      });
  }

  function closest(element, selector, max) {
    if (element && max > 0) {
      return element.matches(selector)
        ? element
        : closest(element.parentNode, selector, max - 1);
    } else {
      return undefined;
    }
  }

  function closeNavOnCategoryClickMobile() {
    toggleNavMobile();
  }

  function handleSaveBtnVisibility() {
    if (document.querySelector('.usersettings-leftNavVisible')) {
      document.querySelector('.confirm-button').style.display = 'block';
    } else {
      document.querySelector('.confirm-button').style.display = 'none';
    }
  }

  function toggleNavMobile() {
    document
      .querySelector('.lui-usersettings-dialog')
      .classList.toggle('usersettings-leftNavVisible');
    if (window.innerWidth !== 0 && window.innerWidth < CSS_BREAKPOINTS.desktopMinWidth) {
      handleSaveBtnVisibility();
    }
  }

  function getSapIconStr(iconString) {
    return NavigationHelpers.renderIconClassName(iconString);
  }

  function hasOpenUIicon(node) {
    return NavigationHelpers.isOpenUIiconName(node.icon);
  }

  let previousWindowWidth;
  const onResize = () => {
    const isMobileToDesktop =
      window.innerWidth >= CSS_BREAKPOINTS.desktopMinWidth &&
      previousWindowWidth < CSS_BREAKPOINTS.desktopMinWidth;
    const isDesktopToMobile =
      window.innerWidth < CSS_BREAKPOINTS.desktopMinWidth &&
      previousWindowWidth >= CSS_BREAKPOINTS.desktopMinWidth;
    if (isDesktopToMobile) {
      document
        .querySelector('.lui-usersettings-dialog')
        .classList.toggle('usersettings-leftNavVisible');
      if (!document.querySelector('.usersettings-leftNavVisible')) {
        document.querySelector('.confirm-button').style.display = 'none';
      } else {
        document.querySelector('.confirm-button').style.display = 'block';
      }
    }
    if (isMobileToDesktop) {
      document.querySelector('.confirm-button').style.display = 'block';
    }

    if (!previousWindowWidth) {
      let confirmbtn = document.querySelector('.confirm-button');
      window.innerWidth < CSS_BREAKPOINTS.desktopMinWidth
        ? (confirmbtn.style.display = 'none')
        : (confirmbtn.style.display = 'block');
    }

    previousWindowWidth = window.innerWidth;
  };


  export function handleKeyUp(event, index) {
    let luiNavListItemArray = document.querySelectorAll('.lui-us-list .lui-us-navlist__item');
    if (event.keyCode === KEYCODE_ENTER || event.keyCode === KEYCODE_SPACE) {
      luiNavListItemArray[index].click();
    }
    if (event.keyCode === KEYCODE_END) {
      luiNavListItemArray[Object.keys(userSettingGroups).length-1].focus();
    }
    if (event.keyCode === KEYCODE_HOME) {
      luiNavListItemArray[0].focus();
    }
  }

  export function handleKeyDown(event) {
    if (event.keyCode === KEYCODE_ESC && isComboOpen) {
      closeDropDown();
    } else if (event.keyCode === KEYCODE_ESC && !isComboOpen) {
      dispatch('close');
    }
  }
</script>

<svelte:window on:resize={onResize} on:keydown={handleKeyDown} />
<div class="fd-dialog fd-dialog--active lui-usersettings-dialog" tabindex="0">
  <div
    class="fd-dialog__content lui-usersettings-dialog-size"
    role="dialog"
    aria-modal="true"
    aria-labelledby="dialog-title-2"
  >
    <div class="fd-dialog__body lui-usersettings-body">
      <div class="lui-usersettings-left-nav">
        <div class="fd-side-nav">
          <div class="fd-side-nav__group-header">
            <h2 class="fd-title fd-title--h5" id="dialog-title-2">
              {$getTranslation(dialogHeader)}
            </h2>
          </div>
          <div
            class="fd-side-nav__main-navigation lui-fd-side-nav__main-navigation"
          >
            <ul
              class="fd-list fd-list--byline fd-list--navigation lui-us-list"
              role="list"
            >
              {#each Object.entries(userSettingGroups) as [key, userSettingGroup], index}
                {#each Object.entries(userSettingGroup) as userSettingsGroupProperty}
                  <li
                    role="listitem"
                    class="fd-list__item fd-list__item--link lui-us-navlist__item"
                    data-testid="us-navigation-item"
                    on:click|preventDefault={() =>
                      openEditor(userSettingsGroupProperty, event)}
                    on:keydown={event => handleKeyUp(event, [index])}
                    tabindex="0"
                  >
                    <a tabindex="-1" class="fd-list__link" href="#">
                      {#if userSettingsGroupProperty[1].icon}
                        {#if hasOpenUIicon(userSettingsGroupProperty[1])}
                          <span class="fd-list__thumbnail">
                            <i
                              role="presentation"
                              class={getSapIconStr(
                                userSettingsGroupProperty[1].icon
                              )}
                            />
                          </span>
                        {:else}
                          <span
                            class={userSettingsGroupProperty[1]
                              .iconClassAttribute ||
                              'fd-image--s fd-list__thumbnail'}
                            aria-label={userSettingsGroupProperty[1].altText
                              ? userSettingsGroupProperty[1].altText
                              : ''}
                            style="background-image:url('{userSettingsGroupProperty[1]
                              .icon}'); background-size:cover;"
                          />
                          {#if userSettingsGroupProperty[1].initials}
                            <span
                              class={userSettingsGroupProperty[1]
                                .iconClassAttribute + ' lui-profile-initials' ||
                                'fd-image--s fd-list__thumbnail'}
                              aria-label={userSettingsGroupProperty[1].altText
                                ? userSettingsGroupProperty[1].altText
                                : ''}
                              >{userSettingsGroupProperty[1].initials
                                ? userSettingsGroupProperty[1].initials
                                : ''}</span
                            >
                          {/if}
                        {/if}
                        <i role="presentation" class="sap-icon" />
                      {/if}

                      <div class="fd-list__content">
                        <div class="fd-list__title">
                          {$getTranslation(
                            userSettingsGroupProperty[1].label
                              ? userSettingsGroupProperty[1].label
                              : ''
                          )}
                        </div>
                        <div class="fd-list__byline">
                          {$getTranslation(
                            userSettingsGroupProperty[1].sublabel
                              ? userSettingsGroupProperty[1].sublabel
                              : ''
                          )}
                        </div>
                      </div>
                    </a>
                  </li>
                {/each}
              {/each}
            </ul>
          </div>
        </div>
      </div>
      <div class="fd-side-nav__group-header lui-usersettings-dialog-sub-header">
        <button
          class="fd-button fd-button--transparent fd-button--compact lui-usersettings-content-header__back-btn"
          on:click={toggleNavMobile}
        >
          <i class="sap-icon--navigation-left-arrow" />
        </button>
        <h2 class="fd-title fd-title--h5">
          {$getTranslation(userSettingsGroupTitle)}
        </h2>
      </div>

      <div class="lui-usersettings-content">
        <div class="usersettingseditor mf-wrapper">
          {#if userSettingGroup}
            <UserSettingsEditor
              storedUserSettingData={storedUserSettings}
              {userSettingGroup}
              on:updateSettingsObject={updateSettingsObject}
              bind:closeDropDown
              bind:isComboOpen
            />
          {/if}
        </div>
        <div class="iframeUserSettingsCtn iframe-wrapper" />
      </div>
    </div>
    <footer class="fd-dialog__footer fd-bar fd-bar--footer">
      <div class="fd-bar__right">
        <div class="fd-bar__element">
          <button
            on:click={() => storeUserSettings()}
            data-testid="lui-us-saveBtn"
            class="fd-dialog__decisive-button fd-button fd-button--emphasized fd-button--compact confirm-button"
          >
            {$getTranslation(saveBtn)}
          </button>
        </div>
        <div class="fd-bar__element">
          <button
            on:click={() => dispatch('close')}
            data-testid="lui-us-dismissBtn"
            class="fd-dialog__decisive-button fd-button fd-button--transparent fd-button--compact"
          >
            {$getTranslation(dismissBtn)}
          </button>
        </div>
      </div>
    </footer>
  </div>
</div>

<style>
  :root {
    --left-fd-side-nav-width: 20rem;
    --dialog-header-height: 3rem;
  }

  .lui-usersettings-dialog {
    z-index: 999;
  }

  .lui-usersettings-dialog-size {
    width: 58rem;
    height: 80vh;
    max-height: calc(100% - 2.5rem - 6%);
    position: relative;
  }

  .lui-usersettings-body {
    position: relative;
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
    z-index: 1;
  }

  .lui-usersettings-body .fd-side-nav__group-header {
    align-items: center;
  }

  .lui-usersettings-left-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--left-fd-side-nav-width);
    height: 100%;
    z-index: 2;
  }

  .lui-usersettings-left-nav .fd-list__byline {
    padding-top: 0.6em;
  }

  .fd-side-nav {
    height: 100%;
    width: 100%;
  }

  .lui-fd-side-nav__main-navigation {
    position: absolute;
    width: 100%;
    bottom: 0;
    overflow-y: auto;
    top: var(--dialog-header-height);
    background-color: var(--sapBackgroundColor, #f7f7f7);
    border-right: 1px solid var(--sapList_GroupHeaderBorderColor, #d9d9d9);
  }

  .lui-usersettings-content {
    position: absolute;
    left: var(--left-fd-side-nav-width);
    top: 0;
    right: 0;
    bottom: 0;
    overflow-wrap: break-word;
    margin-top: var(--dialog-header-height);
    overflow-y: auto;
    background-color: var(--sapBackgroundColor, #f7f7f7);
  }

  .lui-us-sidenav-image {
    width: 3rem;
    height: 3rem;
  }

  .lui-avatar-space {
    margin-right: 0.75rem;
  }

  .iframeUserSettingsCtn {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
    -webkit-overflow-scrolling: touch;
  }

  .iframeUserSettingsCtn :global(iframe) {
    width: 100%;
    height: 100%;
    border: none;
  }

  .lui-usersettings-content-header__back-btn {
    display: none;
  }

  .lui-usersettings-dialog-sub-header {
    position: relative;
    left: var(--left-fd-side-nav-width);
    max-width: 55rem;
    font-size: var(--sapFontHeader3Size, 20px);
  }

  /*customization of FD Styles to align with Fiori 3*/
  h2.fd-title {
    font-size: var(--sapFontHeader3Size, 20px);
    color: var(--sapGroup_TitleTextColor);
  }

  .fd-side-nav__group-header {
    height: var(--dialog-header-height);
  }

  .usersettingseditor {
    padding: 20px;
  }

  .fd-avatar {
    position: relative;
    z-index: 2;
    background-color: transparent;
    /* border: 1px solid var(--sapList_Background, #fff);*/
  }

  .lui-profile-initials {
    position: absolute;
    z-index: 1;
    background-color: var(
      --fdAvatar_BackgroundColor,
      var(--sapAccentColor6, #286eb4)
    );
  }

  /*Fiori 3 guidlines*/
  @media (min-width: 1024px) {
    .lui-usersettings-dialog-size {
      max-width: 75rem;
      max-height: 60rem;
    }
  }

  @media (max-width: 600px) {
    :global(.usersettings-leftNavVisible) .lui-usersettings-left-nav {
      width: 0;
      overflow: hidden;
    }

    /*micro frontend and iframe wrappers inside the right-side dialog body*/
    .mf-wrapper,
    .iframe-wrapper {
      height: 100%;
    }

    .fd-dialog__content {
      max-width: 90%;
      min-width: 90%;
    }

    .lui-usersettings-dialog {
      max-width: 100%;
    }

    .lui-usersettings-content {
      left: 0;
    }

    .lui-usersettings-left-nav {
      width: 100%;
      transition: 0.5s;
    }

    .lui-usersettings-dialog-sub-header {
      left: 0;
    }

    .lui-usersettings-content-header__back-btn {
      margin-right: 0.5em;
      display: inline-block;
      position: relative;
      z-index: 1;
    }
  }
</style>
