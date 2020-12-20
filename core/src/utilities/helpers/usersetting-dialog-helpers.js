import { GenericHelpers } from './generic-helpers';
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
}
export const UserSettingsHelper = new UserSettingsHelperClass();