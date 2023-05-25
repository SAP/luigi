<script>
	import '../styles/app.scss';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const importScripts = (LuigiClient) => {
		const scriptsToImport = [
			'./../../../client-js/accordion.js',
			'./../../../client-js/copy-code.js',
			'./../../../client-js/search-tag.js',
			'./../../../client-js/smooth-scroll-anchors.js',
			'./../../../client-js/internal-links.js',
			'./../../../client-js/outer-frame-handler.js',
			'./../../../client-js/helpers.js'
		];

		const importPromises = scriptsToImport.map((script) => import(script));

		console.log('promise out');
		Promise.all(importPromises)
			.then((modules) => {
				console.log('TEST MODULES', modules, modules[0]);
				// Use the imported modules here
				new modules[0].Accordion().init();
				new modules[1].CopyCodeHandler().init();
				new modules[2].SearchTagHandler().init(LuigiClient);
				new modules[3].ScrollAnchorsHandler().init(LuigiClient);
				new modules[4].InternalLinksHandler().init(LuigiClient);
				new modules[5].OuterFrameHandler().init();
			})
			.catch((error) => {
				console.log('promise eror', error);

				// Handle any import errors
			});
		console.log('promise after');
	};

	onMount(() => {
		if (browser) {
			import('@luigi-project/client')
				.then((LuigiClient) => {
					// Use the imported module here
					// For example: module.someFunction();
					console.log(LuigiClient.default);

					console.log(LuigiClient.default.addInitListener);
					importScripts(LuigiClient.default);
				})
				.catch((error) => {
					console.error('Error loading module:', error);
				});
		}
	});
</script>

<div class="docu-content">
	<slot />
</div>
