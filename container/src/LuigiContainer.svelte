<svelte:options
  customElement={{
    tag: null,
    shadow: 'none',
    props: {
      viewurl: { type: 'String', reflect: false, attribute: 'viewurl' },
      deferInit: { type: 'Boolean', attribute: 'defer-init' },
      noShadow: { type: 'Boolean', attribute: 'no-shadow' },
      context: { type: 'String', reflect: false, attribute: 'context' },
      label: { type: 'String', reflect: false, attribute: 'label' },
      webcomponent: { type: 'String', reflect: false, attribute: 'webcomponent' },
      locale: { type: 'String', reflect: false, attribute: 'locale' },
      theme: { type: 'String', reflect: false, attribute: 'theme' },
      activeFeatureToggleList: { type: 'Array', reflect: false, attribute: 'active-feature-toggle-list' },
      skipInitCheck: { type: 'Boolean', reflect: false, attribute: 'skip-init-check' },
      nodeParams: { type: 'Object', reflect: false, attribute: 'node-params' },
      userSettings: { type: 'Object', reflect: false, attribute: 'user-settings' },
      anchor: { type: 'String', reflect: false, attribute: 'anchor' },
      searchParams: { type: 'Object', reflect: false, attribute: 'search-params' },
      pathParams: { type: 'Object', reflect: false, attribute: 'path-params' },
      clientPermissions: { type: 'Object', reflect: false, attribute: 'client-permissions' },
      dirtyStatus: { type: 'Boolean', reflect: false, attribute: 'dirty-status' },
      hasBack: { type: 'Boolean', reflect: false, attribute: 'has-back' },
      documentTitle: { type: 'String', reflect: false, attribute: 'document-title' },
      allowRules: { type: 'Array', reflect: false, attribute: 'allow-rules' },
      sandboxRules: { type: 'Array', reflect: false, attribute: 'sandbox-rules' },
      authData: { type: 'Object', reflect: false, attribute: 'auth-data' }
    },
    extend: customElementConstructor => {
      let notInitFn = name => {
        return () => console.warn(name + " can't be called on luigi-container before its micro frontend is attached to the DOM.");
      };

      return class extends customElementConstructor {
        sendCustomMessage = notInitFn('sendCustomMessage');
        updateContext = notInitFn('updateContext');
        closeAlert = notInitFn('closeAlert');
        attributeChangedCallback(name, oldValue, newValue) {
          if (this.containerInitialized) {
            if (name === 'context') {
              this.updateContext(JSON.parse(newValue));
            }
            if (name === 'auth-data') {
              ContainerAPI.updateAuthData(this.iframeHandle, JSON.parse(newValue));
            }
          }
        }
        getNoShadow(){
          return this.hasAttribute('no-shadow') || this.noShadow
        }
      };
    }
  }}
/>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { containerService } from './services/container.service';
  import { WebComponentService } from './services/webcomponents.service';
  import { ContainerAPI } from './api/container-api';
  import { Events } from './constants/communication';
  import { GenericHelperFunctions } from './utilities/helpers';
  import { getAllowRules } from './services/iframe-helpers';

  export let viewurl: string;
  export let context: string;
  export let label: string;
  export let webcomponent: any;
  export let deferInit: boolean;
  export let noShadow: Boolean;
  export let locale: string;
  export let theme: string;
  export let activeFeatureToggleList: string[];
  export let skipInitCheck: boolean;
  export let nodeParams: any;
  export let searchParams: any;
  export let pathParams: any;
  export let clientPermissions: any;
  export let dirtyStatus: boolean;
  export let hasBack: boolean;
  export let documentTitle: string;
  export let allowRules: string[];
  export let sandboxRules: string[];

  export let userSettings: any;
  export let anchor: string;
  export let authData: any;

  const iframeHandle:
    | {
        iframe: HTMLIFrameElement;
      }
    | any = {};
  let mainComponent: HTMLElement;

  let containerInitialized = false;

  const webcomponentService = new WebComponentService();

  // Only needed for get rid of "unused export property" svelte compiler warnings
  export const unwarn = () => {
    return (
      locale &&
      theme &&
      activeFeatureToggleList &&
      nodeParams &&
      searchParams &&
      pathParams &&
      clientPermissions &&
      userSettings &&
      anchor &&
      authData &&
      dirtyStatus &&
      hasBack &&
      documentTitle &&
      allowRules &&
      sandboxRules &&
      noShadow
    );
  };

  const initialize = (thisComponent: any) => {
    if (!containerInitialized) {
      thisComponent.sendCustomMessage = (id: string, data?: any) => {
        ContainerAPI.sendCustomMessage(
          id,
          thisComponent.getNoShadow() ? thisComponent : mainComponent,
          !!webcomponent,
          iframeHandle,
          data
        );
      };

      thisComponent.updateContext = (contextObj: any, internal?: any) => {
         if (webcomponent) {
          (thisComponent.getNoShadow() ? thisComponent : mainComponent)._luigi_mfe_webcomponent.context = contextObj;
        } else {
          ContainerAPI.updateContext(contextObj, internal, iframeHandle);
        }
      };

      thisComponent.closeAlert = (id: any, dismissKey: any) => {
        ContainerAPI.closeAlert(id, dismissKey, iframeHandle);
      };

      containerService.registerContainer(thisComponent);
      webcomponentService.thisComponent = thisComponent;

      const ctx = GenericHelperFunctions.resolveContext(context);
      if (webcomponent && webcomponent != 'false') {
        if(!thisComponent.getNoShadow()){
          mainComponent.innerHTML=''
          const shadow = thisComponent.attachShadow({ mode: "open"});
          shadow.append(mainComponent);
        }else{
          //removing mainComponent
          thisComponent.innerHTML = '';
        }
        const webComponentValue = GenericHelperFunctions.checkWebcomponentValue(webcomponent);
        webcomponentService.renderWebComponent(
          viewurl,
          thisComponent.getNoShadow() ? thisComponent : mainComponent,
          ctx,
          typeof webComponentValue === 'object' ? { webcomponent: webComponentValue } : {}
        );
      }else{
        if(!thisComponent.getNoShadow()){
          //removeing mainComponent
          thisComponent.innerHTML='';
          const shadow = thisComponent.attachShadow({ mode: "open"});
          shadow.append(mainComponent);
        }
      }
      if (skipInitCheck) {
        thisComponent.initialized = true;
        setTimeout(() => {
          webcomponentService.dispatchLuigiEvent(Events.INITIALIZED, {});
        });
      } else if (webcomponent) {
        (thisComponent.getNoShadow() ? thisComponent : mainComponent).addEventListener('wc_ready', () => {
          if (!(thisComponent.getNoShadow() ? thisComponent : (mainComponent as any))._luigi_mfe_webcomponent?.deferLuigiClientWCInit) {
            thisComponent.initialized = true;
            webcomponentService.dispatchLuigiEvent(Events.INITIALIZED, {});
          }
        });
      }
      containerInitialized = true;
      thisComponent.containerInitialized = true;
    }
  };

  onMount(async () => {
    const thisComponent: any = mainComponent.parentNode;
    thisComponent.iframeHandle = iframeHandle;
    thisComponent.init = () => {
      initialize(thisComponent);
    };
    if (!deferInit) {
      initialize(thisComponent);
    }
  });

  onDestroy(async () => {});
</script>

<main bind:this={mainComponent} class={webcomponent ? undefined : 'lui-isolated'}>
  {#if containerInitialized}
    {#if !webcomponent || webcomponent === 'false'}
    <style>
      main.lui-isolated,
      .lui-isolated iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    
      main.lui-isolated {
        line-height: 0;
      }
    </style>
      <iframe
        bind:this={iframeHandle.iframe}
        src={viewurl}
        title={label}
        allow={getAllowRules(allowRules)}
        sandbox={sandboxRules ? sandboxRules.join(' ') : undefined}
      />
    {/if}
  {/if}
</main>
