const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { UserSettingsHelper } from '../../../src/utilities/helpers';
import { LuigiConfig } from '../../../src/core-api';

describe('UserSettings-helpers', () => {
    const userSettingsSchema = {
        userSettingGroups: {
            userAccount: {
                label: 'User Account',
                sublabel: 'username',
                icon: 'account',
                title: 'User Account',
                settings: {
                    name: { type: 'string', label: 'Name', isEditable: true },
                    email: { type: 'string', label: 'E-Mail', isEditable: false },
                    server: { type: 'string', label: 'Server', isEditable: false }
                }
            },
            language: {
                label: 'Language & Region',
                sublabel: 'EN | Time Format: 12h',
                icon: '/assets/github-logo.png',
                title: 'Language & Region',
                settings: {
                    language: {
                        type: 'enum',
                        label: 'Language and Region',
                        options: ['German', 'English', 'Spanish', 'French'],
                        description: 'After you save your settings, the browser will refresh for the new language to take effect.'
                    },
                    date: { type: 'string', label: 'Date Format' },
                    time: { type: 'enum', label: 'Time Format', options: ['12 h', '24 h'] }
                }
            },
            privacy: {
                label: 'Privacy',
                title: 'Privacy',
                icon: 'private',
                settings: {
                    policy: {
                        type: 'string', label: 'Privacy policy has not been defined.'
                    },
                    time: { type: 'enum', label: 'Time Format', options: ['12 h', '24 h'] }
                }
            }
        }
    }
    beforeEach(() => {
        sinon.stub(LuigiConfig, 'getConfigValue');
    });
    afterEach(() => {
        sinon.restore();
    });
    it('prepare user settings data from schema', () => {
        LuigiConfig.getConfigValue.returns(userSettingsSchema.userSettingGroups);
        let preparedUserSettingsSchema = UserSettingsHelper.prepareUserSettingsSchema();
        assert.equal(preparedUserSettingsSchema.length, 3);
        assert.deepEqual(preparedUserSettingsSchema[0], {
            userAccount: {
                label: 'User Account',
                sublabel: 'username',
                icon: 'account',
                title: 'User Account',
                settings: {
                    name: { type: 'string', label: 'Name', isEditable: true },
                    email: { type: 'string', label: 'E-Mail', isEditable: false },
                    server: { type: 'string', label: 'Server', isEditable: false }
                }
            }
        });
    });
    it('return empty array if no schema defined', () => {
        LuigiConfig.getConfigValue.returns({});
        let preparedUserSettingsSchema = UserSettingsHelper.prepareUserSettingsSchema();
        assert.equal(preparedUserSettingsSchema.length, 0);
    });
});