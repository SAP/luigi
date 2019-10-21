// Methods related to managing the view in the iframe.
// Please consider adding any new methods to 'iframe-helpers' if they don't require anything from this file.
import {
  GenericHelpers,
  IframeHelpers,
  RoutingHelpers
} from '../utilities/helpers';
import { LuigiConfig, LuigiI18N } from '../core-api';

class IframeClass {
  constructor() {
    this.iframeNavFallbackTimeout = 2000;
    this.timeoutHandle;
  }

  getActiveIframe(node) {
    const children = [...node.children];
    return children.find(GenericHelpers.isElementVisible);
  }

  setActiveIframeToPrevious(node) {
    const iframesInDom = IframeHelpers.getMainIframes();
    const preservedViews = this.getPreservedViewsInDom(iframesInDom);
    if (preservedViews.length === 0) {
      return;
    }
    const activeIframe = this.getActiveIframe(node);
    IframeHelpers.hideElementChildren(node);
    if (activeIframe) {
      node.removeChild(activeIframe);
    }
    //unmark next preserved view as pv
    preservedViews[0].pv = undefined;
    preservedViews[0].style.display = 'block';
  }

  removeInactiveIframes(node) {
    const children = Array.from(node.children);
    children.forEach(child => {
      if (!GenericHelpers.isElementVisible(child) && !child.vg) {
        node.removeChild(child);
      }
    });
  }

  hasIsolatedView(isolateView, isSameViewGroup, isolateAllViews) {
    return (
      isolateView ||
      (isolateAllViews && !(isolateView === false) && !isSameViewGroup)
    );
  }

  removeIframe(iframe, node) {
    const children = Array.from(node.children);
    children.forEach(child => {
      if (child === iframe) {
        node.removeChild(child);
      }
    });
  }

  getPreservedViewsInDom(iframes) {
    return iframes.filter(iframe => iframe.pv);
  }

  getAllViewGroupSettings() {
    return LuigiConfig.getConfigValue('navigation.viewGroupSettings');
  }

  getViewGroupSettings(viewGroup) {
    const viewGroupSettings = this.getAllViewGroupSettings();
    if (viewGroup && viewGroupSettings && viewGroupSettings[viewGroup]) {
      return viewGroupSettings[viewGroup];
    } else {
      return {};
    }
  }

  canCache(viewGroup) {
    const vgSettings = this.getViewGroupSettings(viewGroup);
    return vgSettings && vgSettings.preloadUrl;
  }

  notifyInactiveIframe(iframe) {
    const message = {
      msg: 'luigi-client.inactive-microfrontend',
      context: JSON.stringify({}),
      nodeParams: JSON.stringify({}),
      pathParams: JSON.stringify({}),
      internal: JSON.stringify({
        currentLocale: LuigiI18N.getCurrentLocale()
      })
    };
    IframeHelpers.sendMessageToIframe(iframe, message);
  }

  switchActiveIframe(container, newActiveIframe, removeCurrentActive) {
    const currentActiveIframe = this.getActiveIframe(container);
    if (currentActiveIframe !== newActiveIframe) {
      let newActiveFound = false;
      const children = Array.from(container.children);
      children.forEach(child => {
        if (child === currentActiveIframe) {
          if (removeCurrentActive) {
            container.removeChild(child);
          } else {
            child.style.display = 'none';
            const vgSettings = this.getViewGroupSettings(child.vg);
            if (vgSettings) {
              if (vgSettings.preloadUrl) {
                const message = {
                  msg: 'luigi.navigate',
                  viewUrl: vgSettings.preloadUrl,
                  context: JSON.stringify({}),
                  nodeParams: JSON.stringify({}),
                  pathParams: JSON.stringify({}),
                  internal: JSON.stringify({
                    currentLocale: LuigiI18N.getCurrentLocale()
                  })
                };
                IframeHelpers.sendMessageToIframe(child, message);
              }
              console.log('notifyInactiveIframe, switchActiveIframe');
              this.notifyInactiveIframe(child);
            }
          }
        }
        if (child === newActiveIframe) {
          newActiveFound = true;
        }
      });
      if (newActiveIframe) {
        newActiveIframe.style.display = 'block';
        if (!newActiveFound) {
          container.insertBefore(newActiveIframe, container.firstChild);
        }
      }
    }
    return newActiveIframe;
  }

  navigateIframe(config, component, node) {
    clearTimeout(this.timeoutHandle);
    const componentData = component.get();
    let viewUrl = componentData.viewUrl;
    if (viewUrl) {
      viewUrl = RoutingHelpers.substituteViewUrl(viewUrl, componentData);
    }
    const isSameViewGroup = IframeHelpers.isSameViewGroup(config, component);
    const previousViewIsolated = this.hasIsolatedView(
      componentData.previousNodeValues.isolateView,
      isSameViewGroup,
      config.isolateAllViews
    );
    const nextViewIsolated = this.hasIsolatedView(
      componentData.isolateView,
      isSameViewGroup,
      config.isolateAllViews
    );
    const canReuseIframe = IframeHelpers.canReuseIframe(config, component);
    let activeIframe = this.getActiveIframe(node);

    const iframes = IframeHelpers.getMainIframes();
    const goBackStack = this.getPreservedViewsInDom(iframes);
    let firstInGoBackStack = undefined;
    let pvSituation = false;
    if (goBackStack.length > 0) {
      firstInGoBackStack = goBackStack.shift();
      if (firstInGoBackStack === activeIframe) {
        pvSituation = true;
        activeIframe = undefined;
        config.iframe = undefined;
      }
    }

    if (!pvSituation && !component.get().isNavigateBack) {
      // if previous view must be isolated
      if (activeIframe && previousViewIsolated) {
        activeIframe = this.switchActiveIframe(node, undefined, true);
      }

      // if next view must be isolated
      if (activeIframe && nextViewIsolated) {
        activeIframe = this.switchActiveIframe(
          node,
          undefined,
          !activeIframe.vg
        );
      }

      // if next view is not isolated we can pick a iframe with matching viewGroup from the pool
      let targetIframe;
      if (!nextViewIsolated && componentData.viewGroup) {
        const iframes = IframeHelpers.getMainIframes();
        const sameViewGroupIframes = iframes.filter(iframe => {
          return iframe.vg === componentData.viewGroup;
        });
        if (sameViewGroupIframes.length > 0) {
          targetIframe = sameViewGroupIframes[0];

          // make the targetIframe the new active iframe
          activeIframe = this.switchActiveIframe(
            node,
            targetIframe,
            activeIframe && !activeIframe.vg
          );
        }
      }

      if (activeIframe && !targetIframe) {
        if (activeIframe.vg) {
          activeIframe = this.switchActiveIframe(node, undefined, false);
        } else if (!canReuseIframe) {
          activeIframe = this.switchActiveIframe(node, undefined, true);
        }
      }

      config.iframe = activeIframe;
    }

    if (!config.iframe) {
      // preserveView, hide other frames, else remove
      if (pvSituation) {
        this.notifyInactiveIframe(node.firstChild);
        IframeHelpers.hideElementChildren(node);
      } else {
        IframeHelpers.removeElementChildren(node);
      }
      if (componentData.viewUrl) {
        if (
          GenericHelpers.getConfigValueFromObject(
            componentData,
            'currentNode.loadingIndicator.enabled'
          ) !== false
        ) {
          component.set({ showLoadingIndicator: true });
        } else {
          component.set({ showLoadingIndicator: false });
        }
        config.navigateOk = undefined;
        const canCache =
          componentData.viewGroup &&
          !nextViewIsolated &&
          this.canCache(componentData.viewGroup);
        config.iframe = IframeHelpers.createIframe(
          viewUrl,
          canCache ? componentData.viewGroup : undefined,
          component.get().currentNode
        );

        node.insertBefore(config.iframe, node.firstChild);

        if (config.builderCompatibilityMode) {
          config.iframe.addEventListener('load', () => {
            const message = ['init', JSON.stringify(componentData.context)];
            IframeHelpers.sendMessageToIframe(config.iframe, message);
          });
        }
      }
    } else {
      component.set({ showLoadingIndicator: false });
      const goBackContext = component.get().goBackContext;
      config.iframe.style.display = 'block';
      config.iframe.luigi.nextViewUrl = viewUrl;
      config.iframe.luigi.nextClientPermissions = component.get().currentNode.clientPermissions;
      config.iframe['vg'] = this.canCache(componentData.viewGroup)
        ? componentData.viewGroup
        : undefined;
      const message = {
        msg: 'luigi.navigate',
        viewUrl: viewUrl,
        context: JSON.stringify(
          Object.assign({}, componentData.context, { goBackContext })
        ),
        nodeParams: JSON.stringify(Object.assign({}, componentData.nodeParams)),
        pathParams: JSON.stringify(Object.assign({}, componentData.pathParams)),
        internal: JSON.stringify(component.prepareInternalData(config))
      };
      IframeHelpers.sendMessageToIframe(config.iframe, message);
      // clear goBackContext and reset navigateBack after sending it to the client
      component.set({ goBackContext: undefined, isNavigateBack: false });

      /**
       * check if luigi responded
       * if not, callback again to replace the iframe
       */
      this.timeoutHandle = setTimeout(() => {
        if (config.navigateOk) {
          config.navigateOk = undefined;
        } else {
          config.iframe = undefined;
          console.info(
            'navigate: luigi-client did not respond, using fallback by replacing iframe'
          );
          this.navigateIframe(config, component, node);
        }
      }, this.iframeNavFallbackTimeout);
    }
  }
}

export const Iframe = new IframeClass();
