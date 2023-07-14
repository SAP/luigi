<svelte:options tag={null} />

<script lang="ts">
  export let viewurl;
  export let context;
  export let label;
  export let webcomponent;
  export let locale;

  let iframeHandle:
    | {
        iframe: HTMLIFrameElement;
      }
    | any = {};
  let mainComponent: HTMLElement;

  import { onMount, onDestroy } from 'svelte';
  import { get_current_component } from 'svelte/internal';
  import { containerService } from './services/container.service';
  import { ContainerWCService } from './services/web-component-service/container-web-components.service';
  import { LuigiInternalMessageID } from './constants/internal-communication';
  import { ContainerAPI } from './api/container-api';

  const webcomponentService = new ContainerWCService();

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
  webcomponentService.locale = locale;

  function isWebComponent(): boolean {
    return !!webcomponent;
  }

  onMount(async () => {
    const ctx = context ? JSON.parse(context) : {};
    if (isWebComponent()) {
      mainComponent.innerHTML = '';
      webcomponentService.renderWebComponent(viewurl, mainComponent, ctx, {});
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
