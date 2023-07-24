<svelte:options tag={null} accessors={true} />

<script lang="ts">
  export let viewurl;
  export let context;
  // export let label;
  // if `true` at LuigiContainer tag, LuigiContainer sends an event `initialzed` to mfe. Mfe is immediately ready.
  export let initialize_mfe_directly;
  // once the microfrontend is initialized, this value is set to `true`.
  export let is_mfe_initialized;
  let compoundConfig;

  let initialized = false;
  let mainComponent;
  let eventBusElement;

  import { onMount } from 'svelte';
  import { get_current_component } from 'svelte/internal';
  import { ContainerService } from './services/container.service';
  import { WebComponentService } from './services/webcomponents.service';
  import { Events } from './constants/communication';

  const containerService = new ContainerService();
  const webcomponentService = new WebComponentService();
  webcomponentService.createClientAPI = (eventBusElement, nodeId, wc_id) => {
    return {
      linkManager: () => {}, //window.Luigi.navigation,
      uxManager: () => {
        return {
          showAlert: alertSettings => {
            dispatchLuigiEvent('alert-request', alertSettings, {});
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
        if (eventBusElement && eventBusElement.eventBus) {
          eventBusElement.eventBus.onPublishEvent(ev, nodeId, wc_id);
        }
      },
      luigiClientInit: () => {
        dispatchLuigiEvent(Events.INITIALIZED, {});
      }
    };
  };

  const thisComponent = get_current_component();
  let deferInit = !!thisComponent.attributes['defer-init'];

  function canMfeInitialized(): boolean {
    return !!initialize_mfe_directly;
  }

  thisComponent.init = () => {
    if (!thisComponent.compoundConfig || initialized) {
      console.log('return from init');
      return;
    }
    deferInit = false;
    const node = {
      compound: thisComponent.compoundConfig,
      viewUrl: viewurl ? viewurl : undefined,
      webcomponent: true
    }; // TODO: fill with sth
    webcomponentService
      .renderWebComponentCompound(node, mainComponent, context)
      .then(compCnt => {
        eventBusElement = compCnt;
        console.log(
          'tagName',
          customElements.get((compCnt as HTMLElement).tagName)
        );
        console.log('compCnt', (compCnt as HTMLElement).tagName);
        if (canMfeInitialized()) {
          is_mfe_initialized = true;
          setTimeout(() => {
            dispatchLuigiEvent(Events.INITIALIZED, {});
          });
        } else if ((compCnt as HTMLElement).tagName) {
          console.log('ELSE');
          eventBusElement.addEventListener('wc_ready', () => {
            if (!(eventBusElement as any).deferLuigiClientWCInit) {
              is_mfe_initialized = true;
              dispatchLuigiEvent(Events.INITIALIZED, {});
            }
          });
        }
      });
    initialized = true;
  };

  containerService.registerContainer(thisComponent);

  function dispatchLuigiEvent(msg: string, data: any, callback?: Function) {
    containerService.dispatch(msg, thisComponent, data, callback);
  }

  onMount(async () => {
    const ctx = context ? JSON.parse(context) : {};
  });
</script>

<main bind:this={mainComponent} />

<style>
  main {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
