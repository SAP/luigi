// Methods related to view group preloading.
import { Iframe } from './iframe';
import { LuigiConfig } from '../core-api';
import { IframeHelpers } from '../utilities/helpers';

class ViewGroupPreloadingClass {
  constructor() {
    this.preloadBatchSize = 1;
    this.shouldPreload = false;
  }

  preloadViewGroups(batchSize = 3) {
    const preloadViewGroupsSetting = LuigiConfig.getConfigValue(
      'navigation.preloadViewGroups'
    );
    if ([false, 'false'].includes(preloadViewGroupsSetting)) {
      return;
    }
    const vgSettings = Iframe.getAllViewGroupSettings();
    if (!vgSettings) {
      return;
    }
    const iframeContainer = IframeHelpers.getIframeContainer();
    const iframes = IframeHelpers.getAllIframes();
    const now = new Date().getTime();
    const preloadingIframes = iframes.filter(
      iframe =>
        iframe.luigi &&
        iframe.luigi.preloading &&
        now - iframe.luigi.createdAt < 30000
    );
    if (preloadingIframes.length > 0) {
      console.debug('skipping view group preloading (busy)');
      return;
    }
    const existingVGs = iframes.map(iframe => iframe.vg).filter(Boolean);
    Object.entries(vgSettings)
      .filter(([name, _]) => !existingVGs.includes(name))
      .filter(([_, settings]) => settings && settings.preloadUrl)
      .filter((_, index) => index < batchSize)
      .forEach(([name, settings]) => {
        console.debug(
          'preloading view group ' + name + ' - ' + settings.preloadUrl
        );
        const iframe = IframeHelpers.createIframe(settings.preloadUrl, name);
        iframe.style.display = 'none';
        iframe.luigi.preloading = true;
        iframeContainer.appendChild(iframe);
      });
  }

  preload() {
    if (this.shouldPreload) {
      setTimeout(() => {
        this.preloadViewGroups(this.preloadBatchSize);
      });
    }
    this.shouldPreload = true;
  }

  viewGroupLoaded(iframe) {
    if (iframe.luigi.preloading) {
      // adapt batch size
      const preloadTime = new Date().getTime() - iframe.luigi.createdAt;
      let batchSize = 1;
      if (preloadTime < 500) {
        batchSize = 3;
      } else if (preloadTime < 1000) {
        batchSize = 2;
      }
      this.preloadBatchSize = batchSize;
      console.debug('preload batch size: ' + this.preloadBatchSize);

      // set iframe free after a delay
      setTimeout(
        () => {
          iframe.luigi.preloading = false;
        },
        this.preloadBatchSize > 2 ? 500 : 1000
      );
    }
  }
}

export const ViewGroupPreloading = new ViewGroupPreloadingClass();
