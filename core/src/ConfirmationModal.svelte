<script>
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  import { LuigiI18N } from './core-api';
  export let settings;

  onMount(() => {
    const defaultSettings = {
      header: LuigiI18N.getTranslation('luigi.confirmationModal.header'),
      body: LuigiI18N.getTranslation('luigi.confirmationModal.body'),
      buttonDismiss: LuigiI18N.getTranslation('luigi.button.dismiss'),
      buttonConfirm: LuigiI18N.getTranslation('luigi.button.confirm')
    };

    settings = Object.assign(defaultSettings, settings);

    try {
      document.querySelector('.confirm-button').focus();
    } catch (e) {
      console.warn("Couldn't focus confirmation button in modal");
    }
  });

  // [svelte-upgrade suggestion]
  // review these functions and remove unnecessary 'export' keywords
  export function handleKeydown(event) {
    if (event.keyCode === 27) {
      dispatch('modalDismiss');
    }
  }
</script>

<svelte:window on:keydown="{handleKeydown}"/>
<div class="fd-ui__overlay fd-overlay fd-overlay--modal" aria-hidden="false">
  <div class="fd-modal" data-testid="luigi-confirmation-modal">
    <div class="fd-modal__content" role="document">
      <div class="fd-modal__header">
        <h1 class="fd-modal__title">{settings.header}</h1>
        <button
          class="fd-button--light fd-modal__close"
          on:click="{() => dispatch('modalDismiss')}"
          aria-label="close"
        ></button>
      </div>
      <div class="fd-modal__body">{settings.body}</div>
      <footer class="fd-modal__footer">
        <div class="fd-modal__actions">
          <button
            on:click="{() => dispatch('modalDismiss')}"
            data-testid="luigi-modal-dismiss"
            class="fd-button--light"
          >{settings.buttonDismiss}</button>
          <button
            on:click="{() => dispatch('modalConfirm')}"
            data-testid="luigi-modal-confirm"
            class="fd-button confirm-button"
          >{settings.buttonConfirm}</button>
        </div>
      </footer>
    </div>
  </div>
</div>

<style type="text/scss">
  $topNavHeight: 50px;
  $leftNavWidth: 320px;
  $width: 32rem;

  .fd-overlay--modal {
    left: 0;
  }
  .fd-modal {
    &__body,
    &__header {
      overflow-wrap: break-word;
    }
  }

  :global(.no-side-nav),
  :global(.no-nav) {
    .fd-modal {
      left: calc(50% - #{$width}/ 2);
    }
  }
</style>
