<svelte:options tag={null} accessors={true}/>

<script>
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
	import { WebComponentService } from './services/webcomponents.service'

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
				console.log('pub', ev)
				if (eventBusElement && eventBusElement.eventBus) {
					eventBusElement.eventBus.onPublishEvent(ev, nodeId, wc_id);
				}
			}
		};
	};

  	const thisComponent = get_current_component();
	let deferInit = !!thisComponent.attributes['defer-init'];
	
	thisComponent.init = () => {
		if(!thisComponent.compoundConfig || initialized) return;
		deferInit = false;
		console.log('init compound');
		const node = {
			compound: thisComponent.compoundConfig 
		}; // TODO: fill with sth
		webcomponentService.renderWebComponentCompound(node, mainComponent, context).then((compCnt) => {
			eventBusElement = compCnt;
		});
		initialized = true;
	};
		
	containerService.registerContainer(thisComponent);
	
	function dispatchLuigiEvent(msg, data, callback) {
		containerService.dispatch(msg, thisComponent, data, callback);
	}

	onMount(async () => {
		const ctx = context ? JSON.parse(context) : undefined;
		console.log(ctx);
	});
</script>

<main bind:this={mainComponent}>
	
</main>

<style>
	main {
		width:100%;
		height: 100%;
		border: none;
	}
</style>