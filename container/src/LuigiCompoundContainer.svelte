<svelte:options tag={null} accessors={true} />

<script lang="ts">
  export let viewurl;
  export let context;

  let compoundConfig;

  let initProcessed = false;
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

  thisComponent.init = () => {
    if (!thisComponent.compoundConfig || initProcessed) {
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
        if (thisComponent.hasAttribute('skip-init-check') || !node.viewUrl) {
          thisComponent.initialized = true;
          setTimeout(() => {
            webcomponentService.dispatchLuigiEvent(Events.INITIALIZED, {});
          });
        } else if (
          (eventBusElement as any).LuigiClient &&
          !(eventBusElement as any).deferLuigiClientWCInit
        ) {
          thisComponent.initialized = true;
          webcomponentService.dispatchLuigiEvent(Events.INITIALIZED, {});
        }
      });
    initProcessed = true;
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
