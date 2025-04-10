<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { LuigiI18N } from './core-api';
  import { KEYCODE_ESC } from './utilities/keycode.js';
  import { EscapingHelpers, NavigationHelpers, IframeHelpers } from './utilities/helpers';

  const dispatch = createEventDispatcher();

  export let settings;
  const iconMapping = {
    confirmation: 'question-mark',
    information: 'message-information',
    warning: 'message-warning',
    error: 'message-error',
    success: 'message-success'
  };

  onDestroy(() => {
    IframeHelpers.enableA11YKeyboardBackdropExceptClassName('.fd-message-box-docs-static');
  });

  onMount(() => {
    const defaultSettings = {
      icon: iconMapping[settings.type],
      header: LuigiI18N.getTranslation('luigi.confirmationModal.header'),
      body: LuigiI18N.getTranslation('luigi.confirmationModal.body'),
      buttonDismiss: LuigiI18N.getTranslation('luigi.button.dismiss'),
      buttonConfirm: LuigiI18N.getTranslation('luigi.button.confirm')
    };
    settings = {
      ...settings,
      body: EscapingHelpers.sanatizeHtmlExceptTextFormatting(settings.body)
    };
    settings = Object.assign(defaultSettings, settings);

    IframeHelpers.disableA11YKeyboardExceptClassName('.fd-message-box-docs-static');

    const focusedButton = settings.buttonConfirm ? 'confirm-button' : 'dismiss-button';

    try {
      document.querySelector(`.${focusedButton}`).focus();
    } catch (e) {
      console.warn(`Couldn't focus ${focusedButton} in modal`);
    }
  });

  function getSapIconStr(iconString) {
    return NavigationHelpers.renderIconClassName(iconString);
  }

  // [svelte-upgrade suggestion]
  // review these functions and remove unnecessary 'export' keywords
  export function handleKeydown(event) {
    if (event.keyCode === KEYCODE_ESC) {
      dispatch('modalDismiss');
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />
<div
  class="fd-message-box-docs-static fd-message-box fd-message-box--{settings.type} fd-message-box--active"
  data-testid="luigi-confirmation-modal"
>
  <section class="fd-message-box__content">
    <header class="fd-bar fd-bar--header fd-message-box__header">
      <div class="fd-bar__left">
        <div class="fd-bar__element">
          {#if settings.type}<i class={getSapIconStr(settings.icon)} />{/if}
          <h2 class="fd-title fd-title--h5">{settings.header}</h2>
        </div>
      </div>
    </header>
    <div class="fd-message-box__body">
      {@html settings.body}
    </div>
    <footer class="fd-bar fd-bar--footer fd-message-box__footer">
      <div class="fd-bar__right">
        {#if settings.buttonConfirm !== false}
          <div class="fd-bar__element">
            <button
              on:click={() => dispatch('modalConfirm')}
              data-testid="luigi-modal-confirm"
              class="fd-button fd-button--emphasized fd-button--compact fd-message-box__decisive-button confirm-button"
            >
              {settings.buttonConfirm}
            </button>
          </div>
        {/if}
        <div class="fd-bar__element">
          <button
            on:click={() => dispatch('modalDismiss')}
            data-testid="luigi-modal-dismiss"
            class="fd-button {settings.buttonConfirm === false
              ? 'fd-button--emphasized'
              : 'fd-button--transparent'} fd-button--compact fd-message-box__decisive-button dismiss-button"
          >
            {settings.buttonDismiss}
          </button>
        </div>
      </div>
    </footer>
  </section>
</div>

<style lang="scss">
  .fd-message-box {
    z-index: 1001;
    &__body {
      overflow-wrap: break-word;
    }
  }

  @media (min-width: $desktopMinWidth) {
    .fd-message-box__content {
      max-width: 460px;
    }
  }
</style>
