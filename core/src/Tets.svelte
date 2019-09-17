<script>
  import Alerts from './Alerts.svelte';
  import ConfirmationModal from './ConfirmationModal.svelte';
  import Modal from './Modal.svelte';
  import Backdrop from './Backdrop.svelte';
  import { afterUpdate, onMount, getContext, setContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import { CSS_BREAKPOINTS } from './utilities/constants';
  import { GenericHelpers, StateHelpers, RoutingHelpers, IframeHelpers, AuthHelpers } from './utilities/helpers'
  import { LuigiI18N, LuigiConfig, LuigiElements } from './core-api';
  import { Navigation } from './navigation/services/navigation';
  import { Routing } from './services/routing';
  import { Iframe } from './services/iframe';
  import { ViewGroupPreloading } from './services/preloading';
  import { MessagesListeners } from './services/messages-listeners';

  export let store;

	let name = 'tets';
	let showLoadingIndicator = false;

  let mfSplitView = {
    displayed: false
  };

  /// MFs
  let modalIframe;
  let modalIframeData;
  let modal;
  let splitViewIframe;
  let splitViewIframeData;
  let splitView;
  let context;
  let nodeParams;
  let pathParams;
  let urlParamsRaw;
  let currentNode;
  let viewUrl;
  let viewGroup;
  let isolateView;
  let previousNodeValues;
  let isNavigateBack = false;
  let goBackContext;
  let navigationPath;
  let preservedViews = [
     // {
     //     path: '/project/p2/settings',
     //     nextPath: '/project/p2',
     //     context: {}
     //     iframe: Element
     // }
   ];
  let unsavedChanges = {
    isDirty: false,
    persistUrl: null
  };

  const prepareInternalData = (config) => {
    const internalData = {
      isNavigateBack: isNavigateBack,
      viewStackSize: preservedViews.length,
      currentLocale: LuigiI18N.getCurrentLocale(),
      clientPermissions: config.iframe.luigi.nextViewUrl
        ? config.iframe.luigi.nextClientPermissions
        : config.iframe.luigi.clientPermissions
    };
    IframeHelpers.specialIframeTypes
      .map(o => o.iframeConfigKey)
      .forEach(key => {
        internalData[key] = config[key] || false;
      });
    return internalData;
  };

  const sendContextToClient = (config, goBackContext = {}) => {
    if (!config.iframe) {
      console.info('iframe does not exist, not able to send context.');
      return;
    }
    const message = {
      msg: 'luigi.init',
      context: JSON.stringify(
        Object.assign(
          {},
          config.context || context,
          goBackContext
        )
      ),
      nodeParams: JSON.stringify(
        Object.assign({}, config.nodeParams || nodeParams)
      ),
      pathParams: JSON.stringify(
        Object.assign({}, config.pathParams || pathParams)
      ),
      internal: JSON.stringify(prepareInternalData(config)),
      authData: AuthHelpers.getStoredAuthData()
    };
    IframeHelpers.sendMessageToIframe(config.iframe, message);
  };

  const sendAuthDataToClient = authData => {
    const message = {
      msg: 'luigi.auth.tokenIssued',
      authData
    };
    IframeHelpers.broadcastMessageToAllIframes(message);
  };

  const addPreserveView = (data, config) => {
    if (data.params.preserveView || data.params.viewgroup) {
      const nextPath = buildPath(data.params);
      $: preservedViews.push({
        path: Routing.getNodePath(currentNode, urlParamsRaw),
        nextPath: nextPath.startsWith('/') ? nextPath : '/' + nextPath,
        context
      });
      //mark iframe with pv if there is a preserved view situation
      config.iframe['pv'] = 'pv';
    }
  };

  const handleNavigation = (data, config) => {
    let path = buildPath(data.params);
    path = GenericHelpers.addLeadingSlash(path);

    addPreserveView(data, config);
    Routing.navigateTo(path); //navigate to the raw path. Any errors/alerts are handled later
  };

  const removeQueryParams = str => str.split('?')[0];

  const isValidBackRoute = (preservedViews, routeHash) => {
    if (preservedViews.length === 0) {
      return false;
    }
    // we're only checking the previous goBack state and
    // compare it with the new route
    const routePath = routeHash.startsWith('/') ? routeHash : `/${routeHash}`;
    const lastPreservedView = [...preservedViews].pop();
    const paths = [
      removeQueryParams(lastPreservedView.path),
      removeQueryParams(lastPreservedView.nextPath)
    ];
    return paths.includes(removeQueryParams(routePath));
  };

  const enableRouting = (node, config) => {
    const component = {
      get: () => { return {
          unsavedChanges,
          hideNav,
          viewUrl,
          nodeParams,
          viewGroup,
          urlParamsRaw,
          currentNode,
          navigationPath,
          context,
          pathParams,
          hideSideNav,
          isolateView,
          previousNodeValues,
        }
      },
      set: (obj) => {
        if (obj) {
          Object.getOwnPropertyNames(obj).forEach(prop => {
            if (prop === 'hideNav') {
              hideNav = obj.hideNav;
            } else if (prop === 'viewUrl') {
              viewUrl = obj.viewUrl;
            } else if (prop === 'nodeParams') {
              nodeParams = obj.nodeParams;
            } else if (prop === 'viewGroup') {
              viewGroup = obj.viewGroup;
            } else if (prop === 'urlParamsRaw') {
              urlParamsRaw = obj.urlParamsRaw;
            } else if (prop === 'currentNode') {
              currentNode = obj.currentNode;
            } else if (prop === 'navigationPath') {
              navigationPath = obj.navigationPath;
            } else if (prop === 'context') {
              context = obj.context;
            } else if (prop === 'pathParams') {
              pathParams = obj.pathParams;
            } else if (prop === 'hideSideNav') {
              hideSideNav = obj.hideSideNav;
            } else if (prop === 'isolateView') {
              isolateView = obj.isolateView;
            } else if (prop === 'previousNodeValues') {
              previousNodeValues = obj.previousNodeValues;
            }
          });
        }
      },
      shouldShowUnsavedChangesModal,
      showAlert,
      prepareInternalData
    };

    // initial route handling
    StateHelpers.doOnStoreChange(
      store,
      () => {
        LuigiConfig._configModificationTimestamp = new Date();
        const currentPath = Routing.getCurrentPath();
        Routing.handleRouteChange(currentPath, component, node, config);
      },
      ['navigation.nodes']
    );

    // subsequential route handling
    RoutingHelpers.addRouteChangeListener(path => {
      const pv = preservedViews;
      if (!isValidBackRoute(pv, path)) {
        preservedViews = [];
        Iframe.removeInactiveIframes(node);
      }

      closeModal();
      closeSplitView();

      Routing.handleRouteChange(path, component, node, config);
    });
  };

  const getSubPath = (node) => {
    return GenericHelpers.replaceVars(
      Routing.getNodePath(node),
      pathParams,
      ':',
      false
    );
  };

  const buildPath = (params) => {
    let path = params.link;
    if (params.fromClosestContext) {
      // from the closest navigation context
      const node = [...navigationPath]
        .reverse()
        .find(n => n.navigationContext && n.navigationContext.length > 0);
      path = Routing.concatenatePath(getSubPath(node), params.link);
    } else if (params.fromContext) {
      // from a given navigation context
      const navigationContext = params.fromContext;
      const node = navigationPath.find(n => navigationContext === n.navigationContext);
      path = Routing.concatenatePath(getSubPath(node), params.link);
    } else if (params.relative) {
      // relative
      path = Routing.concatenatePath(
        getSubPath(currentNode),
        params.link
      );
    }

    if (params.nodeParams && Object.keys(params.nodeParams).length) {
      path += '?';
      Object.entries(params.nodeParams).forEach(entry => {
        path +=
          encodeURIComponent(
            RoutingHelpers.getContentViewParamPrefix() + entry[0]
          ) +
          '=' +
          encodeURIComponent(entry[1]) +
          '&';
      });
    }
    return path;
  };

  setContext('handleNavigation', handleNavigation);

  const openSplitView = (nodepath, settings) => {
    //TODO SplitViewSvc.open(this, nodepath, settings);
  };

  const closeSplitView = () => {
    //TODO SplitViewSvc.close(this);
  };

	/// RESIZING

	let hideNav;
	let hideSideNav;
	let previousWindowWidth;

  const closeLeftNav = () => {
    document.body.classList.remove('lui-leftNavToggle');
  };

	const onResize = () => {
    const isMobileToDesktop =
      window.innerWidth >= CSS_BREAKPOINTS.desktopMinWidth &&
      previousWindowWidth < CSS_BREAKPOINTS.desktopMinWidth;
    const isDesktopToMobile =
      window.innerWidth < CSS_BREAKPOINTS.desktopMinWidth &&
      previousWindowWidth >= CSS_BREAKPOINTS.desktopMinWidth;

    if (isMobileToDesktop || isDesktopToMobile) {
      closeLeftNav();
    }
    previousWindowWidth = window.innerWidth;
  };

	//// ALERTS

	let alerts =
  	 [
  	  {
  	    settings: {
  	      text: `Ut enim ad minim veniam, {goToHome} quis nostrud exercitation
            ullamco {relativePath} laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor {goToOtherProject} in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur!?`,
          links: {
            goToHome: { text: 'homepage', url: '/overview' },
            goToOtherProject: { text: 'other project', url: '/projects/pr2' },
            relativePath: { text: 'relative hide side nav', url: 'hideSideNav' }
          },
  	      type: 'warning',
  	      id: '123456',
  	    }
  	  }
  	];

  const getAlertWithId = (alertQueue, id) => {
    if (!alertQueue || !alertQueue.length) return;
    return alertQueue.filter(alert => alert.settings.id === id)[0];
  };

  let showAlert = (settings, openFromClient = false) => {
    const currentAlerts = alerts;

    if (!settings.id) {
      //generate the ID in case it hasn't came from an old version of LuigiClient
      settings.id = GenericHelpers.getRandomId();
    }

    if (
      settings.id &&
      currentAlerts &&
      getAlertWithId(currentAlerts, settings.id)
    ) {
      console.error(
        `The alert with id '${
          settings.id
        }' already exists in a queue, therefore it won't be displayed `
      );
      return Promise.reject();
    }

    if (settings.closeAfter) {
      setTimeout(() => {
        if (getAlertWithId(alerts, settings.id)) {
          //check if alert hasn't already been closed manually
          handleAlertDismiss(settings.id);
        }
      }, settings.closeAfter);
    }

    return new Promise((resolve, reject) => {
      alerts = [
        ...(currentAlerts || []),
        {
          displayed: true,
          settings,
          openFromClient,
          promise: { resolve }
        }
      ]
    });
  };

	const handleAlertDismiss = (event) => {
	  const id = event.detail.id;
    const alert = getAlertWithId(alerts, id);

    if (!alert) {
      console.error(
        'An unexisting alert has been dismissed.',
        alerts,
        id
      );
      return;
    }

    const openFromClient = alert.openFromClient;

    alerts = alerts.filter(a => a.settings.id !== id);
    /*TODO
    if (openFromClient) {
      const iframe = Iframe.getActiveIframe(this.get().contentNode);
      const message = {
        msg: 'luigi.ux.alert.hide',
        id
        //TODO: update docu for this param
      };
      IframeHelpers.sendMessageToIframe(iframe, message);
    }
    */
 };

 //// CONFIRMATION MODAL

  let confirmationModal;

  const resetConfirmationModalData = () => {
    confirmationModal = {
      displayed: false,
      content: {},
      openFromClient: false,
      promise: null
    };
  };

  resetConfirmationModalData();

  const showModal = (settings, openFromClient = false) => {
    return new Promise((resolve, reject) => {
      confirmationModal = {
        displayed: true,
        settings,
        openFromClient,
        promise: { resolve, reject }
      }
    });
  };

  const handleModalResult = (result) => {
    const { promise, openFromClient } = confirmationModal;

    resetConfirmationModalData();

    if (result) {
      promise.resolve();
    } else {
      promise.reject();
    }

    /* TODO
    if (openFromClient) {
      const iframe = Iframe.getActiveIframe(this.get().contentNode);
      const message = {
        msg: 'luigi.ux.confirmationModal.hide',
        data: { confirmed: result }
      };
      IframeHelpers.sendMessageToIframe(iframe, message);
    }
    */
  };

  const shouldShowUnsavedChangesModal = (source) => {
    if (
      //TODO GenericHelpers.canComponentHandleModal(this) &&
      unsavedChanges.dirtySet
    ) {
      if (source) {
        return unsavedChanges.dirtySet.has(source);
      } else if (unsavedChanges.dirtySet.size > 0) {
        return true;
      }
    }
    return false;
 };

  const showUnsavedChangesModal = () => {
    return showModal({
      header: LuigiI18N.getTranslation('luigi.unsavedChangesAlert.header'),
      body: LuigiI18N.getTranslation('luigi.unsavedChangesAlert.body'),
      buttonDismiss: LuigiI18N.getTranslation('luigi.button.dismiss'),
      buttonConfirm: LuigiI18N.getTranslation('luigi.button.confirm')
    });
  };

  const getUnsavedChangesModalPromise = (source) => {
    return new Promise(resolve => {
      if (shouldShowUnsavedChangesModal(source)) {
        showUnsavedChangesModal().then(
          () => {
            if (
              unsavedChanges &&
              unsavedChanges.dirtySet
            ) {
              if (source) {
                unsavedChanges.dirtySet.delete(source);
              } else {
                unsavedChanges.dirtySet.clear();
              }
            }
            resolve();
          },
          () => {}
        );
      } else {
        resolve();
      }
    });
  };

  setContext('getUnsavedChangesModalPromise', getUnsavedChangesModalPromise);

  //// MICRO-FRONTEND MODAL

  let mfModal;

  const resetMicrofrontendModalData = () => {
    mfModal = {
      displayed: false,
      settings: {}
    };
  };

  resetMicrofrontendModalData();

  const getModalIframe = () => {
    return getContext('modalIframe');
  };

  const openViewInModal = async (nodepath, modalSettings) => {
    const { nodeObject } = await Navigation.extractDataFromPath(nodepath);
    if (await Navigation.shouldPreventNavigation(nodeObject)) {
      return;
    }
    mfModal = {
      displayed: true,
      nodepath,
      modalSettings
    }
  };

  const closeModal = () => {
    const modalIframe = getModalIframe();
    if (modalIframe) {
      getUnsavedChangesModalPromise(
        modalIframe.contentWindow
      ).then(() => {
        mfModal = {
          displayed: false
        }
      });
    }
  };

  function init(node) {
    console.log("INIT: ", node);

    const isolateAllViews = LuigiConfig.getConfigValue(
      'navigation.defaults.isolateView'
    );
    const config = {
      iframe: null,
      navigateOk: null,
      builderCompatibilityMode: Boolean(window.builderCompatibilityMode),
      isolateAllViews
    };
    LuigiI18N.addCurrentLocaleChangeListener(locale => {
      const message = {
        msg: 'luigi.current-locale-changed',
        currentLocale: locale
      };
      IframeHelpers.broadcastMessageToAllIframes(message);
    });

    window.addEventListener('popstate', async e => {
      const alertQueue = alerts;
      if (!alertQueue || !alertQueue.length) return;

      const updatedAlerts = alertQueue
        .map(a => {
          if (
            a &&
            !a.openFromClient &&
            typeof a.settings.ttl === 'number'
          ) {
            //alert has some TTL set
            if (a.settings.ttl === 0) {
              //the TTL value dropped down to 0, remove this alert
              return null;
            } else {
              //TTL is not 0, reduce it
              a.settings.ttl--;
            }
          }
          //return either unchanged Alert or the one with reduced TTL value
          return a;
        })
        .filter(a => a); //remove empty alerts from array

      alerts = updatedAlerts;
    });

    window.addEventListener('message', async e => {
      const iframe = IframeHelpers.getValidMessageSource(e);
      if (!iframe) return;

      if ('custom' === e.data.msg) {
        const customMessagesListeners =
          LuigiConfig.getConfigValue(
            'communication.customMessagesListeners'
          ) || {};
        const message = MessagesListeners.convertCustomMessageInternalToUser(
          e.data
        );
        const customMessageListener = customMessagesListeners[message.id];
        if (typeof customMessageListener === 'function') {
          const microfrontend = LuigiElements.getMicrofrontends().find(
            mf => mf.id === e.source.frameElement.luigi.id
          );

          customMessageListener(
            message,
            microfrontend,
            GenericHelpers.removeInternalProperties(
              iframe.luigi.currentNode
            )
          );
        }
      }

      if ('luigi.navigate.ok' === e.data.msg) {
        iframe.luigi.viewUrl = iframe.luigi.nextViewUrl;
        iframe.luigi.nextViewUrl = '';
        iframe.luigi.clientPermissions = iframe.luigi.nextClientPermissions;
        delete iframe.luigi.nextClientPermissions;
        config.navigateOk = true;

        ViewGroupPreloading.preload();
      }

      if ('luigi.get-context' === e.data.msg) {
        const specialIframeProps = {
          modalIframe,
          modalIframeData,
          modal,
          splitViewIframe,
          splitViewIframeData,
          splitView
        };
        const specialIframeMessageSource = IframeHelpers.specialIframeTypes.filter(
          typ => IframeHelpers.isMessageSource(e, specialIframeProps[typ.iframeKey])
        );
        if (specialIframeMessageSource.length) {
          specialIframeMessageSource.forEach(typ => {
            let ctx = specialIframeProps[typ.dataKey].context;
            const config = {
              ...config,
              iframe: specialIframeProps[typ.iframeKey],
              context: ctx,
              pathParams: specialIframeProps[typ.dataKey].pathParams,
              nodeParams: specialIframeProps[typ.dataKey].nodeParams,
              modal: typ.iframeKey.startsWith('modal'),
              splitView: typ.iframeKey.startsWith('splitView')
            };
            sendContextToClient(config, {});
          });
        } else if (
          config.iframe &&
          IframeHelpers.isMessageSource(e, config.iframe)
        ) {
          sendContextToClient(config, {});

          const loadingIndicatorAutoHideEnabled =
             !currentNode || !currentNode.loadingIndicator || !currentNode.loadingIndicator.hideAutomatically !== false;
          if (loadingIndicatorAutoHideEnabled) {
            showLoadingIndicator = false;
          }

          ViewGroupPreloading.preload();
        } else if (iframe.luigi.preloading) {
          // set empty context to an existing but inactive iframe; this is a valid use case (view group pre-loading)
          sendContextToClient(
            {
              iframe: iframe,
              context: {},
              nodeParams: {},
              pathParams: {},
              internal: {}
            },
            {}
          );
        }
        ViewGroupPreloading.viewGroupLoaded(iframe);
      }

      if ('luigi.show-loading-indicator' === e.data.msg) {
        showLoadingIndicator = true;
      }

      if ('luigi.hide-loading-indicator' === e.data.msg) {
        showLoadingIndicator = false;
      }

      if ('luigi.navigation.open' === e.data.msg) {
        isNavigateBack = false;
        if (e.data.params.modal !== undefined) {
          let path = buildPath(e.data.params);
          path = GenericHelpers.addLeadingSlash(path);
          contentNode = node;
          resetMicrofrontendModalData();
          openViewInModal(path, e.data.params.modal);
        } else if (e.data.params.splitView !== undefined) {
          let path = buildPath(e.data.params);
          path = GenericHelpers.addLeadingSlash(path);
          contentNode = node;
          mfSplitView = SplitViewSvc.getDefaultData().mfSplitView;

          openSplitView(path, e.data.params.splitView);
        } else {
          getUnsavedChangesModalPromise().then(() => {
            handleNavigation(e.data, config);
            closeModal();
            closeSplitView();
          });
        }
      }

      if ('luigi.navigation.back' === e.data.msg) {
        if (IframeHelpers.isMessageSource(e, modalIframe)) {
          closeModal();
          sendContextToClient(config, {
            goBackContext:
              e.data.goBackContext && JSON.parse(e.data.goBackContext)
          });
        } else if (
          IframeHelpers.isMessageSource(e, splitViewIframe)
        ) {
          closeSplitView();
          sendContextToClient(config, {
            goBackContext:
              e.data.goBackContext && JSON.parse(e.data.goBackContext)
          });
        } else {
          // go back: context from the view
          if (preservedViews && preservedViews.length) {
            getUnsavedChangesModalPromise().then(() => {
              // remove current active iframe and data
              Iframe.setActiveIframeToPrevious(node);
              const previousActiveIframeData = preservedViews.pop();
              // set new active iframe and preservedViews
              config.iframe = Iframe.getActiveIframe(node);
              isNavigateBack = true;
              preservedViews = preservedViews;
              goBackContext =
                  e.data.goBackContext && JSON.parse(e.data.goBackContext);
              // TODO: check if getNavigationPath or history pop to update hash / path
              handleNavigation(
                { params: { link: previousActiveIframeData.path } },
                config
              );
            });
          } else {
            if (e.data.goBackContext) {
              console.warn(
                `Warning: goBack() does not support goBackContext value. This is available only when using preserved views feature. Documentation: https://github.com/SAP/luigi/blob/master/docs/luigi-client-api.md#navigate`
              );
            }
            // TODO: does not work with default child node behavior, fixed by #216
            window.history.back();
          }
        }
      }

      if ('luigi.auth.tokenIssued' === e.data.msg) {
        sendAuthDataToClient(e.data.authData);
      }

      if ('luigi.navigation.pathExists' === e.data.msg) {
        const data = e.data.data;
        const path = buildPath(data);
        const pathData = await Navigation.getNavigationPath(
          LuigiConfig.getConfigValueAsync('navigation.nodes'),
          path
        );
        const message = {
          msg: 'luigi.navigation.pathExists.answer',
          data: {
            correlationId: data.id,
            pathExists: pathData.isExistingRoute
          }
        };
        IframeHelpers.sendMessageToIframe(iframe, message);
      }

      if ('luigi.set-page-dirty' === e.data.msg) {
        if (!unsavedChanges.dirtySet) {
          const dirtySet = new Set();
          dirtySet.add(e.source);
          unsavedChanges = {
            dirtySet: dirtySet
          };
        }
        unsavedChanges.persistUrl = window.location.href;
        if (e.data.dirty) {
          unsavedChanges.dirtySet.add(e.source);
        } else {
          unsavedChanges.dirtySet.delete(e.source);
        }
      }

      if ('luigi.ux.confirmationModal.show' === e.data.msg) {
        const settings = e.data.data.settings;
        contentNode = node;
        resetConfirmationModalData();
        showModal(settings, true).catch(() => {
          /* keep it to avoid runtime errors in browser console */
        });
      }

      if ('luigi.ux.alert.show' === e.data.msg) {
        const { settings } = e.data.data;

        if (!settings.text) {
          console.error(
            "Luigi Client alert: 'text' field for alert is empty or not present, therefore alert will not be displayed"
          );
          return;
        }
        contentNode = node;
        showAlert(settings, true).catch(() => {
          /* keep it to avoid runtime errors in browser console */
        });
      }

      if ('luigi.ux.set-current-locale' === e.data.msg) {
        if (
          iframe.luigi.clientPermissions &&
          iframe.luigi.clientPermissions.changeCurrentLocale
        ) {
          const { currentLocale } = e.data.data;
          if (currentLocale) {
            LuigiI18N.setCurrentLocale(currentLocale);
          }
        } else {
          console.error(
            'Current local change from client declined because client permission changeCurrentLocale is not set for this view.'
          );
        }
      }
    });

    // listeners are not automatically removed — cancel
    // them to prevent memory leaks
    // this.on('destroy', storeListener.cancel);

    enableRouting(node, config);

  }

  onMount(() => {

    setTimeout(() => {
       // openViewInModal('/anonymous', {});
       // showUnsavedChangesModal();
    }, 2000);

  });

  afterUpdate(() => {

  });

</script>

<svelte:window on:resize="{onResize}"/>
<div
  id="app"
  class="{hideNav? 'no-nav' : ''} {hideSideNav? 'no-side-nav' : ''}"
>

  <h1>Hello {name}!</h1>

  {#if confirmationModal.displayed}
    <ConfirmationModal
      settings="{confirmationModal.settings}"
      on:modalConfirm="{() => handleModalResult(true)}"
      on:modalDismiss="{() => handleModalResult(false)}"
    ></ConfirmationModal>
  {/if}

  {#if alerts && alerts.length}
    <Alerts alertQueue="{alerts}" on:alertDismiss="{handleAlertDismiss}"></Alerts>
  {/if}

  {#if mfModal.displayed}
    <Modal
      modalSettings="{mfModal.modalSettings}"
      nodepath="{mfModal.nodepath}"
      on:close="{closeModal}"
    ></Modal>
  {/if}

  <Backdrop>
    <div
      class="fd-page iframeContainer {mfSplitView.displayed?'lui-split-view':''} {mfSplitView.collapsed?'lui-collapsed':''}"
      use:init
    ></div>
    <!-- TODO {#if mfSplitView.displayed}
    <SplitView
      splitViewSettings="{mfSplitView.settings}"
      collapsed="{mfSplitView.collapsed}"
      nodepath="{mfSplitView.nodepath}"
    ></SplitView>
    {/if} -->
  </Backdrop>

  {#if showLoadingIndicator}
    <div
      in:fade="{{delay: 250, duration: 250}}"
      out:fade="{{duration: 250}}"
      class="fd-page spinnerContainer"
      aria-hidden="false"
      aria-label="Loading"
    >
      <div class="fd-spinner">
        <div></div>
      </div>
    </div>
  {/if}

</div>
