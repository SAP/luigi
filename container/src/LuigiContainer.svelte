<svelte:options tag={null} />

<script lang="ts">
  export let viewurl;
  export let context;
  export let label;
  export let webcomponent;

  let iframeHandle:
    | {
        iframe: HTMLIFrameElement;
      }
    | any = {};
  let mainComponent: HTMLElement;

  import { onMount, onDestroy } from 'svelte';
  import { get_current_component } from 'svelte/internal';
  import { ContainerService } from './services/container.service';
  import { WebComponentService } from './services/webcomponents.service';

  const containerService = new ContainerService();
  const webcomponentService = new WebComponentService();
  webcomponentService.createClientAPI = (eventBusElement, nodeId, wc_id) => {
    return {
      linkManager: () => {
        return {
          navigate: route => {
            dispatchLuigiEvent('navigation-request', { link: route });
          }
        };
      },
      uxManager: () => {
        return {
          showAlert: alertSettings => {
            dispatchLuigiEvent('alert-request', alertSettings);
          },
          showConfirmationModal: async settings => {
            return new Promise((resolve, reject) => {
              dispatchLuigiEvent('confirmation-request', settings, data => {
                if (data) {
                  resolve(data);
                } else {
                  reject();
                }
              });
            });
          }
        };
      }, //window.Luigi.ux,
      getCurrentLocale: () => {}, //() => window.Luigi.i18n().getCurrentLocale(),
      publishEvent: ev => {
        // if (eventBusElement.eventBus) {
        // eventBusElement.eventBus.onPublishEvent(ev, nodeId, wc_id);
        // }
      }
    };
  };

  const thisComponent: any = get_current_component();

  thisComponent.iframeHandle = iframeHandle;
  let deferInit: boolean = !!thisComponent.attributes['defer-init'];
  console.log('deferInit', deferInit);
  thisComponent.init = () => {
    console.log('CALLED!!!', deferInit);
    deferInit = false;
  };

  containerService.registerContainer(thisComponent);

  function dispatchLuigiEvent(msg: string, data: any, callback?: Function) {
    containerService.dispatch(msg, thisComponent, data, callback);
  }

  function isWebComponent(): boolean {
    return !!webcomponent;
  }

  onMount(async () => {
    const ctx = context ? JSON.parse(context) : undefined;
    console.log('test00', ctx);
    console.log('test11', mainComponent, typeof mainComponent);
    if (isWebComponent()) {
      mainComponent.innerHTML = '';
      console.log('isWebComponent', true);
      webcomponentService.renderWebComponent(viewurl, mainComponent, ctx, {});
    }
    console.log('deferInit2', deferInit);
    // deferInit = true;
  });

  onDestroy(async () => {});
  console.log('deferInit 3', deferInit);
</script>

<main
  bind:this={mainComponent}
  class={isWebComponent() ? undefined : 'lui-isolated'}
>
  {deferInit}
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
