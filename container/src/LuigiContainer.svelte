<svelte:options tag={null}/>

<script>
	export let viewurl;
	export let context;
	export let label;
	export let webcomponent;

	let iframeHandle = {};
	let mainComponent;
	
	import { onMount, onDestroy  } from 'svelte';
	import { get_current_component } from 'svelte/internal';
	import { ContainerService } from './services/container.service';
	import { WebComponentService } from './services/webcomponents.service';

	const containerService = new ContainerService();
	const webcomponentService = new WebComponentService();
	webcomponentService.createClientAPI = (eventBusElement, nodeId, wc_id) => {
		return {
			linkManager: () => {},//window.Luigi.navigation,
			uxManager: () => { return {
				showAlert: (alertSettings) => {
					dispatchLuigiEvent('alert-request', alertSettings);
				},
				showConfirmationModal: async (settings) => {
					return new Promise((resolve, reject) => {
					dispatchLuigiEvent('confirmation-request', settings, (data) => {
						if(data) {
						resolve(data);
						} else {
						reject();
						}
					});
					});
				}
				};
			},//window.Luigi.ux,
			getCurrentLocale: () => {},//() => window.Luigi.i18n().getCurrentLocale(),
			publishEvent: ev => {
				// if (eventBusElement.eventBus) {
				// eventBusElement.eventBus.onPublishEvent(ev, nodeId, wc_id);
				// }
			}
		};
	};

  	const thisComponent = get_current_component();
	thisComponent.iframeHandle = iframeHandle;
	let deferInit = !!thisComponent.attributes['defer-init'];
	
	thisComponent.init = () => {
		deferInit = false;
	};
		
	containerService.registerContainer(thisComponent);

	function dispatchLuigiEvent(msg, data, callback) {
		containerService.dispatch(msg, thisComponent, data, callback);
	}

	function isWebComponent() {
		return !!webcomponent;
	}

	onMount(async () => {
		const ctx = context ? JSON.parse(context) : undefined;
		console.log(ctx);
		if(isWebComponent()) {
			mainComponent.innerHTML = '';
			webcomponentService.renderWebComponent(viewurl, mainComponent, ctx, {});
		}
	});

	onDestroy(async () => {

	});
</script>

<main bind:this={mainComponent}>
	{#if !deferInit}
		{#if !isWebComponent()}
			<iframe bind:this={iframeHandle.iframe} src="{viewurl}" title="{label}"></iframe>
		{/if}
	{/if}
</main>

<style>
	main, iframe {
		width:100%;
		height: 100%;
		border: none;
	}
</style>