<svelte:options tag={null} />

<script lang="ts">
  export let viewurl;
  export let context;
  export let label;
  export let webcomponent;
  // if `true` at LuigiContainer tag, LuigiContainer sends an event `initialzed` to mfe. Mfe is immediately ready.
  export let instantInit;
  export let locale;
  export let theme;
  export let active_feature_toggle_list;

  let iframeHandle:
    | {
        iframe: HTMLIFrameElement;
      }
    | any = {};
  let mainComponent: HTMLElement;

  import { onMount, onDestroy } from 'svelte';
  import { get_current_component } from 'svelte/internal';
  import { containerService } from './services/container.service';
  import { WebComponentService } from './services/webcomponents.service';
  import { LuigiInternalMessageID } from './constants/internal-communication';
  import { ContainerAPI } from './api/container-api';
  import { Events } from './constants/communication';

  const webcomponentService = new WebComponentService();

  const thisComponent: any = get_current_component();

  thisComponent.iframeHandle = iframeHandle;
  let deferInit: boolean = !!thisComponent.attributes['defer-init'];

  thisComponent.init = () => {
    deferInit = false;
  };

  thisComponent.sendCustomMessage = (id: string, data?: any) => {
    ContainerAPI.sendCustomMessage(
      id,
      mainComponent,
      isWebComponent(),
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

  function isWebComponent(): boolean {
    return !!webcomponent;
  }

  function canMfeInitialized(): boolean {
    return !!instantInit;
  }

  onMount(async () => {
    const ctx = context ? JSON.parse(context) : {};
    if (isWebComponent()) {
      mainComponent.innerHTML = '';
      webcomponentService.renderWebComponent(viewurl, mainComponent, ctx, {});
    }
    if (canMfeInitialized()) {
      thisComponent.isMfeInitialized = true;
      setTimeout(() => {
        webcomponentService.dispatchLuigiEvent(Events.INITIALIZED, {});
      });
    } else if (isWebComponent()) {
      mainComponent.addEventListener('wc_ready', () => {
        if (
          !(mainComponent as any)._luigi_mfe_webcomponent
            ?.deferLuigiClientWCInit
        ) {
          thisComponent.isMfeInitialized = true;
          webcomponentService.dispatchLuigiEvent(Events.INITIALIZED, {});
        }
      });
    }
    // deferInit = true;
  });

  onDestroy(async () => {});
</script>

<main
  bind:this={mainComponent}
  class={isWebComponent() ? undefined : 'lui-isolated'}
>
  {#if !deferInit}
    {#if !isWebComponent()}
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
