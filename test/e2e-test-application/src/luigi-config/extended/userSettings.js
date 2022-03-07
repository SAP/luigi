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
      //icon: '',
      iconClassAttribute: 'fd-avatar fd-avatar--s fd-avatar--circle fd-avatar--thumbnail',
      initials: 'LU',
      title: 'User Account',
      settings: {
        name: { type: 'string', label: 'Name', placeholder: 'Name' },
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
        }
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
          placeholder: 'Language and Region',
          options: [
            { value: 'de', label: 'Deutsch (de)' },
            { value: 'en', label: 'English (en)' },
            'Français',
            '简体中文'
          ],
          description: 'After you save your settings, the browser will refresh for the new language to take effect.'
        },
        date: { type: 'string', label: 'Date Format', placeholder: 'DD-MM-YYYY' },
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
          label: 'Privacy policy has not been defined.',
          placeholder: '...'
        },
        time: {
          type: 'enum',
          style: 'button',
          label: 'Time Format',
          options: ['12 h', '24 h']
        }
      }
    },
    theming: {
      label: 'Theming',
      title: 'Theming',
      icon: 'private',
      viewUrl: 'http://localhost:8080/examples/microfrontends/customUserSettingsMf.html',
      settings: {
        theme: {
          type: 'enum',
          label: 'theme',
          options: ['red', 'green']
        }
      }
    },
    custom: {
      label: 'Custom',
      title: 'Custom',
      icon: 'private',
      viewUrl: 'http://localhost:8080/examples/microfrontends/customUserSettingsMf.html'
    },
    custom2: {
      label: 'Custom 2',
      title: 'Custom 2',
      icon: 'private',
      viewUrl: 'http://localhost:8090/customUserSettingsMf.html'
    }
  };
}
export const userSettings = new UserSettings();
