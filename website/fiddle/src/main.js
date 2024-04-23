import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Luigi Fiddle'
	}
});

window.app = app;

export default app;