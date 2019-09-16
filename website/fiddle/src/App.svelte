<script>
	import * as luigiCorePkg from '../node_modules/@kyma-project/luigi-core/package.json';
	import defaultConfig from './defaultConfig.js';
	import { onMount } from 'svelte';

	export let luigiVersion = luigiCorePkg.version;
	
	let defaultConfigString = defaultConfig;
	let configString = defaultConfigString;


	function reloadConfig() {
		let customConfig = localStorage.getItem("fiddle");

		try {
			if (!customConfig) {
				localStorage.setItem("fiddle", defaultConfigString);
				customConfig = defaultConfigString;
			}
			eval(customConfig);
			configString = customConfig;
		} catch (e) {
			console.error(e);
			localStorage.removeItem("fiddle");
			eval(defaultConfigString);
			configString = defaultConfigString;
		}
	}
	
	function saveConfig() {
		localStorage.setItem("fiddle", window.editor.getValue());
		window.location.href = "/";
	}

	function closeConfig() {
		document.body.classList.remove("editorVisible");
	}

	function resetConfig() {
		window.editor.setValue(defaultConfigString);
		window.editor.clearSelection();
	}

	function clearConfig() {
		window.editor.setValue("");
		window.editor.clearSelection();
	}

	function openConfig() {
		window.editor.setValue(configString);
		window.editor.clearSelection();
		document.body.classList.add("editorVisible");
	}

	function hide() {
		document.body.classList.remove("show-bar");
	}

	function clearAll() {
		localStorage.clear();
		sessionStorage.clear();
	}

	onMount(async () => {
		window.editor = ace.edit("editor");
		editor.session.setMode("ace/mode/javascript");
		reloadConfig();
	});
</script>

<style>
  :global(.show-bar) .fiddle-toolbar {
      display: block;
  }

  :global(.show-bar) #app .fd-app__sidebar,
  :global(.show-bar) .fd-page.iframeContainer {
    bottom: 50px !important;
  }
	
  .fiddle-toolbar {
    border-top: 1px solid rgb(48, 48, 48);
    background: #3c4553;
    position: fixed;
    bottom: 0;
    height: 49px;
    width: 100%;
    z-index: 1;
    display: none;
  }

  .fiddle-toolbar .fd-link {
	  color: #2deb8a;
	}

  .editor_container {
    visibility: hidden;
	z-index: -1;
	width: 100%;
	height: 100%;
  }

  :global(.editorVisible) .editor_container {
    visibility: visible;
    z-index: 2;
  }

  #editor {
    width: 100%;
    height: calc(100vh - 300px);
  }

  .fd-action-bar__header {
	overflow: visible;
    padding-left: 5px;
    color: white;
    font-size: 0.8em;
    margin-top: -3px;
  }

  .fd-action-bar__header a.fd-link {
    margin-left: 10px;
  }

  .fd-action-bar > .fd-action-bar__actions {
	margin: -3px 5px 2px -5px;
  }

  .btn-primary {
	display: inline-block;
    border: 2px solid #2deb8a;
    border-radius: 8px;
    -webkit-box-shadow: 0 8px 24px -17px #000101;
    box-shadow: 0 8px 24px -17px #000101;
    background-color: #2deb8a;
    font-size: 12px;
    font-weight: 600;
    font-family: "Open Sans",sans-serif;
    color: #29303a;
    cursor: pointer;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
  }

  .btn-primary:hover,
  .btn-primary:active,
  .btn-primary:focus {
    background-color: white;
    color: #2deb8a;
  }

  @media (max-width: 600px) {
    .lui-version {
		display: none;
	}
  }
 
</style>

<div class="editor_container fd-shell__overlay fd-overlay fd-overlay--modal">
	<div class="fd-modal" role="dialog" style="width:80%; max-width:80%;">
		<div class="fd-modal__content" role="document">
			<header class="fd-modal__header">
				<h1 class="fd-modal__title">Luigi Config</h1>
				<button class="fd-button--light fd-modal__close" on:click="{closeConfig}"></button>
			</header>
			<div class="fd-modal__body_nostyle">
				<div id="editor"></div>
			</div>
			<footer class="fd-modal__footer">
				<div class="fd-modal__actions">
					<button class="fd-button--light" on:click="{clearConfig}">Clear</button>
					<button class="fd-button--light" on:click="{resetConfig}">Reset</button>
					<button class="fd-button" on:click="{saveConfig}">Apply</button>
					<button class="fd-button--light" on:click="{closeConfig}">Cancel</button>
				</div>
			</footer>
		</div>
	</div>
</div>

<div class="fiddle-toolbar">
	<div class="fd-action-bar">
		<div class="fd-action-bar__header">
			<img alt="" src="./img/luigi.png"> <span class="lui-version"> powered by Luigi v{luigiVersion}</span>
			<span>
				<a class="fd-link" href="https://www.sap.com/about/legal/privacy.html" target="_blank">Privacy Policy</a>
		<a class="fd-link" href="https://www.sap.com/about/legal/impressum.html" target="_blank">Legal</a>
			</span>
		</div>
		<div class="fd-action-bar__actions">
			<button class="fd-button--standard btn-primary" on:click="{openConfig}">Modify Config</button>
			<button class="fd-button--standard btn-primary" on:click="{hide}">Hide</button>
		</div>
	</div>
</div>