import { GenericHelpers, RoutingHelpers, IframeHelpers } from './';
import { LuigiConfig } from '../../core-api';
class UserSettingsHelperClass {
    constructor() { }

    prepareUserSettingsSchema() {
        const preparedSchema = [];
        const userSettingsSchema = LuigiConfig.getConfigValue('settings.userSettings.userSettingGroups');
        if (GenericHelpers.isObject(userSettingsSchema)) {
            for (const item in userSettingsSchema) {
                let innerObj = {};
                innerObj[item] = userSettingsSchema[item];
                preparedSchema.push(innerObj);
            };
            return preparedSchema;
        }
        return preparedSchema;
    }

    setIframe(viewUrl, usersettingsGroup) {
        const iframe = IframeHelpers.createIframe(
            viewUrl,
            undefined,
            undefined,
            'usersettings'
        );
        // component.get().lastNode,
        const iframeCtn = document.querySelector('.iframeUserSettingsCtn');
        iframe['userSettingsGroup'] = usersettingsGroup;
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
}
export const UserSettingsHelper = new UserSettingsHelperClass();