<script>
  import { beforeUpdate, onMount, createEventDispatcher } from 'svelte';
  import { LuigiConfig } from './core-api';
  import { IframeHelpers, EventListenerHelpers } from './utilities/helpers';

  const dispatch = createEventDispatcher();

  export let backdropClass = '';
  export let backdropActive = false;
  let wasBackdropActive = false;
  let options = {};
  export let area;
  export let disable;

  const setBackdropClass = () => {
    const baseClasses = 'lui-backdrop ';
    if (!backdropActive) {
      backdropClass = '';
    } else if (options.data && options.data.heightCssClass) {
      backdropClass = baseClasses + options.data.heightCssClass;
    } else {
      backdropClass = baseClasses + 'height-auto';
    }
  };

  const isValidForArea = (e) => {
    if (!area) {
      return true;
    }
    const allMessagesSources = [
      ...IframeHelpers.getMicrofrontendsInDom(),
      { contentWindow: window, luigi: { viewUrl: window.location.href } },
    ];
    const microfrontend = allMessagesSources.find(
      (mf) => mf.container && mf.container.contentWindow === e.source
    );
    if (microfrontend && area === microfrontend.type) {
      return false;
    }
    return true;
  };

  onMount(() => {
    const backdropDisabled = LuigiConfig.getConfigValue(
      'settings.backdropDisabled'
    );
    if (!backdropDisabled) {
      setBackdropClass();
      EventListenerHelpers.addEventListener('message', (e) => {
        const srcIframe = IframeHelpers.getValidMessageSource(e);
        if (!srcIframe) return;
        if (disable !== true) {
          if ('luigi.add-backdrop' === e.data.msg) {
            backdropActive = isValidForArea(e);
            dispatch('stateChanged', { backdropActive: true });
            // disable backdrop background elements' accessbility
            IframeHelpers.disableA11yOfInactiveIframe(srcIframe);
          }
          if ('luigi.remove-backdrop' === e.data.msg) {
            const previousBackdropState = backdropActive;
            backdropActive = false;
            dispatch('stateChanged', { backdropActive: false });
            // enable backdrop background elements' accessbility
            // enable it only if backdrop was active,
            // otherwise all tabindex properties will be removed
            if(wasBackdropActive){
              IframeHelpers.enableA11yOfInactiveIframe();
            }
          }
        }
      });
    }
  });

  // [svelte-upgrade warning]
  // beforeUpdate and afterUpdate handlers behave
  // differently to their v2 counterparts
  beforeUpdate(() => {
    if (backdropActive !== wasBackdropActive) {
      wasBackdropActive = backdropActive;
      setBackdropClass();
    }
  });
</script>

<div
  class="{backdropClass} {area === 'main' ? 'zIndexZero' : ''}"
  aria-hidden="false"
>
  <slot />
</div>

<style type="text/scss">
  .lui-backdrop {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
  }

  .lui-backdrop.zIndexZero {
    z-index: 0;
  }
</style>
