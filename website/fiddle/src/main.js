import App from './App.svelte';
import '@luigi-project/core';

const app = new App({
	target: document.body,
	props: {
		name: 'Luigi Fiddle'
	}
});

window.app = app;

export default app;