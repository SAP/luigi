class UserSettings {
  userSettingsProfileMenuEntry = {
    label: 'My Settings',
    icon: 'settings'
  };
  userSettingsDialog = {
    dialogHeader: 'My UserSettings',
    saveBtn: 'SaveKaese',
    dismissBtn: 'Abbreche'
  };
  userSettingGroups = {
    userAccount: {
      label: 'User Account',
      sublabel: 'username',
      icon: 'account',
      title: 'User Account',
      settings: {
        name: { type: 'string', label: 'Name' },
        email: { type: 'string', label: 'E-Mail', isEditable: false },
        server: { type: 'string', label: 'Server', isEditable: false },
        checkbox: {
          type: 'boolean',
          label: 'Checkbox',
          // style: 'checkbox',
          isEditable: true
        },
        checkbox2: {
          type: 'boolean',
          label: 'Checkbox2'
          // style: 'checkbox'
        },
        checkbox3: {
          type: 'boolean',
          label: 'Checkbox23',
          // style: 'checkbox',
          isEditable: false
        } /*
                name2: { type: 'string', label: 'Name' },
                email2: { type: 'string', label: 'E-Mail', isEditable: false },
                server2: { type: 'string', label: 'Server', isEditable: false },
                checkbox4: {
                    type: 'boolean',
                    label: 'Checkbox',
                    // style: 'checkbox',
                    isEditable: true
                },
                name3: { type: 'string', label: 'Name' },
                email3: { type: 'string', label: 'E-Mail', isEditable: false },
                server3: { type: 'string', label: 'Server', isEditable: false },
                checkbox5: {
                    type: 'boolean',
                    label: 'Checkbox',
                    // style: 'checkbox',
                    isEditable: true
                },*/
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
          description:
            'After you save your settings, the browser will refresh for the new language to take effect.'
        },
        date: { type: 'string', label: 'Date Format' },
        time: {
          type: 'enum',
          style: 'button',
          label: 'Time Format',
          options: ['12 h', '24 h']
        }
      }
    },
    privacy: {
      label: 'Privacy',
      title: 'Privacy',
      icon: 'private',
      settings: {
        policy: {
          type: 'string',
          label: 'Privacy policy has not been defined.'
        },
        time: {
          type: 'enum',
          style: 'button',
          label: 'Time Format',
          options: ['12 h', '24 h']
        }
      }
    } /*,
        theming: {
            label: 'Theming',
            title: 'Theming',
            icon: 'private',
            viewUrl: 'http://192.168.178.21:8090/customUserSettingsMf.html',
            settings: {
                theme: {
                    type: 'enum', label: 'theme', options: ['red', 'green']
                }
            }
        },
        custom: {
            title: 'Custom',
            label: 'Custom',
            sublabel: 'Sublabel',
            viewUrl: 'http://192.168.178.21:8090/usersettings.html'
        }
        */
  };
}
export const userSettings = new UserSettings();
