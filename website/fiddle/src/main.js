import App from './App.svelte';
import '@kyma-project/luigi-core/luigi';

const app = new App({
	target: document.body,
	props: {
		name: 'Luigi Fiddle'
	}
});

window.app = app;

export default app;