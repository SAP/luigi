import App from './App.svelte';

const app = new App({
  target: document.body
});

window.app = app;

export default app;
