import { GenericHelpers, RoutingHelpers, IframeHelpers } from './';
import { LuigiConfig } from '../../core-api';
class UserSettingsHelperClass {
  constructor() {}

  processUserSettingGroups() {
    const userSettingGroups = [];
    const userSettingGroupsFromConfig = LuigiConfig.getConfigValue('userSettings.userSettingGroups');
    const userSettingGroupsFromOldConfig = LuigiConfig.getConfigValue('settings.userSettings.userSettingGroups');
    //regarding backwards compatibility
    const userSettingsSchema = userSettingGroupsFromConfig
      ? userSettingGroupsFromConfig
      : userSettingGroupsFromOldConfig;
    if (GenericHelpers.isObject(userSettingsSchema)) {
      for (const item in userSettingsSchema) {
        let innerObj = {};
        innerObj[item] = userSettingsSchema[item];
        userSettingGroups.push(innerObj);
      }
      return userSettingGroups;
    }
    return userSettingGroups;
  }

  createIframe(viewUrl, userSettingsGroup) {
    const iframe = IframeHelpers.createIframe(viewUrl, undefined, undefined, 'usersettings');
    const iframeCtn = document.querySelector('.iframeUserSettingsCtn');
    iframe.setAttribute('userSettingsGroup', userSettingsGroup);
    iframe.userSettingsGroup = userSettingsGroup; //important for caching
    iframeCtn.appendChild(iframe);
    return iframe;
  }

  getUserSettingsIframesInDom() {
    const iframeCtn = document.querySelector('.iframeUserSettingsCtn');
    return iframeCtn ? iframeCtn.children : [];
  }

  hideUserSettingsIframe() {
    this.getUserSettingsIframesInDom().forEach(iframe => {
      iframe.style.display = 'none';
    });
  }

  findActiveCustomUserSettingsIframe(eventSource) {
    let customUserSettingsIframes = document.querySelectorAll('[userSettingsGroup]');
    for (let i = 0; i < customUserSettingsIframes.length; i++) {
      if (customUserSettingsIframes[i].contentWindow === eventSource) {
        return customUserSettingsIframes[i];
      }
    }
    return null;
  }
}
export const UserSettingsHelper = new UserSettingsHelperClass();
