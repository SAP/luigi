class I18nProvider {
  init() {
    // const urls = [
    //   '/assets/translations/en.json',
    //   '/assets/translations/de.json'
    // ];
    // await Promise.all(urls.map(u=>fetch(u)))
    //   .then(responses => Promise.all(responses.map(res => res.json()))
    // ).then(values => {
    //   this.translationTable = Object.assign({}, ...values);
    // });
    this.translationTable = {
      en: {
        COMMON: {
          SELECT_ENVIRONMENT: 'Select EN Environment ...'
        },
        MF1: {
          LABEL1: 'Label EN'
        },
        ENVIRONMENT_NUM: 'Environment {num} EN'
      },
      de: {
        COMMON: {
          SELECT_ENVIRONMENT: 'Select DE Environment ...'
        },
        MF1: {
          LABEL1: 'Label DE'
        },
        ENVIRONMENT_NUM: 'Environment {num} DE'
      }
    };
    return Promise.resolve(this.translationTable);
  }

  afterInit() {
    this.currentLanguage = Luigi.i18n().getCurrentLocale();
    Luigi.i18n().addCurrentLocaleChangeListener(locale => {
      this.currentLanguage = locale;
    });
  }

  // This function will be used by Luigi Core for translation
  getTranslation(key, interpolations = undefined, locale = undefined) {
    if (!key) return '';
    this.currentLanguage = locale || this.currentLanguage || Luigi.i18n().getCurrentLocale();
    const result = this.findTranslation(key, this.translationTable[this.currentLanguage], interpolations);
    return result ? result : key;
  }

  /**
   * @private
   * Finds the translated value based on given key.
   * @param {string} key key to be translated
   * @param {*} obj translation table
   */
  findTranslation(key, obj, interpolations) {
    let splitted = key.split('.');
    for (let i = 0; i < splitted.length; i++) {
      let key = splitted[i];
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
        obj = obj[key];
      } else {
        if (interpolations) {
          return this.findInterpolations(obj[key], interpolations);
        }
        return obj[key];
      }
    }
  }

  /**
   * @private
   * Replaces values that are defiend in translation strings
   * @param {string} key key to be translated
   * @param {*} interpolations translation table
   * @example
   * findInterpolations('Environment {num}', {num: 1})
   */
  findInterpolations(value, interpolations) {
    Object.keys(interpolations).forEach(item => {
      value = value.replace(new RegExp('{' + this.escapeKeyForRegexp(item) + '}', 'gi'), interpolations[item]);
    });
    return value;
  }

  escapeKeyForRegexp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
}

export const i18nProvider = new I18nProvider();
