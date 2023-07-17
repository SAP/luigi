<svelte:options tag={null} accessors={true} />

<script lang="ts">
  // export let viewurl;
  export let context;
  // export let label;
  let compoundConfig;

  let initialized = false;
  let mainComponent;
  let eventBusElement;

  import { onMount } from 'svelte';
  import { get_current_component } from 'svelte/internal';
  import { ContainerService } from './services/container.service';
  import { WebComponentService } from './services/web-components.service';
  const containerService = new ContainerService();
  const webcomponentService = new WebComponentService();

  const thisComponent = get_current_component();
  let deferInit = !!thisComponent.attributes['defer-init'];

  thisComponent.init = () => {
    if (!thisComponent.compoundConfig || initialized) return;
    deferInit = false;
    const node = {
      compound: thisComponent.compoundConfig
    }; // TODO: fill with sth
    webcomponentService
      .renderWebComponentCompound(node, mainComponent, context)
      .then(compCnt => {
        eventBusElement = compCnt;
      });

    initialized = true;
  };

  containerService.registerContainer(thisComponent);
  webcomponentService.thisComponent = thisComponent;

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
