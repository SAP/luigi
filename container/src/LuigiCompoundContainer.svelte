<svelte:options tag={null} accessors={true} />

<script lang="ts">
  export let viewurl;
  export let context;
  // if `true` at LuigiContainer tag, LuigiContainer sends an event `initialized` to mfe. Mfe is immediately ready.
  export let skipinitcheck;
  // export let label;
  export let locale;
  export let theme;
  export let active_feature_toggle_list;

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

  const thisComponent = get_current_component();
  let deferInit = !!thisComponent.attributes['defer-init'];

  function canMfeInitialized(): boolean {
    return !!skipinitcheck;
  }

  thisComponent.init = () => {
    if (!thisComponent.compoundConfig || initialized) {
      return;
    }
    const ctx = context ? JSON.parse(context) : {};
    deferInit = false;
    const node = {
      compound: thisComponent.compoundConfig,
      viewUrl: viewurl ? viewurl : undefined,
      webcomponent: true
    }; // TODO: fill with sth
    webcomponentService
      .renderWebComponentCompound(node, mainComponent, ctx)
      .then(compCnt => {
        eventBusElement = compCnt;
        if (canMfeInitialized()) {
          thisComponent.isMfeInitialized = true;
          setTimeout(() => {
            webcomponentService.dispatchLuigiEvent(Events.INITIALIZED, {});
          });
        } else if (
          (eventBusElement as any).LuigiClient &&
          !(eventBusElement as any).deferLuigiClientWCInit
        ) {
          thisComponent.isMfeInitialized = true;
          webcomponentService.dispatchLuigiEvent(Events.INITIALIZED, {});
        }
      });
    initialized = true;
  };

  containerService.registerContainer(thisComponent);
  webcomponentService.thisComponent = thisComponent;

  onMount(async () => {});
</script>

<main bind:this={mainComponent} />

<style>
  main {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
