<svelte:options
  customElement={{
    tag: null,
    props: {
      viewurl: { type: 'String', reflect: false, attribute: 'viewurl' },
      deferInit: { type: 'Boolean', attribute: 'defer-init' },
      context: { type: 'String', reflect: false, attribute: 'context' },
      label: { type: 'String', reflect: false, attribute: 'label' },
      webcomponent: {
        type: 'String',
        reflect: false,
        attribute: 'webcomponent'
      },
      locale: { type: 'String', reflect: false, attribute: 'locale' },
      theme: { type: 'String', reflect: false, attribute: 'theme' },
      activeFeatureToggleList: {
        type: 'Array',
        reflect: false,
        attribute: 'active-feature-toggle-list'
      },
      skipInitCheck: {
        type: 'Boolean',
        reflect: false,
        attribute: 'skip-init-check'
      },
      nodeParams: { type: 'Object', reflect: false, attribute: 'node-params' },
      userSettings: {
        type: 'Object',
        reflect: false,
        attribute: 'user-settings'
      },
      anchor: { type: 'String', reflect: false, attribute: 'anchor' },
      searchParams: {
        type: 'Object',
        reflect: false,
        attribute: 'search-params'
      },
      pathParams: { type: 'Object', reflect: false, attribute: 'path-params' },
      clientPermissions: {
        type: 'Object',
        reflect: false,
        attribute: 'client-permissions'
      }
    },
    extend: customElementConstructor => {
      let notInitFn = name => {
        return () =>
          console.warn(
            name +
              " can't be called on luigi-container before its micro frontend is attached to the DOM."
          );
      };
      return class extends customElementConstructor {
        sendCustomMessage = notInitFn('sendCustomMessage');
        updateContext = notInitFn('updateContext');
        closeAlert = notInitFn('closeAlert');
      };
    }
  }}
/>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { containerService } from './services/container.service';
  import { WebComponentService } from './services/webcomponents.service';
  import { ContainerAPI } from './api/container-api';
  import { Events } from './constants/communication';

  export let viewurl: string;
  export let context: string;
  export let label: string;
  export let webcomponent: string;
  export let deferInit: boolean;
  export let locale: string;
  export let theme: string;
  export let activeFeatureToggleList: string[];
  export let skipInitCheck: boolean;
  export let nodeParams: any;
  export let searchParams: any;
  export let pathParams: any;
  export let clientPermissions: any;

  export let userSettings: any;
  export let anchor: string;

  const iframeHandle:
    | {
        iframe: HTMLIFrameElement;
      }
    | any = {};
  let mainComponent: HTMLElement;

  let containerInitialized = false;

  const webcomponentService = new WebComponentService();

  // Only needed for get rid of "unused export property" svelte compiler warnings
  export const unwarn = () => {
    return (
      locale &&
      theme &&
      activeFeatureToggleList &&
      nodeParams &&
      searchParams &&
      pathParams &&
      clientPermissions &&
      userSettings &&
      anchor
    );
  };

  const initialize = (thisComponent: any) => {
    if (!containerInitialized) {
      thisComponent.sendCustomMessage = (id: string, data?: any) => {
        ContainerAPI.sendCustomMessage(
          id,
          mainComponent,
          !!webcomponent,
          iframeHandle,
          data
        );
      };

      thisComponent.updateContext = (contextObj: any, internal?: any) => {
        ContainerAPI.updateContext(contextObj, internal, iframeHandle);
      };

      thisComponent.closeAlert = (id: any, dismissKey: any) => {
        ContainerAPI.closeAlert(id, dismissKey, iframeHandle);
      };

      containerService.registerContainer(thisComponent);
      webcomponentService.thisComponent = thisComponent;

      const ctx = context ? JSON.parse(context) : {};
      if (webcomponent) {
        mainComponent.innerHTML = '';
        webcomponentService.renderWebComponent(viewurl, mainComponent, ctx, {});
      }
      if (skipInitCheck) {
        thisComponent.initialized = true;
        setTimeout(() => {
          webcomponentService.dispatchLuigiEvent(Events.INITIALIZED, {});
        });
      } else if (webcomponent) {
        mainComponent.addEventListener('wc_ready', () => {
          if (
            !(mainComponent as any)._luigi_mfe_webcomponent
              ?.deferLuigiClientWCInit
          ) {
            thisComponent.initialized = true;
            webcomponentService.dispatchLuigiEvent(Events.INITIALIZED, {});
          }
        });
      }
      containerInitialized = true;
    }
  };

  onMount(async () => {
    const thisComponent: any = (mainComponent.getRootNode() as ShadowRoot).host;
    thisComponent.iframeHandle = iframeHandle;
    thisComponent.init = () => {
      initialize(thisComponent);
    };
    if (!deferInit) {
      initialize(thisComponent);
    }
  });

  onDestroy(async () => {});
</script>

<main
  bind:this={mainComponent}
  class={webcomponent ? undefined : 'lui-isolated'}
>
  {#if containerInitialized}
    {#if !webcomponent}
      <iframe bind:this={iframeHandle.iframe} src={viewurl} title={label} />
    {/if}
  {/if}
</main>

<style>
  main,
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  main.lui-isolated {
    line-height: 0;
  }
</style>
