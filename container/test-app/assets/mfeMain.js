var class2type = {};
var hasOwn = class2type.hasOwnProperty;
var toString = class2type.toString;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);
var fnIsPlainObject = function (obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
};
var oToken = Object.create(null);
var fnMerge = function () {
  var src,
    copyIsArray,
    copy,
    name,
    options,
    clone,
    target = arguments[2] || {},
    i = 3,
    length = arguments.length,
    deep = arguments[0] || false,
    skipToken = arguments[1] ? undefined : oToken;
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }
  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (name === '__proto__' || target === copy) {
          continue;
        }
        if (deep && copy && (fnIsPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && fnIsPlainObject(src) ? src : {};
          }
          target[name] = fnMerge(deep, arguments[1], clone, copy);
        } else if (copy !== skipToken) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
};
var fnMerge$1 = function () {
  var args = [true, false];
  args.push.apply(args, arguments);
  return fnMerge.apply(null, args);
};
const whenDOMReady = () => {
  return new Promise((resolve) => {
    if (document.body) {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        resolve();
      });
    }
  });
}; /**
 * Creates a <style> tag in the <head> tag
 * @param cssText - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
const createStyleInHead = (cssText, attributes = {}) => {
  const style = document.createElement('style');
  style.type = 'text/css';

  Object.entries(attributes).forEach((pair) => style.setAttribute(...pair));

  style.textContent = cssText;
  document.head.appendChild(style);
  return style;
};
const features = new Map();

const getFeature = (name) => {
  return features.get(name);
}; /**
 * CSS font face used for the texts provided by SAP.
 */

/* CDN Locations */
const font72RegularWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff?ui5-webcomponents`;
const font72RegularWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents`;

const font72RegularFullWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff?ui5-webcomponents`;
const font72RegularFullWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff2?ui5-webcomponents`;

const font72BoldWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff?ui5-webcomponents`;
const font72BoldWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff2?ui5-webcomponents`;

const font72BoldFullWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff?ui5-webcomponents`;
const font72BoldFullWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff2?ui5-webcomponents`;

const fontFaceCSS = `
	@font-face {
		font-family: "72";
		font-style: normal;
		font-weight: 400;
		src: local("72"),
			url(${font72RegularWoff2}) format("woff2"),
			url(${font72RegularWoff}) format("woff");
	}
	
	@font-face {
		font-family: "72full";
		font-style: normal;
		font-weight: 400;
		src: local('72-full'),
			url(${font72RegularFullWoff2}) format("woff2"),
			url(${font72RegularFullWoff}) format("woff");
		
	}
	
	@font-face {
		font-family: "72";
		font-style: normal;
		font-weight: 700;
		src: local('72-Bold'),
			url(${font72BoldWoff2}) format("woff2"),
			url(${font72BoldWoff}) format("woff");
	}
	
	@font-face {
		font-family: "72full";
		font-style: normal;
		font-weight: 700;
		src: local('72-Bold-full'),
			url(${font72BoldFullWoff2}) format("woff2"),
			url(${font72BoldFullWoff}) format("woff");
	}
`;

const insertFontFace = () => {
  if (document.querySelector(`head>style[data-ui5-font-face]`)) {
    return;
  }

  // If OpenUI5 is found, let it set the font
  const OpenUI5Support = getFeature('OpenUI5Support');
  if (OpenUI5Support && OpenUI5Support.isLoaded()) {
    return;
  }

  createStyleInHead(fontFaceCSS, { 'data-ui5-font-face': '' });
};
const systemCSSVars = `
	:root {
		--_ui5_content_density:cozy;
	}
	
	[data-ui5-compact-size],
	.ui5-content-density-compact,
	.sapUiSizeCompact {
		--_ui5_content_density:compact;
	}
	
	[dir="rtl"] {
		--_ui5_dir:rtl;
	}
	
	[dir="ltr"] {
		--_ui5_dir:ltr;
	}
`;

const insertSystemCSSVars = () => {
  if (document.querySelector(`head>style[data-ui5-system-css-vars]`)) {
    return;
  }

  createStyleInHead(systemCSSVars, { 'data-ui5-system-css-vars': '' });
};
const assetParameters = {
  themes: {
    default: 'sap_fiori_3',
    all: [
      'sap_fiori_3',
      'sap_fiori_3_dark',
      'sap_belize',
      'sap_belize_hcb',
      'sap_belize_hcw',
      'sap_fiori_3_hcb',
      'sap_fiori_3_hcw'
    ]
  },
  languages: {
    default: 'en',
    all: [
      'ar',
      'bg',
      'ca',
      'cs',
      'da',
      'de',
      'el',
      'en',
      'es',
      'et',
      'fi',
      'fr',
      'hi',
      'hr',
      'hu',
      'it',
      'iw',
      'ja',
      'kk',
      'ko',
      'lt',
      'lv',
      'ms',
      'nl',
      'no',
      'pl',
      'pt',
      'ro',
      'ru',
      'sh',
      'sk',
      'sl',
      'sv',
      'th',
      'tr',
      'uk',
      'vi',
      'zh_CN',
      'zh_TW'
    ]
  },
  locales: {
    default: 'en',
    all: [
      'ar',
      'ar_EG',
      'ar_SA',
      'bg',
      'ca',
      'cs',
      'da',
      'de',
      'de_AT',
      'de_CH',
      'el',
      'el_CY',
      'en',
      'en_AU',
      'en_GB',
      'en_HK',
      'en_IE',
      'en_IN',
      'en_NZ',
      'en_PG',
      'en_SG',
      'en_ZA',
      'es',
      'es_AR',
      'es_BO',
      'es_CL',
      'es_CO',
      'es_MX',
      'es_PE',
      'es_UY',
      'es_VE',
      'et',
      'fa',
      'fi',
      'fr',
      'fr_BE',
      'fr_CA',
      'fr_CH',
      'fr_LU',
      'he',
      'hi',
      'hr',
      'hu',
      'id',
      'it',
      'it_CH',
      'ja',
      'kk',
      'ko',
      'lt',
      'lv',
      'ms',
      'nb',
      'nl',
      'nl_BE',
      'pl',
      'pt',
      'pt_PT',
      'ro',
      'ru',
      'ru_UA',
      'sk',
      'sl',
      'sr',
      'sv',
      'th',
      'tr',
      'uk',
      'vi',
      'zh_CN',
      'zh_HK',
      'zh_SG',
      'zh_TW'
    ]
  }
};

const DEFAULT_THEME = assetParameters.themes.default;
const DEFAULT_LANGUAGE = assetParameters.languages.default;
const DEFAULT_LOCALE = assetParameters.locales.default;
let initialized = false;

let initialConfig = {
  animationMode: 'full',
  theme: DEFAULT_THEME,
  rtl: null,
  language: null,
  calendarType: null,
  noConflict: false, // no URL
  formatSettings: {},
  useDefaultLanguage: false,
  assetsPath: ''
};

const getTheme = () => {
  initConfiguration();
  return initialConfig.theme;
};

const getRTL = () => {
  initConfiguration();
  return initialConfig.rtl;
};

const getLanguage = () => {
  initConfiguration();
  return initialConfig.language;
};

/**
 * Returns if the default language, that is inlined build time,
 * should be used, instead of trying fetching the language over the network.
 * @returns {Boolean}
 */
const getUseDefaultLanguage = () => {
  initConfiguration();
  return initialConfig.useDefaultLanguage;
};

const getNoConflict = () => {
  initConfiguration();
  return initialConfig.noConflict;
};

const getAssetsPath = () => {
  initConfiguration();
  return initialConfig.assetsPath;
};

const booleanMapping = new Map();
booleanMapping.set('true', true);
booleanMapping.set('false', false);

const parseConfigurationScript = () => {
  const configScript =
    document.querySelector('[data-ui5-config]') || document.querySelector("[data-id='sap-ui-config']"); // for backward compatibility

  let configJSON;

  if (configScript) {
    try {
      configJSON = JSON.parse(configScript.innerHTML);
    } catch (err) {
      console.warn('Incorrect data-sap-ui-config format. Please use JSON'); /* eslint-disable-line */
    }

    if (configJSON) {
      initialConfig = fnMerge$1(initialConfig, configJSON);
    }
  }
};

const parseURLParameters = () => {
  const params = new URLSearchParams(window.location.search);

  params.forEach((value, key) => {
    if (!key.startsWith('sap-ui')) {
      return;
    }

    const lowerCaseValue = value.toLowerCase();

    const param = key.split('sap-ui-')[1];

    if (booleanMapping.has(value)) {
      value = booleanMapping.get(lowerCaseValue);
    }

    initialConfig[param] = value;
  });
};

const applyOpenUI5Configuration = () => {
  const OpenUI5Support = getFeature('OpenUI5Support');
  if (!OpenUI5Support || !OpenUI5Support.isLoaded()) {
    return;
  }

  const OpenUI5Config = OpenUI5Support.getConfigurationSettingsObject();
  initialConfig = fnMerge$1(initialConfig, OpenUI5Config);
};

const initConfiguration = () => {
  if (initialized) {
    return;
  }

  // 1. Lowest priority - configuration script
  parseConfigurationScript();

  // 2. URL parameters overwrite configuration script parameters
  parseURLParameters();

  // 3. If OpenUI5 is detected, it has the highest priority
  applyOpenUI5Configuration();

  initialized = true;
};
const fetchPromises = new Map();
const jsonPromises = new Map();
const textPromises = new Map();

const fetchTextOnce = async (url) => {
  if (!fetchPromises.get(url)) {
    fetchPromises.set(url, fetch(url));
  }
  const response = await fetchPromises.get(url);

  if (!textPromises.get(url)) {
    textPromises.set(url, response.text());
  }

  return textPromises.get(url);
};

const fetchJsonOnce = async (url) => {
  if (!fetchPromises.get(url)) {
    fetchPromises.set(url, fetch(url));
  }
  const response = await fetchPromises.get(url);

  if (!jsonPromises.get(url)) {
    jsonPromises.set(url, response.json());
  }

  return jsonPromises.get(url);
}; /**
 * ""                        -> ""
 * "noExtension"             -> ""
 * "file.txt"                -> ".txt"
 * "file.with.many.dots.doc" -> ".doc"
 * ".gitignore"              -> ""
 *
 * @param fileName - the file name
 * @returns {string}
 */
const getFileExtension = (fileName) => {
  const dotPos = fileName.lastIndexOf('.');

  if (dotPos < 1) {
    return '';
  }

  return fileName.slice(dotPos);
};
let assetsPath;

const getAssetsPath$1 = () => {
  if (assetsPath === undefined) {
    assetsPath = getAssetsPath();
  }

  return assetsPath;
};
let assetPathMappingFn = (assetName) => assetName;

const getEffectiveAssetPath = (assetName) => {
  if (typeof assetName !== 'string') {
    return assetName;
  }

  assetName = assetPathMappingFn(assetName);

  const assetsPathPrefix = getAssetsPath$1();
  if (assetsPathPrefix) {
    return `${assetsPathPrefix}${assetName}`;
  }

  return assetName;
};
const themeURLs = new Map();
const themeStyles = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();

/**
 * Used to provide CSS Vars for a specific theme for a specific package.
 * The CSS Vars can be passed directly as a string (containing them), as an object with a "_" property(containing them in the "_" property), or as a URL.
 * This URL must point to a JSON file, containing a "_" property.
 *
 * Example usage:
 *  1) Pass the CSS Vars as a string directly.
 *  registerThemeProperties("my-package", "my_theme", ":root{--var1: red;}");
 *  2) Pass the CSS Vars as an object directly
 *  registerThemeProperties("my-package", "my_theme", {"_": ":root{--var1: red;}"});
 *  3) Pass a URL to a CSS file, containing the CSS Vars. Will be fetched on demand, not upon registration.
 *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.css");
 *  4) Pass a URL to a JSON file, containing the CSS Vars in its "_" property. Will be fetched on demand, not upon registration.
 *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.json");
 *
 * @public
 * @param packageName - the NPM package for which CSS Vars are registered
 * @param themeName - the theme which the CSS Vars implement
 * @param style - can be one of four options: a string, an object with a "_" property, URL to a CSS file, or URL to a JSON file with a "_" property
 */
const registerThemeProperties = (packageName, themeName, style) => {
  if (style._) {
    // JSON object like ({"_": ":root"})
    themeStyles.set(`${packageName}_${themeName}`, style._);
  } else if (style.includes(':root') || style === '') {
    // pure string, including empty string
    themeStyles.set(`${packageName}_${themeName}`, style);
  } else {
    // url for fetching
    themeURLs.set(`${packageName}_${themeName}`, style);
  }
  registeredPackages.add(packageName);
  registeredThemes.add(themeName);
};

const getThemeProperties = async (packageName, themeName) => {
  const style = themeStyles.get(`${packageName}_${themeName}`);
  if (style !== undefined) {
    // it's valid for style to be an empty string
    return style;
  }

  if (!registeredThemes.has(themeName)) {
    const regThemesStr = [...registeredThemes.values()].join(', ');
    console.warn(
      `You have requested a non-registered theme - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`
    ); /* eslint-disable-line */
    return themeStyles.get(`${packageName}_${DEFAULT_THEME}`);
  }

  const data = await fetchThemeProperties(packageName, themeName);
  const themeProps = data._ || data;

  themeStyles.set(`${packageName}_${themeName}`, themeProps);
  return themeProps;
};

const fetchThemeProperties = async (packageName, themeName) => {
  const url = themeURLs.get(`${packageName}_${themeName}`);

  if (!url) {
    throw new Error(`You have to import the ${packageName}/dist/Assets.js module to switch to additional themes`);
  }

  return getFileExtension(url) === '.css' ? fetchTextOnce(url) : fetchJsonOnce(getEffectiveAssetPath(url));
};

const getRegisteredPackages = () => {
  return registeredPackages;
};

const isThemeRegistered = (theme) => {
  return registeredThemes.has(theme);
};

/**
 * Creates/updates a style element holding all CSS Custom Properties
 * @param cssText
 * @param packageName
 */
const createThemePropertiesStyleTag = (cssText, packageName) => {
  const styleElement = document.head.querySelector(`style[data-ui5-theme-properties="${packageName}"]`);
  if (styleElement) {
    styleElement.textContent = cssText || ''; // in case of undefined
  } else {
    const attributes = {
      'data-ui5-theme-properties': packageName
    };
    createStyleInHead(cssText, attributes);
  }
};

const getThemeMetadata = () => {
  // Check if the class was already applied, most commonly to the link/style tag with the CSS Variables
  let el = document.querySelector('.sapThemeMetaData-Base-baseLib');
  if (el) {
    return getComputedStyle(el).backgroundImage;
  }

  el = document.createElement('span');
  el.style.display = 'none';
  el.classList.add('sapThemeMetaData-Base-baseLib');
  document.body.appendChild(el);
  const metadata = getComputedStyle(el).backgroundImage;
  document.body.removeChild(el);

  return metadata;
};

const parseThemeMetadata = (metadataString) => {
  const params = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(metadataString);
  if (params && params.length >= 2) {
    let paramsString = params[1];
    paramsString = paramsString.replace(/\\"/g, `"`);
    if (paramsString.charAt(0) !== '{' && paramsString.charAt(paramsString.length - 1) !== '}') {
      try {
        paramsString = decodeURIComponent(paramsString);
      } catch (ex) {
        console.warn('Malformed theme metadata string, unable to decodeURIComponent'); // eslint-disable-line
        return;
      }
    }
    try {
      return JSON.parse(paramsString);
    } catch (ex) {
      console.warn('Malformed theme metadata string, unable to parse JSON'); // eslint-disable-line
    }
  }
};

const processThemeMetadata = (metadata) => {
  let themeName;
  let baseThemeName;

  try {
    themeName = metadata.Path.match(/\.([^.]+)\.css_variables$/)[1];
    baseThemeName = metadata.Extends[0];
  } catch (ex) {
    console.warn('Malformed theme metadata Object', metadata); // eslint-disable-line
    return;
  }

  return {
    themeName,
    baseThemeName
  };
};

const getThemeDesignerTheme = () => {
  const metadataString = getThemeMetadata();
  if (!metadataString || metadataString === 'none') {
    return;
  }

  const metadata = parseThemeMetadata(metadataString);
  return processThemeMetadata(metadata);
};
let ponyfillTimer;

const ponyfillNeeded = () => !!window.CSSVarsPonyfill;

const runPonyfill = () => {
  ponyfillTimer = undefined;

  window.CSSVarsPonyfill.cssVars({
    rootElement: document.head,
    variables: isCompact() ? getCompactModeVars() : {},
    silent: true
  });
};

const schedulePonyfill = () => {
  if (!ponyfillTimer) {
    ponyfillTimer = window.setTimeout(runPonyfill, 0);
  }
};

const isCompact = () => {
  const b = document.body;
  return (
    b.hasAttribute('data-ui5-compact-size') ||
    b.classList.contains('ui5-content-density-compact') ||
    b.classList.contains('sapUiSizeCompact')
  );
};

const getCompactModeVars = () => {
  const compactVars = {};
  [...document.querySelectorAll(`[data-ui5-theme-properties]`)].forEach((el) => {
    const cssContent = el.textContent.replace('\n', '');
    let match;
    const regExp = new RegExp('data-ui5-compact-size[^{]*{(.*?)}', 'g');
    while ((match = regExp.exec(cssContent)) !== null) {
      // eslint-disable-line
      const compactCSS = match[1];
      compactCSS.split(';').forEach((declaration) => {
        const pair = declaration.split(':');
        compactVars[pair[0].trim()] = pair[1].trim();
      });
    }
  });

  return compactVars;
};

class EventProvider {
  constructor() {
    this._eventRegistry = {};
  }

  attachEvent(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    let eventListeners = eventRegistry[eventName];

    if (!Array.isArray(eventListeners)) {
      eventRegistry[eventName] = [];
      eventListeners = eventRegistry[eventName];
    }

    eventListeners.push({
      function: fnFunction
    });
  }

  detachEvent(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    let eventListeners = eventRegistry[eventName];

    if (!eventListeners) {
      return;
    }

    eventListeners = eventListeners.filter((event) => {
      return event['function'] !== fnFunction; // eslint-disable-line
    });

    if (eventListeners.length === 0) {
      delete eventRegistry[eventName];
    }
  }

  /**
   * Fires an event and returns the results of all event listeners as an array.
   * Example: If listeners return promises, you can: await fireEvent("myEvent") to know when all listeners have finished.
   *
   * @param eventName the event to fire
   * @param data optional data to pass to each event listener
   * @returns {Array} an array with the results of all event listeners
   */
  fireEvent(eventName, data) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry[eventName];

    if (!eventListeners) {
      return [];
    }

    return eventListeners.map((event) => {
      return event['function'].call(this, data); // eslint-disable-line
    });
  }

  isHandlerAttached(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry[eventName];

    if (!eventListeners) {
      return false;
    }

    for (let i = 0; i < eventListeners.length; i++) {
      const event = eventListeners[i];
      if (event['function'] === fnFunction) {
        // eslint-disable-line
        return true;
      }
    }

    return false;
  }

  hasListeners(eventName) {
    return !!this._eventRegistry[eventName];
  }
}
const eventProvider = new EventProvider();
const THEME_LOADED = 'themeLoaded';

const fireThemeLoaded = (theme) => {
  return eventProvider.fireEvent(THEME_LOADED, theme);
};
const BASE_THEME_PACKAGE = '@ui5/webcomponents-theme-base';

const isThemeBaseRegistered = () => {
  const registeredPackages = getRegisteredPackages();
  return registeredPackages.has(BASE_THEME_PACKAGE);
};

const loadThemeBase = async (theme) => {
  if (!isThemeBaseRegistered()) {
    return;
  }

  const cssText = await getThemeProperties(BASE_THEME_PACKAGE, theme);
  createThemePropertiesStyleTag(cssText, BASE_THEME_PACKAGE);
};

const deleteThemeBase = () => {
  const styleElement = document.head.querySelector(`style[data-ui5-theme-properties="${BASE_THEME_PACKAGE}"]`);
  if (styleElement) {
    styleElement.parentElement.removeChild(styleElement);
  }
};

const loadComponentPackages = async (theme) => {
  const registeredPackages = getRegisteredPackages();
  registeredPackages.forEach(async (packageName) => {
    if (packageName === BASE_THEME_PACKAGE) {
      return;
    }

    const cssText = await getThemeProperties(packageName, theme);
    createThemePropertiesStyleTag(cssText, packageName);
  });
};

const detectExternalTheme = () => {
  // If theme designer theme is detected, use this
  const extTheme = getThemeDesignerTheme();
  if (extTheme) {
    return extTheme;
  }

  // If OpenUI5Support is enabled, try to find out if it loaded variables
  const OpenUI5Support = getFeature('OpenUI5Support');
  if (OpenUI5Support) {
    const varsLoaded = OpenUI5Support.cssVariablesLoaded();
    if (varsLoaded) {
      return {
        themeName: OpenUI5Support.getConfigurationSettingsObject().theme // just themeName, baseThemeName is only relevant for custom themes
      };
    }
  }
};

const applyTheme = async (theme) => {
  const extTheme = detectExternalTheme();

  // Only load theme_base properties if there is no externally loaded theme, or there is, but it is not being loaded
  if (!extTheme || theme !== extTheme.themeName) {
    await loadThemeBase(theme);
  } else {
    deleteThemeBase();
  }

  // Always load component packages properties. For non-registered themes, try with the base theme, if any
  const packagesTheme = isThemeRegistered(theme) ? theme : extTheme && extTheme.baseThemeName;
  await loadComponentPackages(packagesTheme);

  // When changing the theme, run the ponyfill immediately
  if (ponyfillNeeded()) {
    runPonyfill();
  }

  fireThemeLoaded(theme);
};
let theme;

const getTheme$1 = () => {
  if (theme === undefined) {
    theme = getTheme();
  }

  return theme;
};
let polyfillLoadedPromise;

const whenPolyfillLoaded = () => {
  if (polyfillLoadedPromise) {
    return polyfillLoadedPromise;
  }

  polyfillLoadedPromise = new Promise((resolve) => {
    if (window.WebComponents && !window.WebComponents.ready && window.WebComponents.waitFor) {
      // the polyfill loader is present
      window.WebComponents.waitFor(() => {
        // the polyfills are loaded, safe to execute code depending on their APIs
        resolve();
      });
    } else {
      // polyfill loader missing, modern browsers only
      resolve();
    }
  });

  return polyfillLoadedPromise;
};
let bootPromise;

const boot = () => {
  if (bootPromise) {
    return bootPromise;
  }

  bootPromise = new Promise(async (resolve) => {
    const OpenUI5Support = getFeature('OpenUI5Support');
    if (OpenUI5Support) {
      await OpenUI5Support.init();
    }

    await whenDOMReady();
    await applyTheme(getTheme$1());
    OpenUI5Support && OpenUI5Support.attachListeners();
    insertFontFace();
    insertSystemCSSVars();
    await whenPolyfillLoaded();
    resolve();
  });

  return bootPromise;
};

/**
 * Base class for all data types.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.DataType
 * @public
 */
class DataType {
  static isValid(value) {}

  static generataTypeAcessors(types) {
    Object.keys(types).forEach((type) => {
      Object.defineProperty(this, type, {
        get() {
          return types[type];
        }
      });
    });
  }
}
const isDescendantOf = (klass, baseKlass, inclusive = false) => {
  if (typeof klass !== 'function' || typeof baseKlass !== 'function') {
    return false;
  }
  if (inclusive && klass === baseKlass) {
    return true;
  }
  let parent = klass;
  do {
    parent = Object.getPrototypeOf(parent);
  } while (parent !== null && parent !== baseKlass);
  return parent === baseKlass;
};
const kebabToCamelMap = new Map();
const camelToKebabMap = new Map();

const kebabToCamelCase = (string) => {
  if (!kebabToCamelMap.has(string)) {
    const result = toCamelCase(string.split('-'));
    kebabToCamelMap.set(string, result);
  }
  return kebabToCamelMap.get(string);
};

const camelToKebabCase = (string) => {
  if (!camelToKebabMap.has(string)) {
    const result = string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    camelToKebabMap.set(string, result);
  }
  return camelToKebabMap.get(string);
};

const toCamelCase = (parts) => {
  return parts
    .map((string, index) => {
      return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    })
    .join('');
};
const isSlot = (el) => el && el instanceof HTMLElement && el.localName === 'slot';
let suf;
let rulesObj = {
  include: [/^ui5-/],
  exclude: []
};
const tagsCache = new Map(); // true/false means the tag should/should not be cached, undefined means not known yet.

/**
 * Returns the currently set scoping suffix, or undefined if not set.
 *
 * @public
 * @returns {String|undefined}
 */
const getCustomElementsScopingSuffix = () => {
  return suf;
};

/**
 * Determines whether custom elements with the given tag should be scoped or not.
 * The tag is first matched against the "include" rules and then against the "exclude" rules and the
 * result is cached until new rules are set.
 *
 * @public
 * @param tag
 */
const shouldScopeCustomElement = (tag) => {
  if (!tagsCache.has(tag)) {
    const result =
      rulesObj.include.some((rule) => tag.match(rule)) && !rulesObj.exclude.some((rule) => tag.match(rule));
    tagsCache.set(tag, result);
  }

  return tagsCache.get(tag);
};

/**
 * Returns the currently set scoping suffix, if any and if the tag should be scoped, or undefined otherwise.
 *
 * @public
 * @param tag
 * @returns {String}
 */
const getEffectiveScopingSuffixForTag = (tag) => {
  if (shouldScopeCustomElement(tag)) {
    return getCustomElementsScopingSuffix();
  }
};

/**
 *
 * @class
 * @public
 */
class UI5ElementMetadata {
  constructor(metadata) {
    this.metadata = metadata;
  }

  /**
   * Only intended for use by UI5Element.js
   * @protected
   */
  static validatePropertyValue(value, propData) {
    const isMultiple = propData.multiple;
    if (isMultiple) {
      return value.map((propValue) => validateSingleProperty(propValue, propData));
    }
    return validateSingleProperty(value, propData);
  }

  /**
   * Only intended for use by UI5Element.js
   * @protected
   */
  static validateSlotValue(value, slotData) {
    return validateSingleSlot(value, slotData);
  }

  /**
   * Returns the tag of the UI5 Element without the scope
   * @public
   */
  getPureTag() {
    return this.metadata.tag;
  }

  /**
   * Returns the tag of the UI5 Element
   * @public
   */
  getTag() {
    const pureTag = this.metadata.tag;
    const suffix = getEffectiveScopingSuffixForTag(pureTag);
    if (!suffix) {
      return pureTag;
    }

    return `${pureTag}-${suffix}`;
  }

  /**
   * Used to get the tag we need to register for backwards compatibility
   * @public
   */
  getAltTag() {
    const pureAltTag = this.metadata.altTag;
    if (!pureAltTag) {
      return;
    }

    const suffix = getEffectiveScopingSuffixForTag(pureAltTag);
    if (!suffix) {
      return pureAltTag;
    }

    return `${pureAltTag}-${suffix}`;
  }

  /**
   * Determines whether a property should have an attribute counterpart
   * @public
   * @param propName
   * @returns {boolean}
   */
  hasAttribute(propName) {
    const propData = this.getProperties()[propName];
    return propData.type !== Object && !propData.noAttribute;
  }

  /**
   * Returns an array with the properties of the UI5 Element (in camelCase)
   * @public
   * @returns {string[]}
   */
  getPropertiesList() {
    return Object.keys(this.getProperties());
  }

  /**
   * Returns an array with the attributes of the UI5 Element (in kebab-case)
   * @public
   * @returns {string[]}
   */
  getAttributesList() {
    return this.getPropertiesList().filter(this.hasAttribute, this).map(camelToKebabCase);
  }

  /**
   * Returns an object with key-value pairs of slots and their metadata definitions
   * @public
   */
  getSlots() {
    return this.metadata.slots || {};
  }

  /**
   * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
   * @returns {boolean}
   */
  canSlotText() {
    const defaultSlot = this.getSlots().default;
    return defaultSlot && defaultSlot.type === Node;
  }

  /**
   * Determines whether this UI5 Element supports any slots
   * @public
   */
  hasSlots() {
    return !!Object.entries(this.getSlots()).length;
  }

  /**
   * Determines whether this UI5 Element supports any slots with "individualSlots: true"
   * @public
   */
  hasIndividualSlots() {
    return (
      this.slotsAreManaged() &&
      Object.entries(this.getSlots()).some(([_slotName, slotData]) => slotData.individualSlots)
    );
  }

  /**
   * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
   * @public
   */
  slotsAreManaged() {
    return !!this.metadata.managedSlots;
  }

  /**
   * Returns an object with key-value pairs of properties and their metadata definitions
   * @public
   */
  getProperties() {
    return this.metadata.properties || {};
  }

  /**
   * Returns an object with key-value pairs of events and their metadata definitions
   * @public
   */
  getEvents() {
    return this.metadata.events || {};
  }

  /**
   * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
   * @returns {boolean}
   */
  isLanguageAware() {
    return !!this.metadata.languageAware;
  }
}

const validateSingleProperty = (value, propData) => {
  const propertyType = propData.type;

  if (propertyType === Boolean) {
    return typeof value === 'boolean' ? value : false;
  }
  if (propertyType === String) {
    return typeof value === 'string' || typeof value === 'undefined' || value === null ? value : value.toString();
  }
  if (propertyType === Object) {
    return typeof value === 'object' ? value : propData.defaultValue;
  }
  if (isDescendantOf(propertyType, DataType)) {
    return propertyType.isValid(value) ? value : propData.defaultValue;
  }
};

const validateSingleSlot = (value, slotData) => {
  if (value === null) {
    return value;
  }

  const getSlottedNodes = (el) => {
    if (isSlot(el)) {
      return el.assignedNodes({ flatten: true }).filter((item) => item instanceof HTMLElement);
    }

    return [el];
  };

  const slottedNodes = getSlottedNodes(value);
  slottedNodes.forEach((el) => {
    if (!(el instanceof slotData.type)) {
      throw new Error(`${el} is not of type ${slotData.type}`);
    }
  });

  return value;
}; /**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 * @returns {*}
 */
const executeTemplate = (template, component) => {
  const tagsToScope = component.constructor
    .getUniqueDependencies()
    .map((dep) => dep.getMetadata().getPureTag())
    .filter(shouldScopeCustomElement);
  const scope = getCustomElementsScopingSuffix();
  return template(component, tagsToScope, scope);
};
const getSingletonElementInstance = (tag, parentElement = document.body) => {
  let el = document.querySelector(tag);

  if (el) {
    return el;
  }

  el = document.createElement(tag);

  return parentElement.insertBefore(el, parentElement.firstChild);
};
const getStaticAreaInstance = () => getSingletonElementInstance('ui5-static-area');

const removeStaticArea = () => {
  getStaticAreaInstance().destroy();
};

class StaticAreaElement extends HTMLElement {
  constructor() {
    super();
  }

  get isUI5Element() {
    return true;
  }

  destroy() {
    const staticAreaDomRef = document.querySelector(this.tagName.toLowerCase());
    staticAreaDomRef.parentElement.removeChild(staticAreaDomRef);
  }
}

if (!customElements.get('ui5-static-area')) {
  customElements.define('ui5-static-area', StaticAreaElement);
}

const MAX_PROCESS_COUNT = 10;

class RenderQueue {
  constructor() {
    this.list = []; // Used to store the web components in order
    this.lookup = new Set(); // Used for faster search
  }

  add(webComponent) {
    if (this.lookup.has(webComponent)) {
      return;
    }

    this.list.push(webComponent);
    this.lookup.add(webComponent);
  }

  remove(webComponent) {
    if (!this.lookup.has(webComponent)) {
      return;
    }

    this.list = this.list.filter((item) => item !== webComponent);
    this.lookup.delete(webComponent);
  }

  shift() {
    const webComponent = this.list.shift();
    if (webComponent) {
      this.lookup.delete(webComponent);
      return webComponent;
    }
  }

  isEmpty() {
    return this.list.length === 0;
  }

  isAdded(webComponent) {
    return this.lookup.has(webComponent);
  }

  /**
   * Processes the whole queue by executing the callback on each component,
   * while also imposing restrictions on how many times a component may be processed.
   *
   * @param callback - function with one argument (the web component to be processed)
   */
  process(callback) {
    let webComponent;
    const stats = new Map();

    webComponent = this.shift();
    while (webComponent) {
      const timesProcessed = stats.get(webComponent) || 0;
      if (timesProcessed > MAX_PROCESS_COUNT) {
        throw new Error(`Web component processed too many times this task, max allowed is: ${MAX_PROCESS_COUNT}`);
      }
      callback(webComponent);
      stats.set(webComponent, timesProcessed + 1);
      webComponent = this.shift();
    }
  }
} // This is needed as IE11 doesn't have Set.prototype.keys/values/entries, so [...mySet.values()] is not an option
const setToArray = (s) => {
  const arr = [];
  s.forEach((item) => {
    arr.push(item);
  });
  return arr;
};
const Definitions = new Set();
const Failures = new Set();
let failureTimeout;

const registerTag = (tag) => {
  Definitions.add(tag);
};

const isTagRegistered = (tag) => {
  return Definitions.has(tag);
};

const getAllRegisteredTags = () => {
  return setToArray(Definitions);
};

const recordTagRegistrationFailure = (tag) => {
  Failures.add(tag);
  if (!failureTimeout) {
    failureTimeout = setTimeout(() => {
      displayFailedRegistrations();
      failureTimeout = undefined;
    }, 1000);
  }
};

const displayFailedRegistrations = () => {
  console.warn(
    `The following tags have already been defined by a different UI5 Web Components version: ${setToArray(Failures).join(', ')}`
  ); // eslint-disable-line
  Failures.clear();
};
const rtlAwareSet = new Set();

const markAsRtlAware = (klass) => {
  rtlAwareSet.add(klass);
};

const isRtlAware = (klass) => {
  return rtlAwareSet.has(klass);
};
const registeredElements = new Set();

// Queue for invalidated web components
const invalidatedWebComponents = new RenderQueue();

let renderTaskPromise, renderTaskPromiseResolve;

let mutationObserverTimer;

let queuePromise;

/**
 * Class that manages the rendering/re-rendering of web components
 * This is always asynchronous
 */
class RenderScheduler {
  constructor() {
    throw new Error('Static class');
  }

  /**
   * Schedules a render task (if not already scheduled) to render the component
   *
   * @param webComponent
   * @returns {Promise}
   */
  static async renderDeferred(webComponent) {
    // Enqueue the web component
    invalidatedWebComponents.add(webComponent);

    // Schedule a rendering task
    await RenderScheduler.scheduleRenderTask();
  }

  /**
   * Renders a component synchronously
   *
   * @param webComponent
   */
  static renderImmediately(webComponent) {
    webComponent._render();
  }

  /**
   * Cancels the rendering of a component, added to the queue with renderDeferred
   *
   * @param webComponent
   */
  static cancelRender(webComponent) {
    invalidatedWebComponents.remove(webComponent);
  }

  /**
   * Schedules a rendering task, if not scheduled already
   */
  static async scheduleRenderTask() {
    if (!queuePromise) {
      queuePromise = new Promise((resolve) => {
        window.requestAnimationFrame(() => {
          // Render all components in the queue
          invalidatedWebComponents.process((component) => component._render());

          // Resolve the promise so that callers of renderDeferred can continue
          queuePromise = null;
          resolve();

          // Wait for Mutation observer before the render task is considered finished
          if (!mutationObserverTimer) {
            mutationObserverTimer = setTimeout(() => {
              mutationObserverTimer = undefined;
              if (invalidatedWebComponents.isEmpty()) {
                RenderScheduler._resolveTaskPromise();
              }
            }, 200);
          }
        });
      });
    }

    await queuePromise;
  }

  /**
   * return a promise that will be resolved once all invalidated web components are rendered
   */
  static whenDOMUpdated() {
    if (renderTaskPromise) {
      return renderTaskPromise;
    }

    renderTaskPromise = new Promise((resolve) => {
      renderTaskPromiseResolve = resolve;
      window.requestAnimationFrame(() => {
        if (invalidatedWebComponents.isEmpty()) {
          renderTaskPromise = undefined;
          resolve();
        }
      });
    });

    return renderTaskPromise;
  }

  static whenAllCustomElementsAreDefined() {
    const definedPromises = getAllRegisteredTags().map((tag) => customElements.whenDefined(tag));
    return Promise.all(definedPromises);
  }

  static async whenFinished() {
    await RenderScheduler.whenAllCustomElementsAreDefined();
    await RenderScheduler.whenDOMUpdated();
  }

  static _resolveTaskPromise() {
    if (!invalidatedWebComponents.isEmpty()) {
      // More updates are pending. Resolve will be called again
      return;
    }

    if (renderTaskPromiseResolve) {
      renderTaskPromiseResolve.call(this);
      renderTaskPromiseResolve = undefined;
      renderTaskPromise = undefined;
    }
  }

  static register(element) {
    registeredElements.add(element);
  }

  static deregister(element) {
    registeredElements.delete(element);
  }

  /**
   * Re-renders all UI5 Elements on the page, with the option to specify filters to rerender only some components.
   *
   * Usage:
   * reRenderAllUI5Elements() -> rerenders all components
   * reRenderAllUI5Elements({tag: "ui5-button"}) -> re-renders only instances of ui5-button
   * reRenderAllUI5Elements({rtlAware: true}) -> re-renders only rtlAware components
   * reRenderAllUI5Elements({languageAware: true}) -> re-renders only languageAware components
   * reRenderAllUI5Elements({rtlAware: true, languageAware: true}) -> re-renders components that are rtlAware or languageAware
   * etc...
   *
   * @public
   * @param {Object|undefined} filters - Object with keys that can be "rtlAware" or "languageAware"
   */
  static reRenderAllUI5Elements(filters) {
    registeredElements.forEach((element) => {
      const tag = element.constructor.getMetadata().getTag();
      const rtlAware = isRtlAware(element.constructor);
      const languageAware = element.constructor.getMetadata().isLanguageAware();
      if (
        !filters ||
        filters.tag === tag ||
        (filters.rtlAware && rtlAware) ||
        (filters.languageAware && languageAware)
      ) {
        RenderScheduler.renderDeferred(element);
      }
    });
  }
}
const getStylesString = (styles) => {
  if (Array.isArray(styles)) {
    return flatten(styles).join(' ');
  }

  return styles;
};

const flatten = (arr) => {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
};

/**
 * @class
 * @author SAP SE
 * @private
 * Defines and takes care of ui5-static-are-item items
 */
class StaticAreaItem {
  constructor(_ui5ElementContext) {
    this.ui5ElementContext = _ui5ElementContext;
    this._rendered = false;
  }

  isRendered() {
    return this._rendered;
  }

  /**
   * @protected
   */
  _updateFragment() {
    const renderResult = executeTemplate(this.ui5ElementContext.constructor.staticAreaTemplate, this.ui5ElementContext),
      stylesToAdd = window.ShadyDOM ? false : getStylesString(this.ui5ElementContext.constructor.staticAreaStyles);

    if (!this.staticAreaItemDomRef) {
      // Initial rendering of fragment

      this.staticAreaItemDomRef = document.createElement('ui5-static-area-item');
      this.staticAreaItemDomRef.attachShadow({ mode: 'open' });
      this.staticAreaItemDomRef.classList.add(this.ui5ElementContext._id); // used for getting the popover in the tests

      getStaticAreaInstance().appendChild(this.staticAreaItemDomRef);
      this._rendered = true;
    }

    this._updateContentDensity(this.ui5ElementContext.isCompact);
    this.ui5ElementContext.constructor.render(renderResult, this.staticAreaItemDomRef.shadowRoot, stylesToAdd, {
      eventContext: this.ui5ElementContext
    });
  }

  /**
   * @protected
   */
  _removeFragmentFromStaticArea() {
    if (!this.staticAreaItemDomRef) {
      return;
    }

    const staticArea = getStaticAreaInstance();

    staticArea.removeChild(this.staticAreaItemDomRef);

    this.staticAreaItemDomRef = null;

    // remove static area
    if (staticArea.childElementCount < 1) {
      removeStaticArea();
    }
  }

  /**
   * @protected
   */
  _updateContentDensity(isCompact) {
    if (!this.staticAreaItemDomRef) {
      return;
    }

    if (isCompact) {
      this.staticAreaItemDomRef.classList.add('sapUiSizeCompact');
      this.staticAreaItemDomRef.classList.add('ui5-content-density-compact');
    } else {
      this.staticAreaItemDomRef.classList.remove('sapUiSizeCompact');
      this.staticAreaItemDomRef.classList.remove('ui5-content-density-compact');
    }
  }

  /**
   * @protected
   * Returns reference to the DOM element where the current fragment is added.
   */
  async getDomRef() {
    if (!this._rendered || !this.staticAreaItemDomRef) {
      this._updateFragment();
    }
    await RenderScheduler.whenDOMUpdated(); // Wait for the content of the ui5-static-area-item to be rendered
    return this.staticAreaItemDomRef.shadowRoot;
  }
}

class StaticAreaItemElement extends HTMLElement {
  constructor() {
    super();
  }

  get isUI5Element() {
    return true;
  }
}

if (!customElements.get('ui5-static-area-item')) {
  customElements.define('ui5-static-area-item', StaticAreaItemElement);
} // Shorthands
const w = window;

// Map of observer objects per dom node
const observers = new WeakMap();

/**
 * Implements universal DOM node observation methods.
 */
class DOMObserver {
  constructor() {
    throw new Error('Static class');
  }

  /**
   * This function abstracts out mutation observer usage inside shadow DOM.
   * For native shadow DOM the native mutation observer is used.
   * When the polyfill is used, the observeChildren ShadyDOM method is used instead.
   *
   * @throws Exception
   * Note: does not allow several mutation observers per node. If there is a valid use-case, this behavior can be changed.
   *
   * @param node
   * @param callback
   * @param options - Only used for the native mutation observer
   */
  static observeDOMNode(node, callback, options) {
    let observerObject = observers.get(node);
    if (observerObject) {
      throw new Error('A mutation/ShadyDOM observer is already assigned to this node.');
    }

    if (w.ShadyDOM) {
      observerObject = w.ShadyDOM.observeChildren(node, callback);
    } else {
      observerObject = new MutationObserver(callback);
      observerObject.observe(node, options);
    }

    observers.set(node, observerObject);
  }

  /**
   * De-registers the mutation observer, depending on its type
   * @param node
   */
  static unobserveDOMNode(node) {
    const observerObject = observers.get(node);
    if (!observerObject) {
      return;
    }

    if (observerObject instanceof MutationObserver) {
      observerObject.disconnect();
    } else {
      w.ShadyDOM.unobserveChildren(observerObject);
    }
    observers.delete(node);
  }
} // Fire these events even with noConflict: true
const excludeList = ['value-changed'];

const shouldFireOriginalEvent = (eventName) => {
  return excludeList.includes(eventName);
};

let noConflict;

const shouldNotFireOriginalEvent = (eventName) => {
  const nc = getNoConflict$1();
  return !(nc.events && nc.events.includes && nc.events.includes(eventName));
};

const getNoConflict$1 = () => {
  if (noConflict === undefined) {
    noConflict = getNoConflict();
  }

  return noConflict;
};

const skipOriginalEvent = (eventName) => {
  const nc = getNoConflict$1();

  // Always fire these events
  if (shouldFireOriginalEvent(eventName)) {
    return false;
  }

  // Read from the configuration
  if (nc === true) {
    return true;
  }

  return !shouldNotFireOriginalEvent(eventName);
};
const eventProvider$1 = new EventProvider();
const LANG_CHANGE = 'languageChange';

const attachLanguageChange = (listener) => {
  eventProvider$1.attachEvent(LANG_CHANGE, listener);
};
let language;
let useDefaultLanguage;

/**
 * Returns the currently configured language, or the browser language as a fallback
 * @returns {String}
 */
const getLanguage$1 = () => {
  if (language === undefined) {
    language = getLanguage();
  }
  return language;
};

/**
 * Defines if the default language, that is inlined, should be used,
 * instead of fetching the language over the network.
 * <b>Note:</b> By default the language will be fetched.
 *
 * @param {Boolean} useDefaultLanguage
 */
const setUseDefaultLanguage = (useDefaultLang) => {
  useDefaultLanguage = useDefaultLang;
};

/**
 * Returns if the default language, that is inlined, should be used.
 * @returns {Boolean}
 */
const getUseDefaultLanguage$1 = () => {
  if (useDefaultLanguage === undefined) {
    setUseDefaultLanguage(getUseDefaultLanguage());
  }

  return useDefaultLanguage;
};
var getDesigntimePropertyAsArray = (value) => {
  const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
  return m && m[2] ? m[2].split(/,/) : null;
};
var detectNavigatorLanguage = () => {
  const browserLanguages = navigator.languages;

  const navigatorLanguage = () => {
    return navigator.language;
  };

  const rawLocale =
    (browserLanguages && browserLanguages[0]) ||
    navigatorLanguage() ||
    navigator.userLanguage ||
    navigator.browserLanguage;

  return rawLocale || DEFAULT_LANGUAGE;
};
const M_ISO639_OLD_TO_NEW = {
  iw: 'he',
  ji: 'yi',
  in: 'id',
  sh: 'sr'
};

const A_RTL_LOCALES = getDesigntimePropertyAsArray('$cldr-rtl-locales:ar,fa,he$') || [];

const impliesRTL = (language) => {
  language = (language && M_ISO639_OLD_TO_NEW[language]) || language;

  return A_RTL_LOCALES.indexOf(language) >= 0;
};

const getRTL$1 = () => {
  const configurationRTL = getRTL();

  if (configurationRTL !== null) {
    return !!configurationRTL;
  }

  return impliesRTL(getLanguage$1() || detectNavigatorLanguage());
};
const eventProvider$2 = new EventProvider();
const CUSTOM_CSS_CHANGE = 'CustomCSSChange';

const attachCustomCSSChange = (listener) => {
  eventProvider$2.attachEvent(CUSTOM_CSS_CHANGE, listener);
};

const customCSSFor = {};

const getCustomCSS = (tag) => {
  return customCSSFor[tag] ? customCSSFor[tag].join('') : '';
};
const effectiveStyleMap = new Map();

attachCustomCSSChange((tag) => {
  effectiveStyleMap.delete(tag);
});

const getEffectiveStyle = (ElementClass) => {
  const tag = ElementClass.getMetadata().getTag();

  if (!effectiveStyleMap.has(tag)) {
    const customStyle = getCustomCSS(tag) || '';
    const builtInStyles = getStylesString(ElementClass.styles);
    const effectiveStyle = `${builtInStyles} ${customStyle}`;
    effectiveStyleMap.set(tag, effectiveStyle);
  }

  return effectiveStyleMap.get(tag);
};
const constructableStyleMap = new Map();

attachCustomCSSChange((tag) => {
  constructableStyleMap.delete(tag);
});

/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
const getConstructableStyle = (ElementClass) => {
  const tag = ElementClass.getMetadata().getTag();

  if (!constructableStyleMap.has(tag)) {
    const styleContent = getEffectiveStyle(ElementClass);
    const style = new CSSStyleSheet();
    style.replaceSync(styleContent);
    constructableStyleMap.set(tag, [style]);
  }

  return constructableStyleMap.get(tag);
};
const findClosingParenthesisPos = (str, openingParenthesisPos) => {
  let opened = 1;
  for (let pos = openingParenthesisPos + 1; pos < str.length; pos++) {
    const char = str.charAt(pos);
    if (char === '(') {
      opened++;
    } else if (char === ')') {
      opened--;
    }
    if (opened === 0) {
      return pos;
    }
  }
};

const replaceSelector = (str, selector, selectorStartPos, replacement) => {
  const charAfterSelectorPos = selectorStartPos + selector.length;
  const charAfterSelector = str.charAt(charAfterSelectorPos);

  const upToSelector = str.substring(0, selectorStartPos) + replacement;
  if (charAfterSelector === '(') {
    const closingParenthesisPos = findClosingParenthesisPos(str, charAfterSelectorPos);
    return (
      upToSelector +
      str.substring(charAfterSelectorPos + 1, closingParenthesisPos) +
      str.substring(closingParenthesisPos + 1)
    );
  }

  return upToSelector + str.substring(charAfterSelectorPos);
};

/**
 * :host => ui5-button
 * :host([expr]) => ui5-button[expr]
 * ::slotted(expr) => expr
 * @param str - source string
 * @param selector - :host or ::slotted
 * @param replacement - normally tag name
 * @returns {*}
 */
const replaceSelectors = (str, selector, replacement) => {
  let selectorStartPos = str.indexOf(selector);
  while (selectorStartPos !== -1) {
    str = replaceSelector(str, selector, selectorStartPos, replacement);
    selectorStartPos = str.indexOf(selector);
  }
  return str;
};

const adaptLinePart = (line, tag, pureTag) => {
  line = line.trim();
  line = replaceSelectors(line, '::slotted', ``); // first remove all ::slotted() occurrences

  // Host selector - replace it
  if (line.startsWith(':host')) {
    return replaceSelector(line, ':host', 0, tag);
  }

  // Leave out @keyframes and keyframe values (0%, 100%, etc...)
  // csso shortens '100%' -> 'to', make sure to leave it untouched
  if (line.match(/^[@0-9]/) || line === 'to' || line === 'to{') {
    return line;
  }

  // IE specific selector (directly written with the tag, f.e. ui5-button {}) - keep it
  if (line.match(new RegExp(`^${tag}[^a-zA-Z0-9-]`))) {
    return line;
  }

  // IE specific selector (directly written with the tag attribute, f.e. [ui5-button] {}) - keep it
  if (pureTag && line.startsWith(`[${pureTag}]`)) {
    return line;
  }

  // No host and no tag in the beginning of the selector - prepend the tag
  return `${tag} ${line}`;
};

const adaptCSSForIE = (str, tag, pureTag) => {
  str = str.replace(/\n/g, ` `);
  str = str.replace(/([{}])/g, `$1\n`);
  let result = ``;
  const lines = str.split(`\n`);
  lines.forEach((line) => {
    const mustProcess = line.match(/{$/); // Only work on lines that end on {, otherwise just append to result
    if (mustProcess) {
      const lineParts = line.split(',');
      const processedLineParts = lineParts.map((linePart) => {
        return adaptLinePart(linePart, tag, pureTag);
      });
      line = processedLineParts.join(',');
    }
    result = `${result}${line}`;
  });
  return result;
};
const IEStyleSet = new Set();

attachCustomCSSChange((tag) => {
  IEStyleSet.delete(tag);
});

const getStaticStyle = (ElementClass) => {
  let componentStaticStyles = ElementClass.staticAreaStyles;
  if (Array.isArray(componentStaticStyles)) {
    componentStaticStyles = componentStaticStyles.join(' ');
  }

  return componentStaticStyles;
};

/**
 * Creates the needed CSS for a web component class in the head tag
 * Note: IE11, Edge
 * @param ElementClass
 */
const createComponentStyleTag = (ElementClass) => {
  const tag = ElementClass.getMetadata().getTag();
  const pureTag = ElementClass.getMetadata().getPureTag();
  if (IEStyleSet.has(tag)) {
    return;
  }

  let cssContent = getEffectiveStyle(ElementClass);
  cssContent = adaptCSSForIE(cssContent, tag, pureTag);

  // Append static CSS, if any, for IE
  let staticCssContent = getStaticStyle(ElementClass);
  if (staticCssContent) {
    staticCssContent = adaptCSSForIE(staticCssContent, 'ui5-static-area-item');
    cssContent = `${cssContent} ${staticCssContent}`;
  }

  createStyleInHead(cssContent, {
    'data-ui5-element-styles': tag
  });
  if (ponyfillNeeded()) {
    schedulePonyfill();
  }

  IEStyleSet.add(tag);
};

class Integer extends DataType {
  static isValid(value) {
    return Number.isInteger(value);
  }
}

class Float extends DataType {
  static isValid(value) {
    // Assuming that integers are floats as well!
    return Number(value) === value;
  }
}

// Note: disabled is present in IE so we explicitly allow it here.
// Others, such as title/hidden, we explicitly override, so valid too
const allowList = ['disabled', 'title', 'hidden', 'role', 'draggable'];

/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 *
 * @param name
 * @returns {boolean}
 */
const isValidPropertyName = (name) => {
  if (allowList.includes(name) || name.startsWith('aria')) {
    return true;
  }
  const classes = [HTMLElement, Element, Node];
  return !classes.some((klass) => klass.prototype.hasOwnProperty(name)); // eslint-disable-line
};
const metadata = {
  events: {
    '_property-change': {}
  }
};

let autoId = 0;

const elementTimeouts = new Map();
const uniqueDependenciesCache = new Map();

const GLOBAL_CONTENT_DENSITY_CSS_VAR = '--_ui5_content_density';
const GLOBAL_DIR_CSS_VAR = '--_ui5_dir';

/**
 * Base class for all UI5 Web Components
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.UI5Element
 * @extends HTMLElement
 * @public
 */
class UI5Element extends HTMLElement {
  constructor() {
    super();
    this._propertyChangeListeners = new Set();
    this._initializeState();
    this._upgradeAllProperties();
    this._initializeContainers();
    this._upToDate = false;
    this._inDOM = false;
    this._fullyConnected = false;

    let deferredResolve;
    this._domRefReadyPromise = new Promise((resolve) => {
      deferredResolve = resolve;
    });
    this._domRefReadyPromise._deferredResolve = deferredResolve;

    this._monitoredChildProps = new Map();
    this._shouldInvalidateParent = false;
  }

  addEventListener(type, listener, options) {
    if (type === '_property-change') {
      this._propertyChangeListeners.add(listener);
    }
    return super.addEventListener(type, listener, options);
  }

  removeEventListener(type, listener, options) {
    if (type === '_property-change') {
      this._propertyChangeListeners.delete(listener);
    }
    return super.removeEventListener(type, listener, options);
  }

  _hasPropertyChangeListeners() {
    return !!this._propertyChangeListeners.size;
  }

  /**
   * Returns a unique ID for this UI5 Element
   *
   * @deprecated - This property is not guaranteed in future releases
   * @protected
   */
  get _id() {
    if (!this.__id) {
      this.__id = `ui5wc_${++autoId}`;
    }

    return this.__id;
  }

  /**
   * @private
   */
  _initializeContainers() {
    const needsShadowDOM = this.constructor._needsShadowDOM();
    const needsStaticArea = this.constructor._needsStaticArea();

    // Init Shadow Root
    if (needsShadowDOM) {
      this.attachShadow({ mode: 'open' });
    }

    // Init StaticAreaItem only if needed
    if (needsStaticArea) {
      this.staticAreaItem = new StaticAreaItem(this);
    }
  }

  /**
   * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
   * @private
   */
  async connectedCallback() {
    this.setAttribute(this.constructor.getMetadata().getPureTag(), '');

    const needsShadowDOM = this.constructor._needsShadowDOM();
    const slotsAreManaged = this.constructor.getMetadata().slotsAreManaged();

    this._inDOM = true;

    if (slotsAreManaged) {
      // always register the observer before yielding control to the main thread (await)
      this._startObservingDOMChildren();
      await this._processChildren();
    }

    // Render the Shadow DOM
    if (needsShadowDOM) {
      if (!this.shadowRoot) {
        // Workaround for Firefox74 bug
        await Promise.resolve();
      }

      if (!this._inDOM) {
        // Component removed from DOM while _processChildren was running
        return;
      }

      RenderScheduler.register(this);
      RenderScheduler.renderImmediately(this);
      this._domRefReadyPromise._deferredResolve();
      this._fullyConnected = true;
      if (typeof this.onEnterDOM === 'function') {
        this.onEnterDOM();
      }
    }
  }

  /**
   * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
   * @private
   */
  disconnectedCallback() {
    const needsShadowDOM = this.constructor._needsShadowDOM();
    const needsStaticArea = this.constructor._needsStaticArea();
    const slotsAreManaged = this.constructor.getMetadata().slotsAreManaged();

    this._inDOM = false;

    if (slotsAreManaged) {
      this._stopObservingDOMChildren();
    }

    if (needsShadowDOM) {
      RenderScheduler.deregister(this);
      if (this._fullyConnected) {
        if (typeof this.onExitDOM === 'function') {
          this.onExitDOM();
        }
        this._fullyConnected = false;
      }
    }

    if (needsStaticArea) {
      this.staticAreaItem._removeFragmentFromStaticArea();
    }

    RenderScheduler.cancelRender(this);
  }

  /**
   * @private
   */
  _startObservingDOMChildren() {
    const shouldObserveChildren = this.constructor.getMetadata().hasSlots();
    if (!shouldObserveChildren) {
      return;
    }

    const canSlotText = this.constructor.getMetadata().canSlotText();
    const mutationObserverOptions = {
      childList: true,
      subtree: canSlotText,
      characterData: true
    };
    DOMObserver.observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
  }

  /**
   * @private
   */
  _stopObservingDOMChildren() {
    DOMObserver.unobserveDOMNode(this);
  }

  /**
   * Note: this method is also manually called by "compatibility/patchNodeValue.js"
   * @private
   */
  async _processChildren() {
    const hasSlots = this.constructor.getMetadata().hasSlots();
    if (hasSlots) {
      await this._updateSlots();
    }
  }

  /**
   * @private
   */
  async _updateSlots() {
    const slotsMap = this.constructor.getMetadata().getSlots();
    const canSlotText = this.constructor.getMetadata().canSlotText();
    const domChildren = Array.from(canSlotText ? this.childNodes : this.children);

    // Init the _state object based on the supported slots
    for (const [slotName, slotData] of Object.entries(slotsMap)) {
      // eslint-disable-line
      this._clearSlot(slotName, slotData);
    }

    const autoIncrementMap = new Map();
    const slottedChildrenMap = new Map();

    const allChildrenUpgraded = domChildren.map(async (child, idx) => {
      // Determine the type of the child (mainly by the slot attribute)
      const slotName = this.constructor._getSlotName(child);
      const slotData = slotsMap[slotName];

      // Check if the slotName is supported
      if (slotData === undefined) {
        const validValues = Object.keys(slotsMap).join(', ');
        console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line
        return;
      }

      // For children that need individual slots, calculate them
      if (slotData.individualSlots) {
        const nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
        autoIncrementMap.set(slotName, nextIndex);
        child._individualSlot = `${slotName}-${nextIndex}`;
      }

      // Await for not-yet-defined custom elements
      if (child instanceof HTMLElement) {
        const localName = child.localName;
        const isCustomElement = localName.includes('-');
        if (isCustomElement) {
          const isDefined = window.customElements.get(localName);
          if (!isDefined) {
            const whenDefinedPromise = window.customElements.whenDefined(localName); // Class registered, but instances not upgraded yet
            let timeoutPromise = elementTimeouts.get(localName);
            if (!timeoutPromise) {
              timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1000));
              elementTimeouts.set(localName, timeoutPromise);
            }
            await Promise.race([whenDefinedPromise, timeoutPromise]);
          }
          window.customElements.upgrade(child);
        }
      }

      child = this.constructor.getMetadata().constructor.validateSlotValue(child, slotData);

      if (child.isUI5Element && slotData.listenFor) {
        this._attachChildPropertyUpdated(child, slotData.listenFor);
      }

      if (child.isUI5Element && slotData.invalidateParent) {
        child._shouldInvalidateParent = true;
      }

      if (isSlot(child)) {
        this._attachSlotChange(child);
      }

      const propertyName = slotData.propertyName || slotName;

      if (slottedChildrenMap.has(propertyName)) {
        slottedChildrenMap.get(propertyName).push({ child, idx });
      } else {
        slottedChildrenMap.set(propertyName, [{ child, idx }]);
      }
    });

    await Promise.all(allChildrenUpgraded);

    // Distribute the child in the _state object, keeping the Light DOM order,
    // not the order elements are defined.
    slottedChildrenMap.forEach((children, slot) => {
      this._state[slot] = children.sort((a, b) => a.idx - b.idx).map((_) => _.child);
    });
    this._invalidate('slots');
  }

  /**
   * Removes all children from the slot and detaches listeners, if any
   * @private
   */
  _clearSlot(slotName, slotData) {
    const propertyName = slotData.propertyName || slotName;

    let children = this._state[propertyName];
    if (!Array.isArray(children)) {
      children = [children];
    }

    children.forEach((child) => {
      if (child && child.isUI5Element) {
        this._detachChildPropertyUpdated(child);
        child._shouldInvalidateParent = false;
      }

      if (isSlot(child)) {
        this._detachSlotChange(child);
      }
    });

    this._state[propertyName] = [];
    this._invalidate(propertyName, []);
  }

  /**
   * Do not override this method in derivatives of UI5Element
   * @private
   */
  attributeChangedCallback(name, oldValue, newValue) {
    const properties = this.constructor.getMetadata().getProperties();
    const realName = name.replace(/^ui5-/, '');
    const nameInCamelCase = kebabToCamelCase(realName);
    if (properties.hasOwnProperty(nameInCamelCase)) {
      // eslint-disable-line
      const propertyTypeClass = properties[nameInCamelCase].type;
      if (propertyTypeClass === Boolean) {
        newValue = newValue !== null;
      }
      if (propertyTypeClass === Integer) {
        newValue = parseInt(newValue);
      }
      if (propertyTypeClass === Float) {
        newValue = parseFloat(newValue);
      }
      this[nameInCamelCase] = newValue;
    }
  }

  /**
   * @private
   */
  _updateAttribute(name, newValue) {
    if (!this.constructor.getMetadata().hasAttribute(name)) {
      return;
    }

    if (typeof newValue === 'object') {
      return;
    }

    const attrName = camelToKebabCase(name);
    const attrValue = this.getAttribute(attrName);
    if (typeof newValue === 'boolean') {
      if (newValue === true && attrValue === null) {
        this.setAttribute(attrName, '');
      } else if (newValue === false && attrValue !== null) {
        this.removeAttribute(attrName);
      }
    } else if (attrValue !== newValue) {
      this.setAttribute(attrName, newValue);
    }
  }

  /**
   * @private
   */
  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      // eslint-disable-line
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  /**
   * @private
   */
  _upgradeAllProperties() {
    const allProps = this.constructor.getMetadata().getPropertiesList();
    allProps.forEach(this._upgradeProperty, this);
  }

  /**
   * @private
   */
  _initializeState() {
    const defaultState = this.constructor._getDefaultState();
    this._state = Object.assign({}, defaultState);
  }

  /**
   * @private
   */
  _attachChildPropertyUpdated(child, listenFor) {
    const slotName = this.constructor._getSlotName(child); // all slotted children have the same configuration

    let observedProps = [],
      notObservedProps = [];

    if (Array.isArray(listenFor)) {
      observedProps = listenFor;
    } else {
      observedProps = Array.isArray(listenFor.include) ? listenFor.include : [];
      notObservedProps = Array.isArray(listenFor.exclude) ? listenFor.exclude : [];
    }

    if (!this._monitoredChildProps.has(slotName)) {
      this._monitoredChildProps.set(slotName, { observedProps, notObservedProps });
    }

    child.addEventListener('_property-change', this._invalidateParentOnPropertyUpdate);
  }

  /**
   * @private
   */
  _detachChildPropertyUpdated(child) {
    child.removeEventListener('_property-change', this._invalidateParentOnPropertyUpdate);
  }

  /**
   *  @private
   */
  _propertyChange(name, value) {
    this._updateAttribute(name, value);

    if (this._hasPropertyChangeListeners()) {
      this.dispatchEvent(
        new CustomEvent('_property-change', {
          detail: { name, newValue: value },
          composed: false,
          bubbles: false
        })
      );
    }
  }

  /**
   * @private
   */
  _invalidateParentOnPropertyUpdate(prop) {
    // The web component to be invalidated
    const parentNode = this.parentNode;
    if (!parentNode) {
      return;
    }

    const slotName = parentNode.constructor._getSlotName(this);
    const propsMetadata = parentNode._monitoredChildProps.get(slotName);

    if (!propsMetadata) {
      return;
    }
    const { observedProps, notObservedProps } = propsMetadata;

    const allPropertiesAreObserved = observedProps.length === 1 && observedProps[0] === '*';
    const shouldObserve = allPropertiesAreObserved || observedProps.includes(prop.detail.name);
    const shouldSkip = notObservedProps.includes(prop.detail.name);
    if (shouldObserve && !shouldSkip) {
      parentNode._invalidate('_parent_', this);
    }
  }

  /**
   * @private
   */
  _attachSlotChange(child) {
    if (!this._invalidateOnSlotChange) {
      this._invalidateOnSlotChange = () => {
        this._invalidate('slotchange');
      };
    }
    child.addEventListener('slotchange', this._invalidateOnSlotChange);
  }

  /**
   * @private
   */
  _detachSlotChange(child) {
    child.removeEventListener('slotchange', this._invalidateOnSlotChange);
  }

  /**
   * Asynchronously re-renders an already rendered web component
   * @private
   */
  _invalidate() {
    if (this._shouldInvalidateParent) {
      this.parentNode._invalidate();
    }

    if (!this._upToDate) {
      // console.log("already invalidated", this, ...arguments);
      return;
    }

    if (this.getDomRef() && !this._suppressInvalidation) {
      this._upToDate = false;
      // console.log("INVAL", this, ...arguments);
      RenderScheduler.renderDeferred(this);
    }
  }

  /**
   * Do not call this method directly, only intended to be called by RenderScheduler.js
   * @protected
   */
  _render() {
    const hasIndividualSlots = this.constructor.getMetadata().hasIndividualSlots();

    // suppress invalidation to prevent state changes scheduling another rendering
    this._suppressInvalidation = true;

    if (typeof this.onBeforeRendering === 'function') {
      this.onBeforeRendering();
    }

    // Intended for framework usage only. Currently ItemNavigation updates tab indexes after the component has updated its state but before the template is rendered
    if (this._onComponentStateFinalized) {
      this._onComponentStateFinalized();
    }

    // resume normal invalidation handling
    delete this._suppressInvalidation;

    // Update the shadow root with the render result
    // console.log(this.getDomRef() ? "RE-RENDER" : "FIRST RENDER", this);
    this._upToDate = true;
    this._updateShadowRoot();

    if (this._shouldUpdateFragment()) {
      this.staticAreaItem._updateFragment(this);
    }

    // Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM
    if (hasIndividualSlots) {
      this._assignIndividualSlotsToChildren();
    }

    // Call the onAfterRendering hook
    if (typeof this.onAfterRendering === 'function') {
      this.onAfterRendering();
    }
  }

  /**
   * @private
   */
  _updateShadowRoot() {
    if (!this.constructor._needsShadowDOM()) {
      return;
    }

    let styleToPrepend;
    const renderResult = executeTemplate(this.constructor.template, this);

    // IE11, Edge
    if (window.ShadyDOM) {
      createComponentStyleTag(this.constructor);
    }

    // Chrome
    if (document.adoptedStyleSheets) {
      this.shadowRoot.adoptedStyleSheets = getConstructableStyle(this.constructor);
    }

    // FF, Safari
    if (!document.adoptedStyleSheets && !window.ShadyDOM) {
      styleToPrepend = getEffectiveStyle(this.constructor);
    }

    this.constructor.render(renderResult, this.shadowRoot, styleToPrepend, { eventContext: this });
  }

  /**
   * @private
   */
  _assignIndividualSlotsToChildren() {
    const domChildren = Array.from(this.children);

    domChildren.forEach((child) => {
      if (child._individualSlot) {
        child.setAttribute('slot', child._individualSlot);
      }
    });
  }

  /**
   * @private
   */
  _waitForDomRef() {
    return this._domRefReadyPromise;
  }

  /**
   * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
   * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
   * @public
   */
  getDomRef() {
    if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
      return;
    }

    return this.shadowRoot.children.length === 1 ? this.shadowRoot.children[0] : this.shadowRoot.children[1];
  }

  /**
   * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
   * This is the element that will receive the focus by default.
   * @public
   */
  getFocusDomRef() {
    const domRef = this.getDomRef();
    if (domRef) {
      const focusRef = domRef.querySelector('[data-sap-focus-ref]');
      return focusRef || domRef;
    }
  }

  /**
   * Use this method in order to get a reference to element in the shadow root of a web component
   * @public
   * @param {String} refName Defines the name of the stable DOM ref
   */
  getStableDomRef(refName) {
    return this.getDomRef().querySelector(`[data-ui5-stable=${refName}]`);
  }

  /**
   * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
   * @public
   */
  async focus() {
    await this._waitForDomRef();

    const focusDomRef = this.getFocusDomRef();

    if (focusDomRef && typeof focusDomRef.focus === 'function') {
      focusDomRef.focus();
    }
  }

  /**
   *
   * @public
   * @param name - name of the event
   * @param data - additional data for the event
   * @param cancelable - true, if the user can call preventDefault on the event object
   * @param bubbles - true, if the event bubbles
   * @returns {boolean} false, if the event was cancelled (preventDefault called), true otherwise
   */
  fireEvent(name, data, cancelable = false, bubbles = true) {
    const eventResult = this._fireEvent(name, data, cancelable, bubbles);
    const camelCaseEventName = kebabToCamelCase(name);

    if (camelCaseEventName !== name) {
      return eventResult && this._fireEvent(camelCaseEventName, data, cancelable);
    }

    return eventResult;
  }

  _fireEvent(name, data, cancelable = false, bubbles = true) {
    let compatEventResult = true; // Initialized to true, because if the event is not fired at all, it should be considered "not-prevented"

    const noConflictEvent = new CustomEvent(`ui5-${name}`, {
      detail: data,
      composed: false,
      bubbles,
      cancelable
    });

    // This will be false if the compat event is prevented
    compatEventResult = this.dispatchEvent(noConflictEvent);

    if (skipOriginalEvent(name)) {
      return compatEventResult;
    }

    const customEvent = new CustomEvent(name, {
      detail: data,
      composed: false,
      bubbles,
      cancelable
    });

    // This will be false if the normal event is prevented
    const normalEventResult = this.dispatchEvent(customEvent);

    // Return false if any of the two events was prevented (its result was false).
    return normalEventResult && compatEventResult;
  }

  /**
   * Returns the actual children, associated with a slot.
   * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
   * @public
   */
  getSlottedNodes(slotName) {
    const reducer = (acc, curr) => {
      if (!isSlot(curr)) {
        return acc.concat([curr]);
      }
      return acc.concat(curr.assignedNodes({ flatten: true }).filter((item) => item instanceof HTMLElement));
    };

    return this[slotName].reduce(reducer, []);
  }

  get isCompact() {
    return getComputedStyle(this).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR) === 'compact';
  }

  /**
   * Determines whether the component should be rendered in RTL mode or not.
   * Returns: "rtl", "ltr" or undefined
   *
   * @public
   * @returns {String|undefined}
   */
  get effectiveDir() {
    markAsRtlAware(this.constructor); // if a UI5 Element calls this method, it's considered to be rtl-aware

    const doc = window.document;
    const dirValues = ['ltr', 'rtl']; // exclude "auto" and "" from all calculations
    const locallyAppliedDir = getComputedStyle(this).getPropertyValue(GLOBAL_DIR_CSS_VAR);

    // In that order, inspect the CSS Var (for modern browsers), the element itself, html and body (for IE fallback)
    if (dirValues.includes(locallyAppliedDir)) {
      return locallyAppliedDir;
    }
    if (dirValues.includes(this.dir)) {
      return this.dir;
    }
    if (dirValues.includes(doc.documentElement.dir)) {
      return doc.documentElement.dir;
    }
    if (dirValues.includes(doc.body.dir)) {
      return doc.body.dir;
    }

    // Finally, check the configuration for explicitly set RTL or language-implied RTL
    return getRTL$1() ? 'rtl' : undefined;
  }

  updateStaticAreaItemContentDensity() {
    if (this.staticAreaItem) {
      this.staticAreaItem._updateContentDensity(this.isCompact);
    }
  }

  /**
   * Used to duck-type UI5 elements without using instanceof
   * @returns {boolean}
   * @public
   */
  get isUI5Element() {
    return true;
  }

  /**
   * Do not override this method in derivatives of UI5Element, use metadata properties instead
   * @private
   */
  static get observedAttributes() {
    return this.getMetadata().getAttributesList();
  }

  /**
   * @private
   */
  static _getSlotName(child) {
    // Text nodes can only go to the default slot
    if (!(child instanceof HTMLElement)) {
      return 'default';
    }

    // Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)
    const slot = child.getAttribute('slot');
    if (slot) {
      const match = slot.match(/^(.+?)-\d+$/);
      return match ? match[1] : slot;
    }

    // Use default slot as a fallback
    return 'default';
  }

  /**
   * @private
   */
  static _needsShadowDOM() {
    return !!this.template;
  }

  _shouldUpdateFragment() {
    return this.constructor._needsStaticArea() && this.staticAreaItem.isRendered();
  }

  /**
   * @private
   */
  static _needsStaticArea() {
    return typeof this.staticAreaTemplate === 'function';
  }

  /**
   * @public
   */
  getStaticAreaItemDomRef() {
    return this.staticAreaItem.getDomRef();
  }

  /**
   * @private
   */
  static _getDefaultState() {
    if (this._defaultState) {
      return this._defaultState;
    }

    const MetadataClass = this.getMetadata();
    const defaultState = {};
    const slotsAreManaged = MetadataClass.slotsAreManaged();

    // Initialize properties
    const props = MetadataClass.getProperties();
    for (const propName in props) {
      // eslint-disable-line
      const propType = props[propName].type;
      const propDefaultValue = props[propName].defaultValue;

      if (propType === Boolean) {
        defaultState[propName] = false;

        if (propDefaultValue !== undefined) {
          console.warn(
            "The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default"
          ); // eslint-disable-line
        }
      } else if (props[propName].multiple) {
        defaultState[propName] = [];
      } else if (propType === Object) {
        defaultState[propName] = 'defaultValue' in props[propName] ? props[propName].defaultValue : {};
      } else if (propType === String) {
        defaultState[propName] = 'defaultValue' in props[propName] ? props[propName].defaultValue : '';
      } else {
        defaultState[propName] = propDefaultValue;
      }
    }

    // Initialize slots
    if (slotsAreManaged) {
      const slots = MetadataClass.getSlots();
      for (const [slotName, slotData] of Object.entries(slots)) {
        // eslint-disable-line
        const propertyName = slotData.propertyName || slotName;
        defaultState[propertyName] = [];
      }
    }

    this._defaultState = defaultState;
    return defaultState;
  }

  /**
   * @private
   */
  static _generateAccessors() {
    const proto = this.prototype;
    const slotsAreManaged = this.getMetadata().slotsAreManaged();

    // Properties
    const properties = this.getMetadata().getProperties();
    for (const [prop, propData] of Object.entries(properties)) {
      // eslint-disable-line
      if (!isValidPropertyName(prop)) {
        console.warn(
          `"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`
        ); /* eslint-disable-line */
      }

      if (propData.type === Boolean && propData.defaultValue) {
        throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
      }

      if (propData.type === Array) {
        throw new Error(
          `Wrong type for property "${prop}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`
        );
      }

      if (propData.type === Object && propData.defaultValue) {
        throw new Error(
          `Cannot set a default value for property "${prop}". All properties of type "Object" are empty objects by default.`
        );
      }

      if (propData.multiple && propData.defaultValue) {
        throw new Error(
          `Cannot set a default value for property "${prop}". All multiple properties are empty arrays by default.`
        );
      }

      Object.defineProperty(proto, prop, {
        get() {
          if (this._state[prop] !== undefined) {
            return this._state[prop];
          }

          const propDefaultValue = propData.defaultValue;

          if (propData.type === Boolean) {
            return false;
          } else if (propData.type === String) {
            // eslint-disable-line
            return propDefaultValue;
          } else if (propData.multiple) {
            // eslint-disable-line
            return [];
          } else {
            return propDefaultValue;
          }
        },
        set(value) {
          value = this.constructor.getMetadata().constructor.validatePropertyValue(value, propData);

          const oldState = this._state[prop];

          if (oldState !== value) {
            this._state[prop] = value;
            this._invalidate(prop, value);
            this._propertyChange(prop, value);
          }
        }
      });
    }

    // Slots
    if (slotsAreManaged) {
      const slots = this.getMetadata().getSlots();
      for (const [slotName, slotData] of Object.entries(slots)) {
        // eslint-disable-line
        if (!isValidPropertyName(slotName)) {
          console.warn(
            `"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`
          ); /* eslint-disable-line */
        }

        const propertyName = slotData.propertyName || slotName;
        Object.defineProperty(proto, propertyName, {
          get() {
            if (this._state[propertyName] !== undefined) {
              return this._state[propertyName];
            }
            return [];
          },
          set() {
            throw new Error('Cannot set slots directly, use the DOM APIs');
          }
        });
      }
    }
  }

  /**
   * Returns the metadata object for this UI5 Web Component Class
   * @protected
   */
  static get metadata() {
    return metadata;
  }

  /**
   * Returns the CSS for this UI5 Web Component Class
   * @protected
   */
  static get styles() {
    return '';
  }

  /**
   * Returns the Static Area CSS for this UI5 Web Component Class
   * @protected
   */
  static get staticAreaStyles() {
    return '';
  }

  /**
   * Returns an array with the dependencies for this UI5 Web Component, which could be:
   *  - composed components (used in its shadow root or static area item)
   *  - slotted components that the component may need to communicate with
   *
   * @protected
   */
  static get dependencies() {
    return [];
  }

  /**
   * Returns a list of the unique dependencies for this UI5 Web Component
   *
   * @public
   */
  static getUniqueDependencies() {
    if (!uniqueDependenciesCache.has(this)) {
      const filtered = this.dependencies.filter((dep, index, deps) => deps.indexOf(dep) === index);
      uniqueDependenciesCache.set(this, filtered);
    }

    return uniqueDependenciesCache.get(this);
  }

  /**
   * Returns a promise that resolves whenever all dependencies for this UI5 Web Component have resolved
   *
   * @returns {Promise<any[]>}
   */
  static whenDependenciesDefined() {
    return Promise.all(this.getUniqueDependencies().map((dep) => dep.define()));
  }

  /**
   * Hook that will be called upon custom element definition
   *
   * @protected
   * @returns {Promise<void>}
   */
  static async onDefine() {
    return Promise.resolve();
  }

  /**
   * Registers a UI5 Web Component in the browser window object
   * @public
   * @returns {Promise<UI5Element>}
   */
  static async define() {
    await boot();

    await Promise.all([this.whenDependenciesDefined(), this.onDefine()]);

    const tag = this.getMetadata().getTag();
    const altTag = this.getMetadata().getAltTag();

    const definedLocally = isTagRegistered(tag);
    const definedGlobally = customElements.get(tag);

    if (definedGlobally && !definedLocally) {
      recordTagRegistrationFailure(tag);
    } else if (!definedGlobally) {
      this._generateAccessors();
      registerTag(tag);
      window.customElements.define(tag, this);

      if (altTag && !customElements.get(altTag)) {
        class oldClassName extends this {}
        registerTag(altTag);
        window.customElements.define(altTag, oldClassName);
      }
    }
    return this;
  }

  /**
   * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
   * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
   * @public
   * @returns {UI5ElementMetadata}
   */
  static getMetadata() {
    if (this.hasOwnProperty('_metadata')) {
      // eslint-disable-line
      return this._metadata;
    }

    const metadataObjects = [this.metadata];
    let klass = this; // eslint-disable-line
    while (klass !== UI5Element) {
      klass = Object.getPrototypeOf(klass);
      metadataObjects.unshift(klass.metadata);
    }
    const mergedMetadata = fnMerge$1({}, ...metadataObjects);

    this._metadata = new UI5ElementMetadata(mergedMetadata);
    return this._metadata;
  }
} /**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive =
  (f) =>
  (...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
  };
const isDirective = (o) => {
  return typeof o === 'function' && directives.has(o);
}; /**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill =
  typeof window !== 'undefined' &&
  window.customElements != null &&
  window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.insertBefore(start, before);
    start = n;
  }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
}; /**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {}; /**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */
class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = [];
    // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
    const walker = document.createTreeWalker(
      element.content,
      133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,
      null,
      false
    );
    // Keeps track of the last index associated with a part. We try to delete
    // unnecessary nodes, but we never want to associate two different parts
    // to the same index. They must have a constant node between.
    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const {
      strings,
      values: { length }
    } = result;
    while (partIndex < length) {
      const node = walker.nextNode();
      if (node === null) {
        // We've exhausted the content inside a nested template element.
        // Because we still have parts (the outer for-loop), we know:
        // - There is a template in the stack
        // - The walker will find a nextNode outside the template
        walker.currentNode = stack.pop();
        continue;
      }
      index++;
      if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
        if (node.hasAttributes()) {
          const attributes = node.attributes;
          const { length } = attributes;
          // Per
          // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
          // attributes are not guaranteed to be returned in document order.
          // In particular, Edge/IE can return them out of order, so we cannot
          // assume a correspondence between part index and attribute index.
          let count = 0;
          for (let i = 0; i < length; i++) {
            if (endsWith(attributes[i].name, boundAttributeSuffix)) {
              count++;
            }
          }
          while (count-- > 0) {
            // Get the template literal section leading up to the first
            // expression in this attribute
            const stringForPart = strings[partIndex];
            // Find the attribute name
            const name = lastAttributeNameRegex.exec(stringForPart)[2];
            // Find the corresponding attribute
            // All bound attributes have had a suffix added in
            // TemplateResult#getHTML to opt out of special attribute
            // handling. To look up the attribute value we also need to add
            // the suffix.
            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
            const attributeValue = node.getAttribute(attributeLookupName);
            node.removeAttribute(attributeLookupName);
            const statics = attributeValue.split(markerRegex);
            this.parts.push({ type: 'attribute', index, name, strings: statics });
            partIndex += statics.length - 1;
          }
        }
        if (node.tagName === 'TEMPLATE') {
          stack.push(node);
          walker.currentNode = node.content;
        }
      } else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
        const data = node.data;
        if (data.indexOf(marker) >= 0) {
          const parent = node.parentNode;
          const strings = data.split(markerRegex);
          const lastIndex = strings.length - 1;
          // Generate a new text node for each literal section
          // These nodes are also used as the markers for node parts
          for (let i = 0; i < lastIndex; i++) {
            let insert;
            let s = strings[i];
            if (s === '') {
              insert = createMarker();
            } else {
              const match = lastAttributeNameRegex.exec(s);
              if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
              }
              insert = document.createTextNode(s);
            }
            parent.insertBefore(insert, node);
            this.parts.push({ type: 'node', index: ++index });
          }
          // If there's no text, we must insert a comment to mark our place.
          // Else, we can trust it will stick around after cloning.
          if (strings[lastIndex] === '') {
            parent.insertBefore(createMarker(), node);
            nodesToRemove.push(node);
          } else {
            node.data = strings[lastIndex];
          }
          // We have a part for each match found
          partIndex += lastIndex;
        }
      } else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
        if (node.data === marker) {
          const parent = node.parentNode;
          // Add a new marker node to be the startNode of the Part if any of
          // the following are true:
          //  * We don't have a previousSibling
          //  * The previousSibling is already the start of a previous part
          if (node.previousSibling === null || index === lastPartIndex) {
            index++;
            parent.insertBefore(createMarker(), node);
          }
          lastPartIndex = index;
          this.parts.push({ type: 'node', index });
          // If we don't have a nextSibling, keep this node so we have an end.
          // Else, we can remove it to save future costs.
          if (node.nextSibling === null) {
            node.data = '';
          } else {
            nodesToRemove.push(node);
            index--;
          }
          partIndex++;
        } else {
          let i = -1;
          while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
            // Comment node has a binding marker inside, make an inactive part
            // The binding won't work, but subsequent bindings will
            // TODO (justinfagnani): consider whether it's even worth it to
            // make bindings in comments work
            this.parts.push({ type: 'node', index: -1 });
            partIndex++;
          }
        }
      }
    }
    // Remove text binding nodes after the walk to not disturb the TreeWalker
    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }
}
const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex =
  // eslint-disable-next-line no-control-regex
  /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/; /**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }
  update(values) {
    let i = 0;
    for (const part of this.__parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }
      i++;
    }
    for (const part of this.__parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }
  _clone() {
    // There are a number of steps in the lifecycle of a template instance's
    // DOM fragment:
    //  1. Clone - create the instance fragment
    //  2. Adopt - adopt into the main document
    //  3. Process - find part markers and create parts
    //  4. Upgrade - upgrade custom elements
    //  5. Update - set node, attribute, property, etc., values
    //  6. Connect - connect to the document. Optional and outside of this
    //     method.
    //
    // We have a few constraints on the ordering of these steps:
    //  * We need to upgrade before updating, so that property values will pass
    //    through any property setters.
    //  * We would like to process before upgrading so that we're sure that the
    //    cloned fragment is inert and not disturbed by self-modifying DOM.
    //  * We want custom elements to upgrade even in disconnected fragments.
    //
    // Given these constraints, with full custom elements support we would
    // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
    //
    // But Safari does not implement CustomElementRegistry#upgrade, so we
    // can not implement that order and still have upgrade-before-update and
    // upgrade disconnected fragments. So we instead sacrifice the
    // process-before-upgrade constraint, since in Custom Elements v1 elements
    // must not modify their light DOM in the constructor. We still have issues
    // when co-existing with CEv0 elements like Polymer 1, and with polyfills
    // that don't strictly adhere to the no-modification rule because shadow
    // DOM, which may be created in the constructor, is emulated by being placed
    // in the light DOM.
    //
    // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
    // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
    // in one step.
    //
    // The Custom Elements v1 polyfill supports upgrade(), so the order when
    // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
    // Connect.
    const fragment = isCEPolyfill
      ? this.template.element.content.cloneNode(true)
      : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts;
    // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
    const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode();
    // Loop through all the nodes and parts of a template
    while (partIndex < parts.length) {
      part = parts[partIndex];
      if (!isTemplatePartActive(part)) {
        this.__parts.push(undefined);
        partIndex++;
        continue;
      }
      // Progress the tree walker until we find our next part's node.
      // Note that multiple parts may share the same node (attribute parts
      // on a single element), so this loop may not run at all.
      while (nodeIndex < part.index) {
        nodeIndex++;
        if (node.nodeName === 'TEMPLATE') {
          stack.push(node);
          walker.currentNode = node.content;
        }
        if ((node = walker.nextNode()) === null) {
          // We've exhausted the content inside a nested template element.
          // Because we still have parts (the outer for-loop), we know:
          // - There is a template in the stack
          // - The walker will find a nextNode outside the template
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      }
      // We've arrived at our part's node.
      if (part.type === 'node') {
        const part = this.processor.handleTextExpression(this.options);
        part.insertAfterNode(node.previousSibling);
        this.__parts.push(part);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }
      partIndex++;
    }
    if (isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }
    return fragment;
  }
} /**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes && trustedTypes.createPolicy('lit-html', { createHTML: (s) => s });
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */
  getHTML() {
    const l = this.strings.length - 1;
    let html = '';
    let isCommentBinding = false;
    for (let i = 0; i < l; i++) {
      const s = this.strings[i];
      // For each binding we want to determine the kind of marker to insert
      // into the template source before it's parsed by the browser's HTML
      // parser. The marker type is based on whether the expression is in an
      // attribute, text, or comment position.
      //   * For node-position bindings we insert a comment with the marker
      //     sentinel as its text content, like <!--{{lit-guid}}-->.
      //   * For attribute bindings we insert just the marker sentinel for the
      //     first binding, so that we support unquoted attribute bindings.
      //     Subsequent bindings can use a comment marker because multi-binding
      //     attributes must be quoted.
      //   * For comment bindings we insert just the marker sentinel so we don't
      //     close the comment.
      //
      // The following code scans the template source, but is *not* an HTML
      // parser. We don't need to track the tree structure of the HTML, only
      // whether a binding is inside a comment, and if not, if it appears to be
      // the first binding in an attribute.
      const commentOpen = s.lastIndexOf('<!--');
      // We're in comment position if we have a comment open with no following
      // comment close. Because <-- can appear in an attribute value there can
      // be false positives.
      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1;
      // Check to see if we have an attribute-like sequence preceding the
      // expression. This can match "name=value" like structures in text,
      // comments, and attribute values, so there can be false-positives.
      const attributeMatch = lastAttributeNameRegex.exec(s);
      if (attributeMatch === null) {
        // We're only in this branch if we don't have a attribute-like
        // preceding sequence. For comments, this guards against unusual
        // attribute values like <div foo="<!--${'bar'}">. Cases like
        // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
        // below.
        html += s + (isCommentBinding ? commentMarker : nodeMarker);
      } else {
        // For attributes we use just a marker sentinel, and also append a
        // $lit$ suffix to the name to opt-out of attribute-specific parsing
        // that IE and Edge do for style and certain SVG attributes.
        html +=
          s.substr(0, attributeMatch.index) +
          attributeMatch[1] +
          attributeMatch[2] +
          boundAttributeSuffix +
          attributeMatch[3] +
          marker;
      }
    }
    html += this.strings[l];
    return html;
  }
  getTemplateElement() {
    const template = document.createElement('template');
    let value = this.getHTML();
    if (policy !== undefined) {
      // this is secure because `this.strings` is a TemplateStringsArray.
      // TODO: validate this when
      // https://github.com/tc39/proposal-array-is-template-object is
      // implemented.
      value = policy.createHTML(value);
    }
    template.innerHTML = value;
    return template;
  }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }
  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    reparentNodes(content, svgElement.firstChild);
    return template;
  }
} /**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = (value) => {
  return value === null || !(typeof value === 'object' || typeof value === 'function');
};
const isIterable = (value) => {
  return (
    Array.isArray(value) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!(value && value[Symbol.iterator])
  );
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];
    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */
  _createPart() {
    return new AttributePart(this);
  }
  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts = this.parts;
    // If we're assigning an attribute via syntax like:
    //    attr="${foo}"  or  attr=${foo}
    // but not
    //    attr="${foo} ${bar}" or attr="${foo} baz"
    // then we don't want to coerce the attribute value into one long
    // string. Instead we want to just return the value itself directly,
    // so that sanitizeDOMValue can get the actual value rather than
    // String(value)
    // The exception is if v is an array, in which case we do want to smash
    // it together into a string without calling String() on the array.
    //
    // This also allows trusted values (when using TrustedTypes) being
    // assigned to DOM sinks without being stringified in the process.
    if (l === 1 && strings[0] === '' && strings[1] === '') {
      const v = parts[0].value;
      if (typeof v === 'symbol') {
        return String(v);
      }
      if (typeof v === 'string' || !isIterable(v)) {
        return v;
      }
    }
    let text = '';
    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = parts[i];
      if (part !== undefined) {
        const v = part.value;
        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === 'string' ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        }
      }
    }
    text += strings[l];
    return text;
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
  constructor(committer) {
    this.value = undefined;
    this.committer = committer;
  }
  setValue(value) {
    if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value;
      // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().
      if (!isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }
  commit() {
    while (isDirective(this.value)) {
      const directive = this.value;
      this.value = noChange;
      directive(this);
    }
    if (this.value === noChange) {
      return;
    }
    this.committer.commit();
  }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
  constructor(options) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.options = options;
  }
  /**
   * Appends this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  appendInto(container) {
    this.startNode = container.appendChild(createMarker());
    this.endNode = container.appendChild(createMarker());
  }
  /**
   * Inserts this part after the `ref` node (between `ref` and `ref`'s next
   * sibling). Both `ref` and its next sibling must be static, unchanging nodes
   * such as those that appear in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  appendIntoPart(part) {
    part.__insert((this.startNode = createMarker()));
    part.__insert((this.endNode = createMarker()));
  }
  /**
   * Inserts this part after the `ref` part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  insertAfterPart(ref) {
    ref.__insert((this.startNode = createMarker()));
    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }
    while (isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = noChange;
      directive(this);
    }
    const value = this.__pendingValue;
    if (value === noChange) {
      return;
    }
    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === nothing) {
      this.value = nothing;
      this.clear();
    } else {
      // Fallback, will render the string representation
      this.__commitText(value);
    }
  }
  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }
  __commitNode(value) {
    if (this.value === value) {
      return;
    }
    this.clear();
    this.__insert(value);
    this.value = value;
  }
  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? '' : value;
    // If `value` isn't already a string, we explicitly convert it here in case
    // it can't be implicitly converted - i.e. it's a symbol.
    const valueAsString = typeof value === 'string' ? value : String(value);
    if (node === this.endNode.previousSibling && node.nodeType === 3 /* Node.TEXT_NODE */) {
      // If we only have a single text node between the markers, we can just
      // set its value, rather than replacing it.
      // TODO(justinfagnani): Can we just check if this.value is primitive?
      node.data = valueAsString;
    } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }
    this.value = value;
  }
  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);
    if (this.value instanceof TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use its syntax extension, etc. The template factory comes
      // from the render function options so that it can control template
      // caching and preprocessing.
      const instance = new TemplateInstance(template, value.processor, this.options);
      const fragment = instance._clone();
      instance.update(value.values);
      this.__commitNode(fragment);
      this.value = instance;
    }
  }
  __commitIterable(value) {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    }
    // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render
    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex];
      // If no existing part, create a new one
      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);
        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }
      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }
  clear(startNode = this.startNode) {
    removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this.__pendingValue = undefined;
    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }
    this.element = element;
    this.name = name;
    this.strings = strings;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = noChange;
      directive(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const value = !!this.__pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }
      this.value = value;
    }
    this.__pendingValue = noChange;
  }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
  }
  _createPart() {
    return new PropertyPart(this);
  }
  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }
    return super._getValue();
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.element[this.name] = this._getValue();
    }
  }
}
class PropertyPart extends AttributePart {}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener('test', options, options);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.removeEventListener('test', options, options);
  } catch (_e) {
    // event options not supported
  }
})();
class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;
    this.__boundHandleEvent = (e) => this.handleEvent(e);
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = noChange;
      directive(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener =
      newListener == null ||
      (oldListener != null &&
        (newListener.capture !== oldListener.capture ||
          newListener.once !== oldListener.once ||
          newListener.passive !== oldListener.passive));
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    this.value = newListener;
    this.__pendingValue = noChange;
  }
  handleEvent(event) {
    if (typeof this.value === 'function') {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) =>
  o && (eventOptionsSupported ? { capture: o.capture, passive: o.passive, once: o.once } : o.capture); /**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];
    if (prefix === '.') {
      const committer = new PropertyCommitter(element, name.slice(1), strings);
      return committer.parts;
    }
    if (prefix === '@') {
      return [new EventPart(element, name.slice(1), options.eventContext)];
    }
    if (prefix === '?') {
      return [new BooleanAttributePart(element, name.slice(1), strings)];
    }
    const committer = new AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */
  handleTextExpression(options) {
    return new NodePart(options);
  }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor(); /**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);
  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== undefined) {
    return template;
  }
  // If the TemplateStringsArray is new, generate a key from the strings
  // This key is shared between all templates with identical content
  const key = result.strings.join(marker);
  // Check if we already have a Template for this key
  template = templateCache.keyString.get(key);
  if (template === undefined) {
    // If we have not seen this key before, create a new Template
    template = new Template(result, result.getTemplateElement());
    // Cache the Template for this key
    templateCache.keyString.set(key, template);
  }
  // Cache all future queries for this TemplateStringsArray
  templateCache.stringsArray.set(result.strings, template);
  return template;
}
const templateCaches = new Map(); /**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
  let part = parts.get(container);
  if (part === undefined) {
    removeNodes(container, container.firstChild);
    parts.set(container, (part = new NodePart(Object.assign({ templateFactory }, options))));
    part.appendInto(container);
  }
  part.setValue(result);
  part.commit();
}; /**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new SVGTemplateResult(strings, values, 'svg', defaultTemplateProcessor);
const cache = new Map();

const scopeHTML = (strings, tags, suffix) => {
  if (suffix && tags && tags.length) {
    strings = strings.map((string) => {
      if (cache.has(string)) {
        return cache.get(string);
      }

      /*
			const allTags = [...string.matchAll(/<(ui5-.*?)[> ]/g)].map(x => x[1]);
			allTags.forEach(t => {
				if (!tags.includes(t)) {
					throw new Error(`${t} not found in ${string}`);
					// console.log(t, " in ", string);
				}
			});
			*/

      let result = string;
      tags.forEach((tag) => {
        result = result.replace(new RegExp(`(</?)(${tag})(/?[> \t\n])`, 'g'), `$1$2-${suffix}$3`);
      });
      cache.set(string, result);
      return result;
    });
  }

  return strings;
}; /**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Stores the StyleInfo object applied to a given AttributePart.
 * Used to unset existing values when a new StyleInfo object is applied.
 */
const previousStylePropertyCache = new WeakMap();
/**
 * A directive that applies CSS properties to an element.
 *
 * `styleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the `styleInfo`
 * object and adds the property values as CSS properties. Property names with
 * dashes (`-`) are assumed to be valid CSS property names and set on the
 * element's style object using `setProperty()`. Names without dashes are
 * assumed to be camelCased JavaScript property names and set on the element's
 * style object using property assignment, allowing the style object to
 * translate JavaScript-style names to CSS property names.
 *
 * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo {StyleInfo}
 */
const styleMap = directive((styleInfo) => (part) => {
  if (
    !(part instanceof AttributePart) ||
    part instanceof PropertyPart ||
    part.committer.name !== 'style' ||
    part.committer.parts.length > 1
  ) {
    throw new Error(
      'The `styleMap` directive must be used in the style attribute ' + 'and must be the only part in the attribute.'
    );
  }
  const { committer } = part;
  const { style } = committer.element;
  let previousStyleProperties = previousStylePropertyCache.get(part);
  if (previousStyleProperties === undefined) {
    // Write static styles once
    style.cssText = committer.strings.join(' ');
    previousStylePropertyCache.set(part, (previousStyleProperties = new Set()));
  }
  // Remove old properties that no longer exist in styleInfo
  // We use forEach() instead of for-of so that re don't require down-level
  // iteration.
  previousStyleProperties.forEach((name) => {
    if (!(name in styleInfo)) {
      previousStyleProperties.delete(name);
      if (name.indexOf('-') === -1) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style[name] = null;
      } else {
        style.removeProperty(name);
      }
    }
  });
  // Add or update properties
  for (const name in styleInfo) {
    previousStyleProperties.add(name);
    if (name.indexOf('-') === -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style[name] = styleInfo[name];
    } else {
      style.setProperty(name, styleInfo[name]);
    }
  }
});
let tags;
let suffix;

const setTags = (t) => {
  tags = t;
};
const setSuffix = (s) => {
  suffix = s;
};

const litRender = (templateResult, domNode, styles, { eventContext } = {}) => {
  if (styles) {
    templateResult = html`<style>
        ${styles}</style
      >${templateResult}`;
  }
  render(templateResult, domNode, { eventContext });
};

const scopedHtml = (strings, ...values) => html(scopeHTML(strings, tags, suffix), ...values);
const scopedSvg = (strings, ...values) => svg(scopeHTML(strings, tags, suffix), ...values);
const KeyCodes = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CONTROL: 17,
  ALT: 18,
  BREAK: 19,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  PRINT: 44,
  INSERT: 45,
  DELETE: 46,
  DIGIT_0: 48,
  DIGIT_1: 49,
  DIGIT_2: 50,
  DIGIT_3: 51,
  DIGIT_4: 52,
  DIGIT_5: 53,
  DIGIT_6: 54,
  DIGIT_7: 55,
  DIGIT_8: 56,
  DIGIT_9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  WINDOWS: 91,
  CONTEXT_MENU: 93,
  TURN_OFF: 94,
  SLEEP: 95,
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105,
  NUMPAD_ASTERISK: 106,
  NUMPAD_PLUS: 107,
  NUMPAD_MINUS: 109,
  NUMPAD_COMMA: 110,
  NUMPAD_SLASH: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUM_LOCK: 144,
  SCROLL_LOCK: 145,
  OPEN_BRACKET: 186,
  PLUS: 187,
  COMMA: 188,
  SLASH: 189,
  DOT: 190,
  PIPE: 191,
  SEMICOLON: 192,
  MINUS: 219,
  GREAT_ACCENT: 220,
  EQUALS: 221,
  SINGLE_QUOTE: 222,
  BACKSLASH: 226
};

const isEnter = (event) =>
  (event.key ? event.key === 'Enter' : event.keyCode === KeyCodes.ENTER) && !hasModifierKeys(event);

const isSpace = (event) =>
  (event.key ? event.key === 'Spacebar' || event.key === ' ' : event.keyCode === KeyCodes.SPACE) &&
  !hasModifierKeys(event);

const hasModifierKeys = (event) => event.shiftKey || event.altKey || getCtrlKey(event);

const getCtrlKey = (event) => !!(event.metaKey || event.ctrlKey); // double negation doesn't have effect on boolean but ensures null and undefined are equivalent to false.
const rLocale =
  /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;

class Locale {
  constructor(sLocaleId) {
    const aResult = rLocale.exec(sLocaleId.replace(/_/g, '-'));
    if (aResult === null) {
      throw new Error(`The given language ${sLocaleId} does not adhere to BCP-47.`);
    }
    this.sLocaleId = sLocaleId;
    this.sLanguage = aResult[1] || null;
    this.sScript = aResult[2] || null;
    this.sRegion = aResult[3] || null;
    this.sVariant = (aResult[4] && aResult[4].slice(1)) || null;
    this.sExtension = (aResult[5] && aResult[5].slice(1)) || null;
    this.sPrivateUse = aResult[6] || null;
    if (this.sLanguage) {
      this.sLanguage = this.sLanguage.toLowerCase();
    }
    if (this.sScript) {
      this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, (s) => {
        return s.toUpperCase();
      });
    }
    if (this.sRegion) {
      this.sRegion = this.sRegion.toUpperCase();
    }
  }

  getLanguage() {
    return this.sLanguage;
  }

  getScript() {
    return this.sScript;
  }

  getRegion() {
    return this.sRegion;
  }

  getVariant() {
    return this.sVariant;
  }

  getVariantSubtags() {
    return this.sVariant ? this.sVariant.split('-') : [];
  }

  getExtension() {
    return this.sExtension;
  }

  getExtensionSubtags() {
    return this.sExtension ? this.sExtension.slice(2).split('-') : [];
  }

  getPrivateUse() {
    return this.sPrivateUse;
  }

  getPrivateUseSubtags() {
    return this.sPrivateUse ? this.sPrivateUse.slice(2).split('-') : [];
  }

  hasPrivateUseSubtag(sSubtag) {
    return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
  }

  toString() {
    const r = [this.sLanguage];

    if (this.sScript) {
      r.push(this.sScript);
    }
    if (this.sRegion) {
      r.push(this.sRegion);
    }
    if (this.sVariant) {
      r.push(this.sVariant);
    }
    if (this.sExtension) {
      r.push(this.sExtension);
    }
    if (this.sPrivateUse) {
      r.push(this.sPrivateUse);
    }
    return r.join('-');
  }
}
const convertToLocaleOrNull = (lang) => {
  try {
    if (lang && typeof lang === 'string') {
      return new Locale(lang);
    }
  } catch (e) {
    // ignore
  }
};

/**
 * Returns the locale based on the parameter or configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
const getLocale = (lang) => {
  if (lang) {
    return convertToLocaleOrNull(lang);
  }

  if (getLanguage$1()) {
    return new Locale(getLanguage$1());
  }

  return convertToLocaleOrNull(detectNavigatorLanguage());
};
const localeRegEX =
  /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
const SAPSupportabilityLocales = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;

/* Map for old language names for a few ISO639 codes. */
const M_ISO639_NEW_TO_OLD = {
  he: 'iw',
  yi: 'ji',
  id: 'in',
  sr: 'sh'
};

/**
 * Normalizes the given locale in BCP-47 syntax.
 * @param {string} locale locale to normalize
 * @returns {string} Normalized locale, "undefined" if the locale can't be normalized or the default locale, if no locale provided.
 */
const normalizeLocale = (locale) => {
  let m;

  if (!locale) {
    return DEFAULT_LOCALE;
  }

  if (typeof locale === 'string' && (m = localeRegEX.exec(locale.replace(/_/g, '-')))) {
    /* eslint-disable-line */
    let language = m[1].toLowerCase();
    let region = m[3] ? m[3].toUpperCase() : undefined;
    const script = m[2] ? m[2].toLowerCase() : undefined;
    const variants = m[4] ? m[4].slice(1) : undefined;
    const isPrivate = m[6];

    language = M_ISO639_NEW_TO_OLD[language] || language;

    // recognize and convert special SAP supportability locales (overwrites m[]!)
    if (
      (isPrivate && (m = SAPSupportabilityLocales.exec(isPrivate))) /* eslint-disable-line */ ||
      (variants && (m = SAPSupportabilityLocales.exec(variants)))
    ) {
      /* eslint-disable-line */
      return `en_US_${m[1].toLowerCase()}`; // for now enforce en_US (agreed with SAP SLS)
    }

    // Chinese: when no region but a script is specified, use default region for each script
    if (language === 'zh' && !region) {
      if (script === 'hans') {
        region = 'CN';
      } else if (script === 'hant') {
        region = 'TW';
      }
    }

    return (
      language + (region ? '_' + region + (variants ? '_' + variants.replace('-', '_') : '') : '')
    ); /* eslint-disable-line */
  }
}; /**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string} Next fallback Locale or "en" if no fallbacks found.
 */
const nextFallbackLocale = (locale) => {
  if (!locale) {
    return DEFAULT_LOCALE;
  }

  if (locale === 'zh_HK') {
    return 'zh_TW';
  }

  // if there are multiple segments (separated by underscores), remove the last one
  const p = locale.lastIndexOf('_');
  if (p >= 0) {
    return locale.slice(0, p);
  }

  // for any language but the default, fallback to the default first before falling back to the 'raw' language (empty string)
  return locale !== DEFAULT_LOCALE ? DEFAULT_LOCALE : '';
};
const bundleData = new Map();
const bundleURLs = new Map();

/**
 * Sets a map with texts and ID the are related to.
 * @param {string} packageName package ID that the i18n bundle will be related to
 * @param {Object} data an object with string locales as keys and text translataions as values
 * @public
 */
const setI18nBundleData = (packageName, data) => {
  bundleData.set(packageName, data);
};

const getI18nBundleData = (packageName) => {
  return bundleData.get(packageName);
};

/**
 * This method preforms the asynchronous task of fetching the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the i18nBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the <code>registerI18nBundle</code> method.
 * To simplify the usage, the synchronization of both methods happens internally for the same <code>bundleId</code>
 * @param {packageName} packageName the NPM package name
 * @public
 */
const fetchI18nBundle = async (packageName) => {
  const bundlesForPackage = bundleURLs.get(packageName);

  if (!bundlesForPackage) {
    console.warn(
      `Message bundle assets are not configured. Falling back to English texts.` /* eslint-disable-line */,
      ` You need to import ${packageName}/dist/Assets.js with a build tool that supports JSON imports.`
    ); /* eslint-disable-line */
    return;
  }

  const language = getLocale().getLanguage();
  const region = getLocale().getRegion();
  const useDefaultLanguage = getUseDefaultLanguage$1();
  let localeId = normalizeLocale(language + (region ? `-${region}` : ``));

  while (localeId !== DEFAULT_LANGUAGE && !bundlesForPackage[localeId]) {
    localeId = nextFallbackLocale(localeId);
  }

  if (useDefaultLanguage && localeId === DEFAULT_LANGUAGE) {
    setI18nBundleData(packageName, null); // reset for the default language (if data was set for a previous language)
    return;
  }

  const bundleURL = bundlesForPackage[localeId];

  if (typeof bundleURL === 'object') {
    // inlined from build
    setI18nBundleData(packageName, bundleURL);
    return;
  }

  const content = await fetchTextOnce(getEffectiveAssetPath(bundleURL));
  let parser;
  if (content.startsWith('{')) {
    parser = JSON.parse;
  } else {
    const PropertiesFormatSupport = getFeature('PropertiesFormatSupport');
    if (!PropertiesFormatSupport) {
      throw new Error(
        `In order to support .properties files, please: import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";`
      );
    }
    parser = PropertiesFormatSupport.parser;
  }

  const data = parser(content);

  setI18nBundleData(packageName, data);
};

// When the language changes dynamically (the user calls setLanguage), re-fetch all previously fetched bundles
attachLanguageChange(() => {
  const allPackages = [...bundleData.keys()];
  return Promise.all(allPackages.map(fetchI18nBundle));
});
const messageFormatRegEX = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;

const formatMessage = (text, values) => {
  values = values || [];

  return text.replace(messageFormatRegEX, ($0, $1, $2, $3, offset) => {
    if ($1) {
      return "'"; /* eslint-disable-line */
    }

    if ($2) {
      return $2.replace(/''/g, "'"); /* eslint-disable-line */
    }

    if ($3) {
      return String(values[parseInt($3)]);
    }

    throw new Error(`[i18n]: pattern syntax error at pos ${offset}`);
  });
};
const I18nBundleInstances = new Map();

/**
 * @class
 * @public
 */
class I18nBundle {
  constructor(packageName) {
    this.packageName = packageName;
  }

  /**
   * Returns a text in the currently loaded language
   *
   * @param {Object|String} textObj key/defaultText pair or just the key
   * @param params Values for the placeholders
   * @returns {*}
   */
  getText(textObj, ...params) {
    if (typeof textObj === 'string') {
      textObj = { key: textObj, defaultText: textObj };
    }

    if (!textObj || !textObj.key) {
      return '';
    }

    const bundle = getI18nBundleData(this.packageName);
    const messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : textObj.defaultText || textObj.key;

    return formatMessage(messageText, params);
  }
}

const getI18nBundle = (packageName) => {
  if (I18nBundleInstances.has(packageName)) {
    return I18nBundleInstances.get(packageName);
  }

  const i18nBundle = new I18nBundle(packageName);
  I18nBundleInstances.set(packageName, i18nBundle);
  return i18nBundle;
};
const findNodeOwner = (node) => {
  if (!(node instanceof HTMLElement)) {
    throw new Error('Argument node should be of type HTMLElement');
  }

  const ownerTypes = [HTMLHtmlElement, HTMLIFrameElement];
  let currentShadowRootFlag = true;
  let currentCustomElementFlag = true;

  while (node) {
    if (node.toString() === '[object ShadowRoot]') {
      // Web Component
      // or the shadow root of web component with attached shadow root
      if (currentShadowRootFlag) {
        currentShadowRootFlag = false;
      }
      if (!currentCustomElementFlag && !currentShadowRootFlag) {
        return node;
      }
    } else if (node.tagName && node.tagName.indexOf('-') > -1) {
      if (currentCustomElementFlag) {
        currentCustomElementFlag = false;
      } else {
        return node;
      }
    } else if (ownerTypes.indexOf(node.constructor) > -1) {
      // Document or Iframe reached
      return node;
    }

    node = node.parentNode || node.host;
  }
};
const getEffectiveAriaLabelText = (el) => {
  if (!el.ariaLabelledby) {
    if (el.ariaLabel) {
      return el.ariaLabel;
    }

    return undefined;
  }

  return getAriaLabelledByTexts(el);
};

/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related texts
 * @param {HTMLElement} ownerDocument (Optional) Defines the HTMLElement(might document or custom element) where the you want to search for the texts.
 * @param {String} readyIds (Optional) Defines a string of elements ids. The text of these elements will be returned. If used you should provide either el or ownerDocument
 */
const getAriaLabelledByTexts = (el, ownerDocument, readyIds = '') => {
  const ids = (readyIds && readyIds.split(' ')) || el.ariaLabelledby.split(' ');
  const owner = ownerDocument || findNodeOwner(el);
  let result = '';

  ids.forEach((elementId, index) => {
    const element = owner.querySelector(`[id='${elementId}']`);
    result += `${element ? element.textContent : ''}`;

    if (index < ids.length - 1) {
      result += ' ';
    }
  });

  return result;
}; /**
 * @lends sap.ui.webcomponents.main.types.ButtonDesign.prototype
 * @public
 */
const ButtonTypes = {
  /**
   * default type (no special styling)
   * @public
   * @type {Default}
   */
  Default: 'Default',

  /**
   * accept type (green button)
   * @public
   * @type {Positive}
   */
  Positive: 'Positive',

  /**
   * reject style (red button)
   * @public
   * @type {Negative}
   */
  Negative: 'Negative',

  /**
   * transparent type
   * @public
   * @type {Transparent}
   */
  Transparent: 'Transparent',

  /**
   * emphasized type
   * @public
   * @type {Emphasized}
   */
  Emphasized: 'Emphasized'
};

/**
 * @class
 * Different types of Button.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.ButtonDesign
 * @public
 * @enum {string}
 */
class ButtonDesign extends DataType {
  static isValid(value) {
    return !!ButtonTypes[value];
  }
}

ButtonDesign.generataTypeAcessors(ButtonTypes); /*
	lit-html directive that removes and attribute if it is undefined
*/
var ifDefined = directive((value) => (part) => {
  if (value === undefined && part instanceof AttributePart) {
    if (value !== part.value) {
      const name = part.committer.name;
      part.committer.element.removeAttribute(name);
    }
  } else if (
    part.committer &&
    part.committer.element &&
    part.committer.element.getAttribute(part.committer.name) === value
  ) {
    part.setValue(noChange);
  } else {
    part.setValue(value);
  }
});
const block0 = (context) => {
  return scopedHtml`<button type="button" class="ui5-button-root" ?disabled="${context.disabled}" data-sap-focus-ref  dir="${ifDefined(context.effectiveDir)}" @focusout=${context._onfocusout} @focusin=${context._onfocusin} @click=${context._onclick} @mousedown=${context._onmousedown} @mouseup=${context._onmouseup} @keydown=${context._onkeydown} @keyup=${context._onkeyup} tabindex=${ifDefined(context.tabIndexValue)} aria-expanded="${ifDefined(context.accInfo.ariaExpanded)}" aria-controls="${ifDefined(context.accInfo.ariaControls)}" aria-haspopup="${ifDefined(context.accInfo.ariaHaspopup)}" aria-label="${ifDefined(context.ariaLabelText)}" title="${ifDefined(context.accInfo.title)}" part="button">${context.icon ? block1(context) : undefined}<span id="${ifDefined(context._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${context.hasButtonType ? block2(context) : undefined}</button> `;
};
const block1 = (context) => {
  return scopedHtml`<ui5-icon style="${styleMap(context.styles.icon)}" class="ui5-button-icon" name="${ifDefined(context.icon)}" show-tooltip=${ifDefined(context.iconOnly)}></ui5-icon>`;
};
const block2 = (context) => {
  return scopedHtml`<span class="ui5-hidden-text">${ifDefined(context.buttonTypeText)}</span>`;
};

const main = (context, tags, suffix) => {
  setTags(tags);
  setSuffix(suffix);
  return block0(context);
};
const getSharedResourcesInstance = () => getSingletonElementInstance('ui5-shared-resources', document.head);

/**
 * Use this method to initialize/get resources that you would like to be shared among UI5 Web Components runtime instances.
 * The data will be accessed via a singleton "ui5-shared-resources" HTML element in the "head" element of the page.
 *
 * @public
 * @param namespace Unique ID of the resource, may contain "." to denote hierarchy
 * @param initialValue Object or primitive that will be used as an initial value if the resource does not exist
 * @returns {*}
 */
const getSharedResource = (namespace, initialValue) => {
  const parts = namespace.split('.');
  let current = getSharedResourcesInstance();

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const lastPart = i === parts.length - 1;
    if (!Object.prototype.hasOwnProperty.call(current, part)) {
      current[part] = lastPart ? initialValue : {};
    }
    current = current[part];
  }

  return current;
};
const registry = getSharedResource('SVGIcons.registry', new Map());
const iconCollectionPromises = getSharedResource('SVGIcons.promises', new Map());

const ICON_NOT_FOUND = 'ICON_NOT_FOUND';
const DEFAULT_COLLECTION = 'SAP-icons';

const calcKey = (name, collection) => {
  // silently support ui5-compatible URIs
  if (name.startsWith('sap-icon://')) {
    name = name.replace('sap-icon://', '');
    [name, collection] = name.split('/').reverse();
  }
  collection = collection || DEFAULT_COLLECTION;
  return `${collection}:${name}`;
};

const getIconDataSync = (name, collection = DEFAULT_COLLECTION) => {
  const key = calcKey(name, collection);
  return registry.get(key);
};

const getIconData = async (name, collection = DEFAULT_COLLECTION) => {
  const key = calcKey(name, collection);

  if (!iconCollectionPromises.has(collection)) {
    iconCollectionPromises.set(collection, Promise.resolve(ICON_NOT_FOUND));
  }

  const iconData = await iconCollectionPromises.get(collection);

  if (iconData === ICON_NOT_FOUND) {
    return iconData;
  }

  return registry.get(key);
};
const block0$1 = (context) => {
  return scopedHtml`<svg class="ui5-icon-root" tabindex="${ifDefined(context.tabIndex)}" dir="${ifDefined(context._dir)}" viewBox="0 0 512 512" role="${ifDefined(context.role)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${ifDefined(context.accessibleNameText)}" xmlns="http://www.w3.org/2000/svg" @focusin=${context._onfocusin} @focusout=${context._onfocusout} @keydown=${context._onkeydown} @keyup=${context._onkeyup} @click=${context._onclick}>${blockSVG1(context)}</svg>`;
};
const block1$1 = (context) => {
  return scopedSvg`<title id="${ifDefined(context._id)}-tooltip">${ifDefined(context.accessibleNameText)}</title>`;
};

const blockSVG1 = (context) => {
  return scopedSvg`${context.hasIconTooltip ? block1$1(context) : undefined}<g role="presentation"><path transform="translate(0, 512) scale(1, -1)" d="${ifDefined(context.pathData)}"/></g>`;
};

const main$1 = (context, tags, suffix) => {
  setTags(tags);
  setSuffix(suffix);
  return block0$1(context);
};
var defaultThemeBase =
  ':root{--sapBrandColor:#0a6ed1;--sapHighlightColor:#0854a0;--sapBaseColor:#fff;--sapShellColor:#354a5f;--sapBackgroundColor:#f7f7f7;--sapFontFamily:"72","72full",Arial,Helvetica,sans-serif;--sapFontLightFamily:"72-Light","72-Lightfull","72","72full",Arial,Helvetica,sans-serif;--sapFontBoldFamily:"72-Bold","72-Boldfull","72","72full",Arial,Helvetica,sans-serif;--sapFontHeaderFamily:"72","72full",Arial,Helvetica,sans-serif;--sapFontSize:.875rem;--sapFontSmallSize:.75rem;--sapFontLargeSize:1rem;--sapFontHeader1Size:2.25rem;--sapFontHeader2Size:1.5rem;--sapFontHeader3Size:1.25rem;--sapFontHeader4Size:1.125rem;--sapFontHeader5Size:1rem;--sapFontHeader6Size:.875rem;--sapTextColor:#32363a;--sapLinkColor:#0a6ed1;--sapLink_Hover_Color:#0854a0;--sapLink_Active_Color:#0a6ed1;--sapLink_Visited_Color:#0a6ed1;--sapLink_InvertedColor:#d3e8fd;--sapLink_SubtleColor:#074888;--sapCompanyLogo:none;--sapBackgroundImage:none;--sapBackgroundImageOpacity:1.0;--sapBackgroundImageRepeat:false;--sapSelectedColor:#0854a0;--sapActiveColor:#0854a0;--sapHighlightTextColor:#fff;--sapTitleColor:#32363a;--sapNegativeColor:#b00;--sapCriticalColor:#e9730c;--sapPositiveColor:#107e3e;--sapInformativeColor:#0a6ed1;--sapNeutralColor:#6a6d70;--sapNegativeElementColor:#b00;--sapCriticalElementColor:#e9730c;--sapPositiveElementColor:#107e3e;--sapInformativeElementColor:#0a6ed1;--sapNeutralElementColor:#6a6d70;--sapNegativeTextColor:#b00;--sapPositiveTextColor:#107e3e;--sapCriticalTextColor:#e9730c;--sapInformativeTextColor:#053b70;--sapNeutralTextColor:#6a6d70;--sapNeutralBorderColor:#6a6d70;--sapErrorColor:#b00;--sapErrorBorderColor:#b00;--sapWarningColor:#e9730c;--sapWarningBorderColor:#e9730c;--sapSuccessColor:#107e3e;--sapSuccessBorderColor:#107e3e;--sapInformationColor:#0a6ed1;--sapInformationBorderColor:#0a6ed1;--sapErrorBackground:#ffebeb;--sapWarningBackground:#fef7f1;--sapSuccessBackground:#f1fdf6;--sapInformationBackground:#f5faff;--sapNeutralBackground:#f4f4f4;--sapIndicationColor_1:#800;--sapIndicationColor_1_Hover_Background:#6f0000;--sapIndicationColor_1_Active_Background:#500;--sapIndicationColor_1_TextColor:#fff;--sapIndicationColor_2:#b00;--sapIndicationColor_2_Hover_Background:#a20000;--sapIndicationColor_2_Active_Background:#800;--sapIndicationColor_2_TextColor:#fff;--sapIndicationColor_3:#e9730c;--sapIndicationColor_3_Hover_Background:#da6c0b;--sapIndicationColor_3_Active_Background:#cc650b;--sapIndicationColor_3_TextColor:#fff;--sapIndicationColor_4:#107e3e;--sapIndicationColor_4_Hover_Background:#0d6733;--sapIndicationColor_4_Active_Background:#0a5128;--sapIndicationColor_4_TextColor:#fff;--sapIndicationColor_5:#0a6ed1;--sapIndicationColor_5_Hover_Background:#0961b9;--sapIndicationColor_5_Active_Background:#0854a0;--sapIndicationColor_5_TextColor:#fff;--sapIndicationColor_6:#0f828f;--sapIndicationColor_6_Hover_Background:#0d6d78;--sapIndicationColor_6_Active_Background:#0a5861;--sapIndicationColor_6_TextColor:#fff;--sapIndicationColor_7:#925ace;--sapIndicationColor_7_Hover_Background:#8546c8;--sapIndicationColor_7_Active_Background:#7838bd;--sapIndicationColor_7_TextColor:#fff;--sapIndicationColor_8:#c0399f;--sapIndicationColor_8_Hover_Background:#ac338f;--sapIndicationColor_8_Active_Background:#992d7e;--sapIndicationColor_8_TextColor:#fff;--sapElement_LineHeight:2.75rem;--sapElement_Height:2.25rem;--sapElement_BorderWidth:.0625rem;--sapElement_BorderCornerRadius:.25rem;--sapElement_Compact_LineHeight:2rem;--sapElement_Compact_Height:1.625rem;--sapElement_Condensed_LineHeight:1.5rem;--sapElement_Condensed_Height:1.375rem;--sapContent_LineHeight:1.4;--sapContent_IconHeight:1rem;--sapContent_IconColor:#0854a0;--sapContent_ContrastIconColor:#fff;--sapContent_NonInteractiveIconColor:#6a6d70;--sapContent_MarkerIconColor:#286eb4;--sapContent_MarkerTextColor:#0e7581;--sapContent_ImagePlaceholderBackground:#ccc;--sapContent_ImagePlaceholderForegroundColor:#fff;--sapContent_RatedColor:#d08014;--sapContent_UnratedColor:#89919a;--sapContent_FocusColor:#000;--sapContent_FocusStyle:dotted;--sapContent_FocusWidth:.0625rem;--sapContent_ContrastFocusColor:#fff;--sapContent_ShadowColor:#000;--sapContent_ContrastShadowColor:#fff;--sapContent_Shadow0:0 0 0 0.0625rem rgba(0,0,0,0.1),0 0.125rem 0.5rem 0 rgba(0,0,0,0.1);--sapContent_Shadow1:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.125rem 0.5rem 0 rgba(0,0,0,0.3);--sapContent_Shadow2:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.625rem 1.875rem 0 rgba(0,0,0,0.3);--sapContent_Shadow3:0 0 0 0.0625rem rgba(0,0,0,0.42),0 1.25rem 5rem 0 rgba(0,0,0,0.3);--sapContent_TextShadow:0 0 0.125rem #fff;--sapContent_HeaderShadow:0 0 0.25rem 0 rgba(0,0,0,0.15),inset 0 -0.0625rem 0 0 #d9d9d9;--sapContent_SearchHighlightColor:#d4f7db;--sapContent_HelpColor:#3f8600;--sapContent_LabelColor:#6a6d70;--sapContent_MonospaceFontFamily:lucida console,monospace;--sapContent_DisabledTextColor:rgba(50,54,58,0.6);--sapContent_DisabledOpacity:0.4;--sapContent_ContrastTextThreshold:0.65;--sapContent_ContrastTextColor:#fff;--sapContent_ForegroundColor:#efefef;--sapContent_ForegroundBorderColor:#89919a;--sapContent_ForegroundTextColor:#32363a;--sapContent_BadgeBackground:#d04343;--sapContent_BadgeTextColor:#fff;--sapContent_Placeholderloading_Background:#e0e0e0;--sapContent_Placeholderloading_Gradient:linear-gradient(90deg,#e0e0e0 0%,#e0e0e0 35%,#d3d3d3 50%,#e0e0e0 65%,#e0e0e0);--sapContent_DragAndDropActiveColor:#0854a0;--sapContent_Selected_Background:#0854a0;--sapContent_Selected_TextColor:#fff;--sapContent_Selected_Hover_Background:#095caf;--sapContent_Illustrative_Color1:#0a6ed1;--sapContent_Illustrative_Color2:#72b5f8;--sapContent_Illustrative_Color3:#ffba10;--sapContent_Illustrative_Color4:#4a5055;--sapContent_Illustrative_Color5:#9da4aa;--sapContent_Illustrative_Color6:#c6cace;--sapContent_Illustrative_Color7:#e7e9ea;--sapContent_Illustrative_Color8:#fff;--sapShell_Background:#edeff0;--sapShell_BackgroundImage:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundGradient:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundImageOpacity:1.0;--sapShell_BackgroundImageRepeat:false;--sapShell_BorderColor:#354a5f;--sapShell_TextColor:#fff;--sapShell_InteractiveTextColor:#d1e8ff;--sapShell_InteractiveBorderColor:#7996b4;--sapShell_GroupTitleTextColor:#32363a;--sapShell_Hover_Background:#283848;--sapShell_Active_Background:#23303e;--sapShell_Active_TextColor:#fff;--sapShell_Selected_Background:#23303e;--sapShell_Selected_TextColor:#fff;--sapShell_Selected_Hover_Background:#23303e;--sapShell_Favicon:none;--sapShell_Navigation_Background:#fff;--sapShell_Navigation_SelectedColor:#0854a0;--sapShell_Navigation_Selected_TextColor:#0854a0;--sapShell_Navigation_TextColor:#32363a;--sapShell_Shadow:0 0 0.25rem 0 rgba(0,0,0,0.15),inset 0 -0.0625rem 0 0 rgba(0,0,0,0.2);--sapButton_BorderWidth:.0625rem;--sapButton_BorderCornerRadius:.25rem;--sapButton_Background:#fff;--sapButton_BorderColor:#0854a0;--sapButton_TextColor:#0854a0;--sapButton_Hover_Background:#ebf5fe;--sapButton_Hover_BorderColor:#0854a0;--sapButton_Hover_TextColor:#0854a0;--sapButton_IconColor:#0854a0;--sapButton_Active_Background:#0854a0;--sapButton_Active_BorderColor:#0854a0;--sapButton_Active_TextColor:#fff;--sapButton_Emphasized_Background:#0a6ed1;--sapButton_Emphasized_BorderColor:#0a6ed1;--sapButton_Emphasized_TextColor:#fff;--sapButton_Emphasized_Hover_Background:#085caf;--sapButton_Emphasized_Hover_BorderColor:#085caf;--sapButton_Emphasized_Hover_TextColor:#fff;--sapButton_Emphasized_Active_Background:#0854a0;--sapButton_Emphasized_Active_BorderColor:#0854a0;--sapButton_Emphasized_TextShadow:transparent;--sapButton_Accept_Background:#fff;--sapButton_Accept_BorderColor:#107e3e;--sapButton_Accept_Hover_Background:#f1fdf6;--sapButton_Accept_Hover_BorderColor:#107e3e;--sapButton_Accept_Hover_TextColor:#107e3e;--sapButton_Accept_Active_Background:#0d6733;--sapButton_Accept_Active_BorderColor:#0d6733;--sapButton_Accept_TextColor:#107e3e;--sapButton_Accept_Selected_Background:#0d6733;--sapButton_Accept_Selected_BorderColor:#0d6733;--sapButton_Accept_Selected_TextColor:#fff;--sapButton_Accept_Selected_Hover_Background:#107e3e;--sapButton_Accept_Selected_Hover_BorderColor:#107e3e;--sapButton_Reject_Background:#fff;--sapButton_Reject_BorderColor:#b00;--sapButton_Reject_Hover_Background:#ffebeb;--sapButton_Reject_Hover_BorderColor:#b00;--sapButton_Reject_Hover_TextColor:#b00;--sapButton_Reject_Active_Background:#a20000;--sapButton_Reject_Active_BorderColor:#a20000;--sapButton_Reject_TextColor:#b00;--sapButton_Reject_Selected_Background:#a20000;--sapButton_Reject_Selected_BorderColor:#a20000;--sapButton_Reject_Selected_TextColor:#fff;--sapButton_Reject_Selected_Hover_Background:#b00;--sapButton_Reject_Selected_Hover_BorderColor:#b00;--sapButton_Lite_Background:transparent;--sapButton_Lite_BorderColor:transparent;--sapButton_Lite_TextColor:#0854a0;--sapButton_Lite_Hover_Background:#ebf5fe;--sapButton_Lite_Hover_BorderColor:#0854a0;--sapButton_Lite_Hover_TextColor:#0854a0;--sapButton_Lite_Active_Background:#0854a0;--sapButton_Lite_Active_BorderColor:#0854a0;--sapButton_Selected_Background:#0854a0;--sapButton_Selected_BorderColor:#0854a0;--sapButton_Selected_TextColor:#fff;--sapButton_Selected_Hover_Background:#095caf;--sapButton_Selected_Hover_BorderColor:#095caf;--sapButton_Attention_Background:#fff;--sapButton_Attention_BorderColor:#e9730c;--sapButton_Attention_TextColor:#e9730c;--sapButton_Attention_Hover_Background:#fef7f1;--sapButton_Attention_Hover_BorderColor:#e9730c;--sapButton_Attention_Hover_TextColor:#e9730c;--sapButton_Attention_Active_Background:#d1670b;--sapButton_Attention_Active_BorderColor:#d1670b;--sapButton_Attention_Selected_Background:#d1670b;--sapButton_Attention_Selected_BorderColor:#d1670b;--sapButton_Attention_Selected_TextColor:#fff;--sapButton_Attention_Selected_Hover_Background:#e9730c;--sapButton_Attention_Selected_Hover_BorderColor:#e9730c;--sapButton_Negative_Background:#b00;--sapButton_Negative_BorderColor:#b00;--sapButton_Negative_TextColor:#fff;--sapButton_Negative_Hover_Background:#970000;--sapButton_Negative_Hover_BorderColor:#970000;--sapButton_Negative_Hover_TextColor:#fff;--sapButton_Negative_Active_Background:#800;--sapButton_Negative_Active_BorderColor:#800;--sapButton_Critical_Background:#e9730c;--sapButton_Critical_BorderColor:#e9730c;--sapButton_Critical_TextColor:#fff;--sapButton_Critical_Hover_Background:#c7620a;--sapButton_Critical_Hover_BorderColor:#c7620a;--sapButton_Critical_Hover_TextColor:#fff;--sapButton_Critical_Active_Background:#b85b0a;--sapButton_Critical_Active_BorderColor:#b85b0a;--sapButton_Success_Background:#107e3e;--sapButton_Success_BorderColor:#107e3e;--sapButton_Success_TextColor:#fff;--sapButton_Success_Hover_Background:#0c5e2e;--sapButton_Success_Hover_BorderColor:#0c5e2e;--sapButton_Success_Hover_TextColor:#fff;--sapButton_Success_Active_Background:#0a5128;--sapButton_Success_Active_BorderColor:#0a5128;--sapButton_Information_Background:#0a6ed1;--sapButton_Information_BorderColor:#0a6ed1;--sapButton_Information_TextColor:#fff;--sapButton_Information_Hover_Background:#0961b9;--sapButton_Information_Hover_BorderColor:#0961b9;--sapButton_Information_Hover_TextColor:#fff;--sapButton_Information_Active_Background:#0854a0;--sapButton_Information_Active_BorderColor:#0854a0;--sapButton_Neutral_Background:#6a6d70;--sapButton_Neutral_BorderColor:#6a6d70;--sapButton_Neutral_TextColor:#fff;--sapButton_Neutral_Hover_Background:#595b5e;--sapButton_Neutral_Hover_BorderColor:#595b5e;--sapButton_Neutral_Hover_TextColor:#fff;--sapButton_Neutral_Active_Background:#515456;--sapButton_Neutral_Active_BorderColor:#515456;--sapButton_Track_Selected_Background:#ebf5fe;--sapButton_Track_Selected_TextColor:#32363a;--sapButton_Track_Background:#ededed;--sapButton_Track_TextColor:#32363a;--sapButton_TokenBackground:#fafafa;--sapButton_TokenBorderColor:#c2c2c2;--sapField_Background:#fff;--sapField_TextColor:#32363a;--sapField_PlaceholderTextColor:#74777a;--sapField_BorderColor:#89919a;--sapField_HelpBackground:#fff;--sapField_BorderWidth:.0625rem;--sapField_BorderCornerRadius:.125rem;--sapField_Hover_Background:#fff;--sapField_Hover_BorderColor:#0854a0;--sapField_Hover_HelpBackground:#ebf5fe;--sapField_Active_BorderColor:#0854a0;--sapField_Focus_Background:#fff;--sapField_Focus_BorderColor:#89919a;--sapField_Focus_HelpBackground:#fff;--sapField_ReadOnly_Background:hsla(0,0%,94.9%,0.5);--sapField_ReadOnly_BorderColor:#89919a;--sapField_ReadOnly_HelpBackground:hsla(0,0%,94.9%,0.5);--sapField_RequiredColor:#ce3b3b;--sapField_InvalidColor:#b00;--sapField_InvalidBackground:#fff;--sapField_WarningColor:#e9730c;--sapField_WarningBackground:#fff;--sapField_SuccessColor:#107e3e;--sapField_SuccessBackground:#fff;--sapField_InformationColor:#0a6ed1;--sapField_InformationBackground:#fff;--sapGroup_TitleBackground:transparent;--sapGroup_TitleBorderColor:#d9d9d9;--sapGroup_TitleTextColor:#32363a;--sapGroup_ContentBackground:#fff;--sapGroup_ContentBorderColor:#d9d9d9;--sapGroup_BorderWidth:.0625rem;--sapGroup_BorderCornerRadius:0;--sapGroup_FooterBackground:transparent;--sapToolbar_Background:transparent;--sapToolbar_SeparatorColor:#d9d9d9;--sapList_HeaderBackground:#f2f2f2;--sapList_HeaderBorderColor:#e4e4e4;--sapList_HeaderTextColor:#32363a;--sapList_BorderColor:#e4e4e4;--sapList_TextColor:#32363a;--sapList_Active_TextColor:#fff;--sapList_BorderWidth:.0625rem;--sapList_SelectionBackgroundColor:#e5f0fa;--sapList_SelectionBorderColor:#0854a0;--sapList_Hover_SelectionBackground:#d8e9f8;--sapList_Background:#fff;--sapList_Hover_Background:#f5f5f5;--sapList_AlternatingBackground:#fafafa;--sapList_GroupHeaderBackground:#fff;--sapList_GroupHeaderBorderColor:#d8d8d8;--sapList_GroupHeaderTextColor:#32363a;--sapList_FooterBackground:#fafafa;--sapList_FooterTextColor:#32363a;--sapList_TableGroupHeaderBackground:#efefef;--sapList_TableGroupHeaderBorderColor:#d8d8d8;--sapList_TableGroupHeaderTextColor:#32363a;--sapList_TableFooterBorder:#d8d8d8;--sapList_TableFixedBorderColor:#d8d8d8;--sapList_Active_Background:#0854a0;--sapScrollBar_FaceColor:#949494;--sapScrollBar_TrackColor:#fff;--sapScrollBar_BorderColor:#949494;--sapScrollBar_SymbolColor:#0854a0;--sapScrollBar_Dimension:.75rem;--sapScrollBar_Hover_FaceColor:#8c8c8c;--sapPageHeader_Background:#fff;--sapPageHeader_BorderColor:#d9d9d9;--sapPageHeader_TextColor:#32363a;--sapPageFooter_Background:#fff;--sapPageFooter_BorderColor:#d9d9d9;--sapPageFooter_TextColor:#32363a;--sapInfobar_Background:#0f828f;--sapInfobar_Hover_Background:#0e7581;--sapInfobar_Active_Background:#0a545c;--sapObjectHeader_Background:#fff;--sapObjectHeader_BorderColor:#d9d9d9;--sapBlockLayer_Background:#000;--sapTile_Background:#fff;--sapTile_Hover_Background:#f5f5f5;--sapTile_Active_Background:#f5f5f5;--sapTile_BorderColor:transparent;--sapTile_TitleTextColor:#32363a;--sapTile_TextColor:#6a6d70;--sapTile_IconColor:#5a7da0;--sapTile_SeparatorColor:#ccc;--sapAccentColor1:#d08014;--sapAccentColor2:#d04343;--sapAccentColor3:#db1f77;--sapAccentColor4:#c0399f;--sapAccentColor5:#6367de;--sapAccentColor6:#286eb4;--sapAccentColor7:#0f828f;--sapAccentColor8:#7ca10c;--sapAccentColor9:#925ace;--sapAccentColor10:#647987;--sapLegend_WorkingBackground:#fafafa;--sapLegend_NonWorkingBackground:#dedede;--sapLegend_CurrentDateTime:#c0399f;--sapLegendColor1:#d58215;--sapLegendColor2:#dc5b5b;--sapLegendColor3:#db1f77;--sapLegendColor4:#9b3b3b;--sapLegendColor5:#cf5db3;--sapLegendColor6:#286eb4;--sapLegendColor7:#1193a2;--sapLegendColor8:#8b9668;--sapLegendColor9:#647987;--sapLegendColor10:#892971;--sapLegendColor11:#725a3a;--sapLegendColor12:#bb2f2f;--sapLegendColor13:#bc1b66;--sapLegendColor14:#8b714f;--sapLegendColor15:#606190;--sapLegendColor16:#597da1;--sapLegendColor17:#49797e;--sapLegendColor18:#687a33;--sapLegendColor19:#295989;--sapLegendColor20:#5154bd;--sapLegendBackgroundColor1:#fdf3e7;--sapLegendBackgroundColor2:#faeaea;--sapLegendBackgroundColor3:#fce9f2;--sapLegendBackgroundColor4:#f8ecec;--sapLegendBackgroundColor5:#f9ebf5;--sapLegendBackgroundColor6:#ebf3fa;--sapLegendBackgroundColor7:#e8fbfd;--sapLegendBackgroundColor8:#f3f4ef;--sapLegendBackgroundColor9:#f1f3f4;--sapLegendBackgroundColor10:#f9ebf6;--sapLegendBackgroundColor11:#f6f2ed;--sapLegendBackgroundColor12:#faeaea;--sapLegendBackgroundColor13:#fce9f2;--sapLegendBackgroundColor14:#f5f2ee;--sapLegendBackgroundColor15:#f0f0f5;--sapLegendBackgroundColor16:#eff2f6;--sapLegendBackgroundColor17:#eff5f6;--sapLegendBackgroundColor18:#f5f7ed;--sapLegendBackgroundColor19:#ebf2f9;--sapLegendBackgroundColor20:#ecedf8;--sapChart_OrderedColor_1:#5899da;--sapChart_OrderedColor_2:#e8743b;--sapChart_OrderedColor_3:#19a979;--sapChart_OrderedColor_4:#ed4a7b;--sapChart_OrderedColor_5:#945ecf;--sapChart_OrderedColor_6:#13a4b4;--sapChart_OrderedColor_7:#525df4;--sapChart_OrderedColor_8:#bf399e;--sapChart_OrderedColor_9:#6c8893;--sapChart_OrderedColor_10:#ee6868;--sapChart_OrderedColor_11:#2f6497;--sapChart_Bad:#dc0d0e;--sapChart_Critical:#de890d;--sapChart_Good:#3fa45b;--sapChart_Neutral:#848f94;--sapChart_Sequence_1:#5899da;--sapChart_Sequence_2:#e8743b;--sapChart_Sequence_3:#19a979;--sapChart_Sequence_4:#ed4a7b;--sapChart_Sequence_5:#945ecf;--sapChart_Sequence_6:#13a4b4;--sapChart_Sequence_7:#525df4;--sapChart_Sequence_8:#bf399e;--sapChart_Sequence_9:#6c8893;--sapChart_Sequence_10:#ee6868;--sapChart_Sequence_11:#2f6497;--sapChart_Sequence_Neutral:#848f94;}';
var defaultTheme =
  ':root{--_ui5_calendar_header_height:3rem;--_ui5_calendar_header_arrow_button_width:2.5rem;--_ui5_calendar_header_padding:0.25rem 0;--_ui5_checkbox_root_side_padding:.6875rem;--_ui5_checkbox_icon_size:1rem;--_ui5_custom_list_item_height:3rem;--_ui5_custom_list_item_rb_min_width:2.75rem;--_ui5_day_picker_item_width:2.25rem;--_ui5_day_picker_item_height:2.875rem;--_ui5_day_picker_empty_height:3rem;--_ui5_datetime_picker_width:40.0625rem;--_ui5_datetime_picker_height:25rem;--_ui5_datetime_timeview_phonemode_width:19.5rem;--_ui5_datetime_timeview_padding:1rem;--_ui5_input_inner_padding:0 0.625rem;--_ui5_input_inner_padding_with_icon:0 0.25rem 0 0.625rem;--_ui5_input_value_state_icon_padding:var(--_ui5-input-icon-padding);--_ui5_list_no_data_height:3rem;--_ui5_list_item_cb_margin_right:0;--_ui5_list_item_title_size:var(--sapMFontLargeSize);--_ui5_list_item_img_size:3rem;--_ui5_list_item_img_margin:0.5rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:2.75rem;--_ui5_list_item_icon_size:1.125rem;--_ui5_list_busy_row_height:3rem;--_ui5_month_picker_item_height:3rem;--_ui5_year_picker_item_height:3rem;--_ui5_tokenizer_root_padding:0.1875rem;--_ui5_token_height:1.625rem;--_ui5_token_icon_size:1rem;--_ui5_token_icon_padding:0.25rem 0.5rem;--_ui5_token_wrapper_right_padding:0.3125rem;--_ui5_tl_bubble_padding:1rem;--_ui5_tl_indicator_before_bottom:-1.625rem;--_ui5_tl_padding:1rem 1rem 1rem .5rem;--_ui5_tl_li_margin_bottom:1.625rem;--_ui5_rb_height:2.75rem;--_ui5_rb_label_side_padding:.875rem;--_ui5_rb_focus_dist:.5rem;--_ui5_rb_inner_size:2.75rem;--_ui5_rb_svg_size:1.375rem;--_ui5_rb_label_width:calc(100% - 2.75rem);--_ui5_rb_rtl_focus_right:0.5rem;--_ui5_switch_text_on_left:calc(-100% + 1.9125rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.875rem);--_ui5_switch_rtl_transform:translateX(1.875rem) translateX(-100%);--_ui5_switch_text_right:calc(-100% + 1.9125rem);--_ui5_tc_item_text:3rem;--_ui5_tc_item_text_text_only:3rem;--_ui5_tc_item_text_line_height:normal;--_ui5_tc_item_icon_size:1.5rem;--_ui5_tc_item_add_text_margin_top:0.625rem;--_ui5_textarea_padding:0.5625rem 0.6875rem;--_ui5-responnsive_popover_header_height:2.75rem;--ui5_side_navigation_item_height:2.75rem;--_ui5-tree-indent-step:1.5rem;--_ui5-tree-toggle-box-width:2.75rem;--_ui5-tree-toggle-box-height:2.25rem;--_ui5-tree-toggle-icon-size:1.0625rem;--_ui5_segmented_btn_border_radius:0.375rem;--ui5-avatar-initials-color:var(--sapContent_ImagePlaceholderForegroundColor);--ui5-avatar-initials-border:none;--ui5-avatar-accent1:var(--sapAccentColor1);--ui5-avatar-accent2:var(--sapAccentColor2);--ui5-avatar-accent3:var(--sapAccentColor3);--ui5-avatar-accent4:var(--sapAccentColor4);--ui5-avatar-accent5:var(--sapAccentColor5);--ui5-avatar-accent6:var(--sapAccentColor6);--ui5-avatar-accent7:var(--sapAccentColor7);--ui5-avatar-accent8:var(--sapAccentColor8);--ui5-avatar-accent9:var(--sapAccentColor9);--ui5-avatar-accent10:var(--sapAccentColor10);--ui5-avatar-placeholder:var(--sapContent_ImagePlaceholderBackground);--ui5-badge-font-size:0.75em;--ui5-badge-color-scheme-1-background:var(--sapLegendBackgroundColor1);--ui5-badge-color-scheme-1-border:var(--sapLegendColor1);--ui5-badge-color-scheme-2-background:var(--sapLegendBackgroundColor2);--ui5-badge-color-scheme-2-border:var(--sapLegendColor2);--ui5-badge-color-scheme-3-background:var(--sapLegendBackgroundColor3);--ui5-badge-color-scheme-3-border:var(--sapLegendColor3);--ui5-badge-color-scheme-4-background:var(--sapLegendBackgroundColor5);--ui5-badge-color-scheme-4-border:var(--sapLegendColor5);--ui5-badge-color-scheme-5-background:var(--sapLegendBackgroundColor20);--ui5-badge-color-scheme-5-border:var(--sapLegendColor20);--ui5-badge-color-scheme-6-background:var(--sapLegendBackgroundColor6);--ui5-badge-color-scheme-6-border:var(--sapLegendColor6);--ui5-badge-color-scheme-7-background:var(--sapLegendBackgroundColor7);--ui5-badge-color-scheme-7-border:var(--sapLegendColor7);--ui5-badge-color-scheme-8-background:var(--sapLegendBackgroundColor8);--ui5-badge-color-scheme-8-border:var(--sapLegendColor8);--ui5-badge-color-scheme-9-background:var(--sapLegendBackgroundColor10);--ui5-badge-color-scheme-9-border:var(--sapLegendColor10);--ui5-badge-color-scheme-10-background:var(--sapLegendBackgroundColor9);--ui5-badge-color-scheme-10-border:var(--sapAccentColor9);--_ui5_button_base_min_compact_width:2rem;--_ui5_button_compact_height:1.625rem;--_ui5_button_compact_padding:0.4375rem;--_ui5_button_outline:1px dotted var(--sapContent_FocusColor);--_ui5_button_outline_offset:-0.1875rem;--_ui5_button_focus_offset:1px;--_ui5_button_focus_width:1px;--_ui5_button_focus_color:var(--sapContent_FocusColor);--_ui5_button_transparent_border_color:transparent;--_ui5_button_transparent_hover_border_color:var(--sapButton_BorderColor);--_ui5_button_active_border_color:var(--sapButton_Active_BorderColor);--_ui5_button_positive_border_color:var(--sapButton_Accept_BorderColor);--_ui5_button_positive_border_hover_color:var(--sapButton_Accept_Hover_BorderColor);--_ui5_button_positive_border_active_color:var(--sapButton_Accept_Active_BorderColor);--_ui5_button_positive_border_focus_hover_color:var(--sapContent_FocusColor);--_ui5_button_positive_focus_border_color:var(--sapButton_Accept_BorderColor);--_ui5_button_negative_focus_border_color:var(--sapButton_Reject_BorderColor);--_ui5_button_negative_active_border_color:var(--sapButton_Reject_Active_BorderColor);--_ui5_button_emphasized_focused_border_color:var(--sapButton_Emphasized_BorderColor);--_ui5_button_base_min_width:2.25rem;--_ui5_button_base_height:2.25rem;--_ui5_button_border_radius:0.25rem;--_ui5_button_base_padding:0.5625rem;--_ui5_button_base_icon_only_padding:0.5625rem;--_ui5_button_base_icon_margin:0.375rem;--_ui5_button_emphasized_font_weight:bold;--_ui5_button_text_shadow:none;--_ui5_card_border_color:var(--sapTile_SeparatorColor);--_ui5_card_content_padding:1rem;--_ui5_card_header_hover_bg:var(--sapList_Hover_Background);--_ui5_card_header_active_bg:var(--_ui5_card_header_hover_bg);--_ui5_card_header_border_color:var(--_ui5_card_border_color);--_ui5_card_header_focus_border:1px dotted var(--sapContent_FocusColor);--ui5_carousel_button_size:2.5rem;--ui5_carousel_height:0.25rem;--ui5_carousel_width:0.25rem;--ui5_carousel_margin:0 0.375rem;--ui5_carousel_border:1px solid var(--sapContent_ForegroundBorderColor);--ui5_carousel_dot_border:none;--ui5_carousel_dot_background:var(--sapContent_NonInteractiveIconColor);--_ui5_checkbox_hover_background:var(--sapField_Hover_Background);--_ui5_checkbox_inner_width_height:1.375rem;--_ui5_checkbox_inner_error_border:0.125rem solid var(--sapField_InvalidColor);--_ui5_checkbox_inner_warning_border:0.125rem solid var(--sapField_WarningColor);--_ui5_checkbox_inner_information_border:0.125rem solid var(--sapField_InformationColor);--_ui5_checkbox_checkmark_warning_color:var(--sapField_TextColor);--_ui5_checkbox_checkmark_color:var(--sapSelectedColor);--_ui5_checkbox_wrapped_focus_left_top_bottom_position:.5625rem;--_ui5_checkbox_focus_outline:1px dotted var(--sapContent_FocusColor);--_ui5_checkbox_compact_wrapper_padding:.5rem;--_ui5_checkbox_compact_width_height:2rem;--_ui5_checkbox_compact_inner_size:1rem;--_ui5_checkbox_compact_focus_position:.375rem;--_ui5_checkbox_wrapper_padding:.6875rem;--_ui5_checkbox_width_height:2.75rem;--_ui5_checkbox_inner_border:.0625rem solid var(--sapField_BorderColor);--_ui5_checkbox_focus_position:0.5625rem;--_ui5_checkbox_inner_border_radius:.125rem;--_ui5_checkbox_wrapped_content_margin_top:0;--_ui5_checkbox_wrapped_focus_padding:.5rem;--_ui5_checkbox_inner_readonly_border:1px solid var(--sapField_ReadOnly_BorderColor);--_ui5_checkbox_compact_wrapped_label_margin_top:-0.125rem;--_ui5_datepicker_icon_border:none;--_ui5_daypicker_item_margin:2px;--_ui5_daypicker_item_border:none;--_ui5_daypicker_item_outline_width:1px;--_ui5_daypicker_item_outline_offset:1px;--_ui5_daypicker_daynames_container_height:2rem;--_ui5_daypicker_item_othermonth_background_color:var(--sapList_Background);--_ui5_daypicker_item_othermonth_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_othermonth_hover_color:var(--sapContent_LabelColor);--_ui5_daypicker_dayname_color:var(--sapContent_LabelColor);--_ui5_daypicker_weekname_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_now_selected_focus_after_width:calc(100% - 0.125rem);--_ui5_daypicker_item_now_selected_focus_after_height:calc(100% - 0.125rem);--_ui5_daypicker_item_selected_hover_background_color:var(--sapActiveColor_Lighten3);--_ui5_daypicker_item_border_radius:0.25rem;--_ui5_daypicker_item_now_inner_border_radius:0.125rem;--ui5-group-header-listitem-background-color:var(--sapList_GroupHeaderBackground);--_ui5_input_width:13.125rem;--_ui5_input_compact_height:1.625rem;--_ui5_input_state_border_width:0.125rem;--_ui5-input-information_border_width:0.125rem;--_ui5_input_error_font_weight:normal;--_ui5_input_focus_border_width:1px;--_ui5_input_error_warning_border_style:solid;--_ui5_input_error_warning_font_style:inherit;--_ui5_input_disabled_color:var(--sapContent_DisabledTextColor);--_ui5_input_disabled_font_weight:normal;--_ui5_input_disabled_border_color:var(--sapField_BorderColor);--_ui5_input_disabled_background:var(--sapField_Background);--_ui5_input_icon_min_width:2.375rem;--_ui5_input_compact_min_width:2rem;--_ui5_input_height:2.25rem;--_ui5_input_disabled_opacity:0.4;--_ui5_input_wrapper_border_radius:0.125rem;--_ui5_input_icon_padding:.5625rem .6875rem;--_ui5_link_opacity:0.4;--_ui5_link_text_decoration:none;--_ui5_link_hover_text_decoration:underline;--ui5_list_footer_text_color:var(--sapTextColor);--ui5-listitem-background-color:var(--sapList_Background);--ui5-listitem-border-bottom:1px solid var(--sapList_BorderColor);--ui5-listitem-selected-border-bottom:1px solid var(--sapList_SelectionBorderColor);--_ui5_listitembase_focus_width:1px;--_ui5_product_switch_item_border:none;--_ui5_monthpicker_item_border:none;--_ui5_monthpicker_item_margin:1px;--_ui5_monthpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_monthpicker_item_focus_after_offset:2px;--_ui5_monthpicker_item_border_radius:0.25rem;--_ui5_messagestrip_icon_width:2.5rem;--_ui5_messagestrip_border_radius:0.1875rem;--_ui5_messagestrip_button_border_width:0;--_ui5_messagestrip_button_border_style:none;--_ui5_messagestrip_button_border_color:transparent;--_ui5_messagestrip_button_border_radius:0;--_ui5_messagestrip_padding:0.4375rem 2.5rem 0.4375rem 2.5rem;--_ui5_messagestrip_padding_no_icon:0.4375rem 2.5rem 0.4375rem 1rem;--_ui5_messagestrip_button_height:1.625rem;--_ui5_messagestrip_border_width:1px;--_ui5_messagestrip_close_button_border:none;--_ui5_messagestrip_close_button_size:1.625rem;--_ui5_messagestrip_icon_top:0.4375rem;--_ui5_messagestrip_focus_width:1px;--_ui5_messagestrip_focus_offset:-2px;--_ui5_panel_focus_border:1px dotted var(--sapContent_FocusColor);--_ui5_panel_header_height:2.75rem;--_ui5_panel_button_root_width:2.75rem;--_ui5_popup_content_padding:.4375em;--_ui5_progress_indicator_value_state_none:var(--sapNeutralElementColor);--_ui5_progress_indicator_value_state_error:var(--sapNegativeElementColor);--_ui5_progress_indicator_value_state_warning:var(--sapCriticalElementColor);--_ui5_progress_indicator_value_state_success:var(--sapPositiveElementColor);--_ui5_progress_indicator_value_state_information:var(--sapInformativeElementColor);--_ui5_progress_indicator_color:var(--sapTextColor);--_ui5_progress_indicator_bar_color:var(--sapContent_ContrastTextColor);--_ui5_progress_indicator_border:0.0625rem solid var(--sapField_BorderColor);--_ui5_progress_indicator_bar_border_max:none;--_ui5_progress_indicator_icon_visibility:none;--_ui5_radiobutton_min_width:2.75rem;--_ui5_radiobutton_min_width_compact:2rem;--_ui5_radiobutton_hover_fill:var(--sapField_Hover_Background);--_ui5_radiobutton_border_width:1px;--_ui5_radiobutton_selected_fill:var(--sapSelectedColor);--_ui5_radiobutton_selected_error_fill:var(--sapField_InvalidColor);--_ui5_radiobutton_selected_warning_fill:var(--sapField_TextColor);--_ui5_radiobutton_warning_error_border_dash:0;--_ui5_select_disabled_background:var(--sapField_Background);--_ui5_select_disabled_border_color:var(--sapField_BorderColor);--_ui5_select_state_error_warning_border_style:solid;--_ui5_select_state_error_warning_border_width:0.125rem;--_ui5_select_hover_icon_left_border:1px solid transparent;--_ui5_select_rtl_hover_icon_left_border:none;--_ui5_select_rtl_hover_icon_right_border:none;--_ui5_select_focus_width:1px;--_ui5_switch_height:2.75rem;--_ui5_switch_width:3.875rem;--_ui5_switch_no_label_width:3.25rem;--_ui5_switch_outline:1px;--_ui5_switch_compact_height:2rem;--_ui5_switch_compact_width:3.5rem;--_ui5_switch_compact_no_label_width:2.5rem;--_ui5_switch_track_height:1.375rem;--_ui5_switch_track_no_label_height:1.25rem;--_ui5_switch_track_compact_no_label_height:1rem;--_ui5_switch_track_hover_border_color:var(--_ui5_switch_track_checked_border_color);--_ui5_switch_track_hover_background_color:var(--sapButton_Track_Background);--_ui5_switch_track_hover_checked_background_color:var(--sapButton_Track_Selected_Background);--_ui5_switch_track_border_radius:0.75rem;--_ui5_switch_track_disabled_checked_bg:var(--_ui5_switch_track_checked_bg);--_ui5_switch_track_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_track_disabled_semantic_checked_bg:var(--sapSuccessBackground);--_ui5_switch_track_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_track_disabled_semantic_bg:var(--sapErrorBackground);--_ui5_switch_track_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_width:2rem;--_ui5_switch_handle_height:2rem;--_ui5_switch_handle_border_width:1px;--_ui5_switch_handle_border_radius:1rem;--_ui5_switch_handle_bg:var(--sapButton_TokenBackground);--_ui5_switch_handle_checked_bg:var(--sapButton_Selected_Background);--_ui5_switch_handle_checked_border_color:var(--sapButton_Selected_BorderColor);--_ui5_switch_handle_semantic_hover_bg:var(--sapErrorBackground);--_ui5_switch_handle_semantic_checked_hover_bg:var(--sapSuccessBackground);--_ui5_switch_handle_semantic_hover_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_semantic_checked_hover_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_compact_width:1.625rem;--_ui5_switch_handle_compact_height:1.625rem;--_ui5_switch_handle_disabled_bg:var(--_ui5_switch_handle_bg);--_ui5_switch_handle_disabled_checked_bg:var(--_ui5_switch_handle_checked_bg);--_ui5_switch_handle_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_handle_disabled_semantic_checked_bg:var(--sapButton_Background);--_ui5_switch_handle_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5_switch_text_on_semantic_color:var(--sapPositiveElementColor);--_ui5_switch_text_off_semantic_color:var(--sapNegativeElementColor);--_ui5_switch_text_disabled_color:var(--sapTextColor);--_ui5_tc_header_height:4.6875rem;--_ui5_tc_header_height_compact:3.6875rem;--_ui5_tc_header_height_text_only:3rem;--_ui5_tc_header_height_text_only_compact:2rem;--_ui5_tc_headeritem_text_selected_color:var(--sapSelectedColor);--_ui5_tc_headerItem_neutral_color:var(--sapNeutralColor);--_ui5_tc_headerItem_positive_color:var(--sapPositiveColor);--_ui5_tc_headerItem_negative_color:var(--sapNegativeColor);--_ui5_tc_headerItem_critical_color:var(--sapCriticalColor);--_ui5_tc_headerItem_neutral_border_color:var(--_ui5_tc_headerItem_neutral_color);--_ui5_tc_headerItem_positive_border_color:var(--_ui5_tc_headerItem_positive_color);--_ui5_tc_headerItem_negative_border_color:var(--_ui5_tc_headerItem_negative_color);--_ui5_tc_headerItem_critical_border_color:var(--_ui5_tc_headerItem_critical_color);--_ui5_tc_headerItem_neutral_selected_border_color:var(--_ui5_tc_headerItem_neutral_color);--_ui5_tc_headerItem_positive_selected_border_color:var(--_ui5_tc_headerItem_positive_color);--_ui5_tc_headerItem_negative_selected_border_color:var(--_ui5_tc_headerItem_negative_color);--_ui5_tc_headerItem_critical_selected_border_color:var(--_ui5_tc_headerItem_critical_color);--_ui5_tc_headerItem_focus_border:1px dotted var(--sapContent_FocusColor);--_ui5_tc_headerItemSemanticIcon_display:none;--_ui5_tc_overflowItem_neutral_color:var(--sapNeutralColor);--_ui5_tc_overflowItem_positive_color:var(--sapPositiveColor);--_ui5_tc_overflowItem_negative_color:var(--sapNegativeColor);--_ui5_tc_overflowItem_critical_color:var(--sapCriticalColor);--_ui5_tc_headerItemIcon_border:1px solid var(--sapHighlightColor);--_ui5_tc_headerItemIcon_color:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_background:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_headerItemIcon_positive_selected_background:var(--sapPositiveColor);--_ui5_tc_headerItemIcon_negative_selected_background:var(--sapNegativeColor);--_ui5_tc_headerItemIcon_critical_selected_background:var(--sapCriticalColor);--_ui5_tc_headerItemIcon_neutral_selected_background:var(--sapNeutralColor);--_ui5_tc_headerItemIcon_semantic_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_header_box_shadow:var(--sapContent_HeaderShadow);--_ui5_tc_header_border_bottom:0.0625rem solid var(--sapObjectHeader_Background);--_ui5_tc_headerItem_color:var(--sapContent_LabelColor);--_ui5_tc_headerItemContent_border_bottom:0.188rem solid var(--sapSelectedColor);--_ui5_tc_overflowItem_default_color:var(--sapHighlightColor);--_ui5_tc_overflowItem_current_color:CurrentColor;--_ui5_tc_content_border_bottom:0.0625rem solid var(--sapObjectHeader_BorderColor);--_ui5_textarea_focus_after_width:1px;--_ui5_textarea_warning_border_style:solid;--_ui5_textarea_warning_border_width:2px;--_ui5_TimelineItem_arrow_size:1.625rem;--_ui5_TimelineItem_bubble_outline_width:0.0625rem;--_ui5_TimelineItem_bubble_outline_top:-0.125rem;--_ui5_TimelineItem_bubble_outline_right:-0.125rem;--_ui5_TimelineItem_bubble_outline_bottom:-0.125rem;--_ui5_TimelineItem_bubble_outline_left:-0.625rem;--_ui5_TimelineItem_bubble_rtl_left_offset:-0.125rem;--_ui5_TimelineItem_bubble_rtl_right_offset:-0.625rem;--_ui5_time_picker_border:0.0625rem solid transparent;--_ui5_toast_vertical_offset:3rem;--_ui5_toast_horizontal_offset:2rem;--_ui5_toast_background:var(--sapList_Background);--_ui5_toast_shadow:var(--sapContent_Shadow2);--_ui5_wheelslider_item_text_size:var(--sapFontSize);--_ui5_wheelslider_label_text_size:var(--sapFontSmallSize);--_ui5_wheelslider_mobile_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*4);--_ui5_wheelslider_label_text_color:var(--sapContent_LabelColor);--_ui5_wheelslider_height:15rem;--_ui5_wheelslider_mobile_height:27rem;--_ui5_wheelslider_arrows_visibility:hidden;--_ui5_wheelslider_item_background_color:var(--sapLegend_WorkingBackground);--_ui5_wheelslider_item_text_color:var(--sapTextColor);--_ui_wheelslider_item_hover_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5_wheelslider_item_border_color:var(--sapList_Background);--_ui5_wheelslider_item_hovered_border_color:var(--sapList_Background);--_ui5_wheelslider_collapsed_item_text_color:var(--_ui5_wheelslider_item_border_color);--_ui5_wheelslider_selected_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_selected_item_hover_background_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5_wheelslider_active_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_active_item_text_color:var(--sapContent_Selected_TextColor);--_ui5_wheelslider_item_width:3rem;--_ui5_wheelslider_item_height:2.875rem;--_ui5_wheelslider_selection_frame_color:var(--sapList_SelectionBorderColor);--_ui_wheelslider_item_border_radius:var(--_ui5_button_border_radius);--_ui5_toggle_button_pressed_focussed:var(--sapButton_Selected_BorderColor);--_ui5_toggle_button_pressed_focussed_hovered:var(--sapButton_Selected_BorderColor);--_ui5_yearpicker_item_selected_focus:var(--sapContent_Selected_Background);--_ui5_yearpicker_item_border:none;--_ui5_yearpicker_item_margin:1px;--_ui5_yearpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_yearpicker_item_focus_after_offset:2px;--_ui5_yearpicker_item_border_radius:0.25rem;--_ui5_calendar_header_arrow_button_border:none;--_ui5_calendar_header_arrow_button_border_radius:0.25rem;--_ui5_calendar_header_middle_button_width:6.25rem;--_ui5_calendar_header_middle_button_flex:1 1 auto;--_ui5_calendar_header_middle_button_focus_border_radius:0.25rem;--_ui5_calendar_header_middle_button_focus_border:none;--_ui5_calendar_header_middle_button_focus_after_display:block;--_ui5_calendar_header_middle_button_focus_after_width:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_height:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_top_offset:0.125rem;--_ui5_calendar_header_middle_button_focus_after_left_offset:0.125rem;--ui5_table_header_row_outline_width:1px;--ui5_table_row_outline_width:1px;--ui5_title_level_1Size:1.625rem;--ui5_title_level_2Size:1.375rem;--ui5_title_level_3Size:1.250rem;--ui5_title_level_4Size:1.125rem;--ui5_title_level_5Size:1rem;--ui5_title_level_6Size:0.875rem;--_ui5_token_background:var(--sapButton_TokenBackground);--_ui5_token_border_radius:0.25rem;--_ui5_token_focus_outline_width:0.0625rem;--_ui5_token_text_color:var(--sapTextColor);--_ui5_token_icon_color:var(--sapContent_IconColor);--_ui5_value_state_message_border:none;--_ui5-multi_combobox_token_margin_top:1px}.sapUiSizeCompact,.ui5-content-density-compact,:root,[data-ui5-compact-size]{--_ui5_datetime_timeview_width:17rem;--_ui5_list_item_selection_btn_margin_top:calc(-1*var(--_ui5_checkbox_wrapper_padding));--_ui5_token_wrapper_left_padding:0;--_ui5_button_icon_font_size:1rem;--_ui5_daypicker_weeknumbers_container_padding_top:2rem;--_ui5_wheelslider_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*2)}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_button_base_height:1.625rem;--_ui5_button_base_padding:0.4375rem;--_ui5_button_base_min_width:2rem;--_ui5_calendar_header_height:2rem;--_ui5_calendar_header_padding:0;--_ui5_calendar_header_arrow_button_width:2rem;--_ui5_checkbox_root_side_padding:var(--_ui5_checkbox_wrapped_focus_padding);--_ui5_checkbox_wrapped_content_margin_top:var(--_ui5_checkbox_compact_wrapped_label_margin_top);--_ui5_checkbox_wrapped_focus_left_top_bottom_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_width_height:var(--_ui5_checkbox_compact_width_height);--_ui5_checkbox_wrapper_padding:var(--_ui5_checkbox_compact_wrapper_padding);--_ui5_checkbox_focus_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_inner_width_height:var(--_ui5_checkbox_compact_inner_size);--_ui5_checkbox_icon_size:.75rem;--_ui5_custom_list_item_height:2rem;--_ui5_custom_list_item_rb_min_width:2rem;--_ui5_day_picker_item_width:2rem;--_ui5_day_picker_item_height:2rem;--_ui5_day_picker_empty_height:2.125rem;--_ui5_datetime_picker_height:17rem;--_ui5_datetime_picker_width:34.0625rem;--_ui5_datetime_timeview_phonemode_width:18.5rem;--_ui5_datetime_timeview_padding:0.5rem;--_ui5_input_height:var(--_ui5_input_compact_height);--_ui5_input_inner_padding:0 0.5rem;--_ui5_input_icon_min_width:var(--_ui5_input_compact_min_width);--_ui5_input_icon_padding:.25rem .5rem;--_ui5_input_value_state_icon_padding:.1875rem .5rem;--_ui5_textarea_padding:.1875rem .5rem;--_ui5_list_no_data_height:2rem;--_ui5_list_item_cb_margin_right:.5rem;--_ui5_list_item_title_size:var(--sapFontSize);--_ui5_list_item_img_margin:0.55rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:2rem;--_ui5_list_item_icon_size:1rem;--_ui5_list_busy_row_height:2rem;--_ui5_month_picker_item_height:2rem;--_ui5_panel_header_height:2rem;--_ui5_year_picker_item_height:2rem;--_ui5_tokenizer_root_padding:0.125rem;--_ui5_token_height:1.125rem;--_ui5_token_icon_size:.75rem;--_ui5_token_icon_padding:0.1rem 0.25rem;--_ui5_token_wrapper_right_padding:0.25rem;--_ui5_tl_bubble_padding:.5rem;--_ui5_tl_indicator_before_bottom:-.5rem;--_ui5_tl_padding:.5rem;--_ui5_tl_li_margin_bottom:.5rem;--_ui5_rb_height:2rem;--_ui5_rb_label_side_padding:.5rem;--_ui5_rb_focus_dist:.375rem;--_ui5_rb_inner_size:2rem;--_ui5_rb_svg_size:1rem;--_ui5_rb_label_width:calc(100% - 2rem + 1px);--_ui5_rb_rtl_focus_right:0.375rem;--_ui5_wheelslider_item_width:4rem;--_ui5_wheelslider_item_height:2rem;--_ui5_wheelslider_height:14rem;--_ui5_wheelslider_arrows_visibility:visible;--_ui5_switch_height:var(--_ui5_switch_compact_height);--_ui5_switch_width:var(--_ui5_switch_compact_width);--_ui5_switch_handle_height:var(--_ui5_switch_handle_compact_height);--_ui5_switch_handle_width:var(--_ui5_switch_handle_compact_width);--_ui5_switch_text_on_left:calc(-100% + 1.5625rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.5rem);--_ui5_switch_no_label_width:var(--_ui5_switch_compact_no_label_width);--_ui5_switch_track_no_label_height:var(--_ui5_switch_track_compact_no_label_height);--_ui5_switch_rtl_transform:translateX(-100%) translateX(1.5rem);--_ui5_switch_text_right:calc(-100% + 1.5625rem);--_ui5_tc_item_text:2rem;--_ui5_tc_item_text_line_height:1.325rem;--_ui5_tc_item_icon_size:1rem;--_ui5_tc_item_add_text_margin_top:0.3125rem;--_ui5_tc_header_height:var(--_ui5_tc_header_height_compact);--_ui5_radiobutton_min_width:var(--_ui5_radiobutton_min_width_compact);--_ui5-responnsive_popover_header_height:2.5rem;--ui5_side_navigation_item_height:2rem;--_ui5-tree-indent-step:0.5rem;--_ui5-tree-toggle-box-width:2rem;--_ui5-tree-toggle-box-height:1.5rem;--_ui5-tree-toggle-icon-size:0.8125rem}';
registerThemeProperties('@ui5/webcomponents-theme-base', 'sap_fiori_3', defaultThemeBase);
registerThemeProperties('@ui5/webcomponents', 'sap_fiori_3', defaultTheme);
var iconCss =
  ':host(:not([hidden])){display:inline-block}:host([invalid]){display:none}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{width:1rem;height:1rem;color:var(--sapContent_NonInteractiveIconColor);fill:currentColor;outline:none}:host([interactive][focused]) .ui5-icon-root{outline:1px dotted var(--sapContent_FocusColor)}:host(:not([dir=ltr])) .ui5-icon-root[dir=rtl]{transform:scale(-1);transform-origin:center}.ui5-icon-root{display:flex;transform:scaleY(-1);transform-origin:center;outline:none}';
const ICON_NOT_FOUND$1 = 'ICON_NOT_FOUND';

/**
 * @public
 */
const metadata$1 = {
  tag: 'ui5-icon',
  languageAware: true,
  properties: /** @lends sap.ui.webcomponents.main.Icon.prototype */ {
    /**
     * Defines if the icon is interactive (focusable and pressable)
     * @type {boolean}
     * @defaultvalue false
     * @public
     * @since 1.0.0-rc.8
     */
    interactive: {
      type: Boolean
    },

    /**
     * Defines the unique identifier (icon name) of each <code>ui5-icon</code>.
     * <br><br>
     * To browse all available icons, see the
     * <ui5-link target="_blank" rel="noopener noreferrer" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
     * <br><br>
     * Example:
     * <br>
     * <code>name='add'</code>, <code>name='delete'</code>, <code>name='employee'</code>.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    name: {
      type: String
    },

    /**
     * Defines the text alternative of the <code>ui5-icon</code>.
     * If not provided a default text alternative will be set, if present.
     * <br><br>
     * <b>Note:</b> Every icon should have a text alternative in order to
     * calculate its accessible name.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    accessibleName: {
      type: String
    },

    /**
     * Defines whether the <code>ui5-icon</code> should have a tooltip.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    showTooltip: {
      type: Boolean
    },

    /**
     * @private
     */
    pathData: {
      type: String,
      noAttribute: true
    },

    /**
     * @private
     */
    accData: {
      type: Object,
      noAttribute: true
    },

    /**
     * @private
     */
    focused: {
      type: Boolean
    },

    /**
     * @private
     */
    invalid: {
      type: Boolean
    }
  },
  events: {
    /**
     * Fired on mouseup, space and enter if icon is interactive
     * @private
     * @since 1.0.0-rc.8
     */
    click: {}
  }
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-icon</code> component represents an SVG icon.
 * There are two main scenarios how the <code>ui5-icon</code> component is used:
 * as a purely decorative element; or as a visually appealing clickable area in the form of an icon button.
 * <br><br>
 * A large set of built-in icons is available
 * and they can be used by setting the <code>name</code> property on the <code>ui5-icon</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Icon.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Icon
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-icon
 * @public
 */
class Icon extends UI5Element {
  constructor() {
    super();
    this.i18nBundle = getI18nBundle('@ui5/webcomponents');
  }

  static get metadata() {
    return metadata$1;
  }

  static get render() {
    return litRender;
  }

  static get template() {
    return main$1;
  }

  static get styles() {
    return iconCss;
  }

  static async onDefine() {
    this.createGlobalStyle(); // hide all icons until the first icon has rendered (and added the Icon.css)
    await fetchI18nBundle('@ui5/webcomponents');
  }

  _onfocusin(event) {
    if (this.interactive) {
      this.focused = true;
    }
  }

  _onfocusout(event) {
    this.focused = false;
  }

  _onkeydown(event) {
    if (this.interactive && isEnter(event)) {
      this.fireEvent('click');
    }
  }

  _onkeyup(event) {
    if (this.interactive && isSpace(event)) {
      this.fireEvent('click');
    }
  }

  _onclick(event) {
    if (this.interactive) {
      event.preventDefault();
      // Prevent the native event and fire custom event because otherwise the noConfict event won't be thrown
      this.fireEvent('click');
    }
  }

  get _dir() {
    if (!this.effectiveDir) {
      return;
    }

    if (this.ltr) {
      return 'ltr';
    }

    return this.effectiveDir;
  }

  get tabIndex() {
    return this.interactive ? '0' : '-1';
  }

  get role() {
    if (this.interactive) {
      return 'button';
    }

    return this.accessibleNameText ? 'img' : 'presentation';
  }

  static createGlobalStyle() {
    if (!window.ShadyDOM) {
      return;
    }
    const styleElement = document.head.querySelector(`style[data-ui5-icon-global]`);
    if (!styleElement) {
      createStyleInHead(`ui5-icon { display: none !important; }`, { 'data-ui5-icon-global': '' });
    }
  }

  static removeGlobalStyle() {
    if (!window.ShadyDOM) {
      return;
    }
    const styleElement = document.head.querySelector(`style[data-ui5-icon-global]`);
    if (styleElement) {
      document.head.removeChild(styleElement);
    }
  }

  async onBeforeRendering() {
    const name = this.name;
    if (!name) {
      /* eslint-disable-next-line */
      return console.warn('Icon name property is required', this);
    }
    let iconData = getIconDataSync(name);
    if (!iconData) {
      iconData = await getIconData(name);
    }

    if (iconData === ICON_NOT_FOUND$1) {
      this.invalid = true;
      /* eslint-disable-next-line */
      return console.warn(
        `Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/icons/${name.replace('sap-icon://', '')}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/Assets.js".`
      );
    }

    if (!iconData) {
      this.invalid = true;
      /* eslint-disable-next-line */
      return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
    }

    this.pathData = iconData.pathData;
    this.accData = iconData.accData;
    this.ltr = iconData.ltr;
  }

  get hasIconTooltip() {
    return this.showTooltip && this.accessibleNameText;
  }

  get accessibleNameText() {
    if (this.accessibleName) {
      return this.accessibleName;
    }

    return this.i18nBundle.getText(this.accData) || undefined;
  }

  async onEnterDOM() {
    setTimeout(() => {
      this.constructor.removeGlobalStyle(); // remove the global style as Icon.css is already in place
    }, 0);
  }
}

Icon.define();
const BUTTON_ARIA_TYPE_ACCEPT = { key: 'BUTTON_ARIA_TYPE_ACCEPT', defaultText: 'Positive Action' };
const BUTTON_ARIA_TYPE_REJECT = { key: 'BUTTON_ARIA_TYPE_REJECT', defaultText: 'Negative Action' };
const BUTTON_ARIA_TYPE_EMPHASIZED = { key: 'BUTTON_ARIA_TYPE_EMPHASIZED', defaultText: 'Emphasized' };
registerThemeProperties('@ui5/webcomponents-theme-base', 'sap_fiori_3', defaultThemeBase);
registerThemeProperties('@ui5/webcomponents', 'sap_fiori_3', defaultTheme);
var buttonCss =
  '.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:0;top:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5_button_base_min_width);height:var(--_ui5_button_base_height);font-family:var(--sapFontFamily);font-size:var(--sapFontSize);text-shadow:var(--_ui5_button_text_shadow);border-radius:var(--_ui5_button_border_radius);border-width:.0625rem;cursor:pointer;background-color:var(--sapButton_Background);border:1px solid var(--sapButton_BorderColor);color:var(--sapButton_TextColor);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host([has-icon]) button[dir=rtl].ui5-button-root .ui5-button-text{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}:host([has-icon][icon-end]) button[dir=rtl].ui5-button-root .ui5-button-icon{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}.ui5-button-root{min-width:inherit;cursor:inherit;height:100%;width:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;outline:none;padding:0 var(--_ui5_button_base_padding);position:relative;background:transparent;border:none;color:inherit;text-shadow:inherit;font:inherit;white-space:inherit;overflow:inherit;text-overflow:inherit;letter-spacing:inherit;word-spacing:inherit;line-height:inherit}:host(:not([active]):hover),:host(:not([hidden]).ui5_hovered){background:var(--sapButton_Hover_Background)}.ui5-button-icon{color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-left:var(--_ui5_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto;padding:0}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;position:relative;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{margin-left:var(--_ui5_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-left:0}:host([disabled]){opacity:.5;pointer-events:none}:host([focused]){outline:var(--_ui5_button_outline);outline-offset:var(--_ui5_button_outline_offset)}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([active]:not([disabled])){background-image:none;background-color:var(--sapButton_Active_Background);border-color:var(--_ui5_button_active_border_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([active]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Positive]){background-color:var(--sapButton_Accept_Background);border-color:var(--_ui5_button_positive_border_color);color:var(--sapButton_Accept_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Positive]:hover){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--_ui5_button_positive_border_hover_color)}:host([design=Positive][active]){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--_ui5_button_positive_border_active_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Positive][focused]){outline-color:var(--_ui5_button_positive_border_focus_hover_color);border-color:var(--_ui5_button_positive_focus_border_color)}:host([design=Positive][active][focused]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Negative]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Negative]:hover){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor)}:host([design=Negative][focused]){border-color:var(--_ui5_button_negative_focus_border_color);outline-color:var(--_ui5_button_positive_border_focus_hover_color)}:host([design=Negative][active]){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--_ui5_button_negative_active_border_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Negative][active][focused]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Emphasized]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);color:var(--sapButton_Emphasized_TextColor);text-shadow:0 0 .125rem var(--sapButton_Emphasized_TextShadow);font-weight:var(--_ui5_button_emphasized_font_weight)}:host([design=Emphasized]:not([active]):hover){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor)}:host([design=Empasized][active]){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Emphasized][focused]){outline-color:var(--sapContent_ContrastFocusColor);border-color:var(--_ui5_button_emphasized_focused_border_color)}:host([design=Transparent]){background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);text-shadow:var(--_ui5_button_text_shadow);border-color:var(--_ui5_button_transparent_border_color)}:host([design=Transparent]):hover{background-color:var(--sapButton_Lite_Hover_Background)}:host([design=Transparent][active]){background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Transparent]:not([active]):hover){border-color:var(--_ui5_button_transparent_hover_border_color)}[ui5-button][focused]{outline:none}[ui5-button][focused] .ui5-button-root{position:relative}[ui5-button][focused] .ui5-button-root:after{content:"";position:absolute;border-width:1px;border-style:dotted;border-color:var(--_ui5_button_focus_color);top:var(--_ui5_button_focus_offset);bottom:var(--_ui5_button_focus_offset);left:var(--_ui5_button_focus_offset);right:var(--_ui5_button_focus_offset)}[ui5-button][active] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Positive][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}[ui5-button][design=Positive][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Negative][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}[ui5-button][design=Negative][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Emphasized][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button] [ui5-icon].ui5-button-icon{height:var(--_ui5_button_icon_font_size);top:0}';
let isGlobalHandlerAttached = false;
let activeButton = null;

/**
 * @public
 */
const metadata$2 = {
  tag: 'ui5-button',
  languageAware: true,
  properties: /** @lends sap.ui.webcomponents.main.Button.prototype */ {
    /**
     * Defines the <code>ui5-button</code> design.
     * <br><br>
     * <b>Note:</b> Available options are "Default", "Emphasized", "Positive",
     * "Negative", and "Transparent".
     *
     * @type {ButtonDesign}
     * @defaultvalue "Default"
     * @public
     */
    design: {
      type: ButtonDesign,
      defaultValue: ButtonDesign.Default
    },

    /**
     * Defines whether the <code>ui5-button</code> is disabled
     * (default is set to <code>false</code>).
     * A disabled <code>ui5-button</code> can't be pressed or
     * focused, and it is not in the tab chain.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    disabled: {
      type: Boolean
    },

    /**
     * Defines the icon to be displayed as graphical element within the <code>ui5-button</code>.
     * The SAP-icons font provides numerous options.
     * <br><br>
     * Example:
     * <br>
     * <pre>ui5-button icon="palette"</pre>
     *
     * See all the available icons in the <ui5-link target="_blank" rel="noopener noreferrer" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    icon: {
      type: String
    },

    /**
     * Defines whether the icon should be displayed after the <code>ui5-button</code> text.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    iconEnd: {
      type: Boolean
    },

    /**
     * Defines the size of the icon inside the <code>ui5-button</code>.
     *
     * @type {string}
     * @defaultvalue undefined
     * @public
     * @since 1.0.0-rc.8
     */
    iconSize: {
      type: String,
      defaultValue: undefined
    },

    /**
     * When set to <code>true</code>, the <code>ui5-button</code> will
     * automatically submit the nearest form element upon <code>press</code>.
     * <br><br>
     * <b>Important:</b> For the <code>submits</code> property to have effect, you must add the following import to your project:
     * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    submits: {
      type: Boolean
    },

    /**
     * Used to switch the active state (pressed or not) of the <code>ui5-button</code>.
     * @private
     */
    active: {
      type: Boolean
    },

    /**
     * Defines if a content has been added to the default slot
     * @private
     */
    iconOnly: {
      type: Boolean
    },

    /**
     * Indicates if the elements is on focus
     * @private
     */
    focused: {
      type: Boolean
    },

    /**
     * Indicates if the elements has a slotted icon
     * @private
     */
    hasIcon: {
      type: Boolean
    },

    /**
     * Defines the aria-label attribute for the button
     * @type {String}
     * @defaultvalue: ""
     * @private
     * @since 1.0.0-rc.7
     */
    ariaLabel: {
      type: String,
      defaultValue: undefined
    },

    /**
     * Receives id(or many ids) of the elements that label the button
     * @type {String}
     * @defaultvalue ""
     * @private
     * @since 1.0.0-rc.7
     */
    ariaLabelledby: {
      type: String,
      defaultValue: ''
    },

    /**
     * @type {String}
     * @defaultvalue ""
     * @private
     * @since 1.0.0-rc.8
     */
    ariaExpanded: {
      type: String
    },

    /**
     * Indicates if the element if focusable
     * @private
     */
    nonFocusable: {
      type: Boolean
    },

    _iconSettings: {
      type: Object
    },
    _buttonAccInfo: {
      type: Object
    },

    /**
     * Defines the tabIndex of the component.
     * @private
     */
    _tabIndex: {
      type: String,
      defaultValue: '0',
      noAttribute: true
    }
  },
  managedSlots: true,
  slots: /** @lends sap.ui.webcomponents.main.Button.prototype */ {
    /**
     * Defines the text of the <code>ui5-button</code>.
     * <br><br>
     * <b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     *
     * @type {Node[]}
     * @slot
     * @public
     */
    default: {
      type: Node
    }
  },
  events: /** @lends sap.ui.webcomponents.main.Button.prototype */ {
    /**
     * Fired when the <code>ui5-button</code> is activated either with a
     * mouse/tap or by using the Enter or Space key.
     * <br><br>
     * <b>Note:</b> The event will not be fired if the <code>disabled</code>
     * property is set to <code>true</code>.
     *
     * @event
     * @public
     */
    click: {}
  }
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-button</code> component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the <code>ui5-button</code>, or by pressing
 * certain keyboard keys, such as Enter.
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-button</code> UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 * <br><br>
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 * <br><br>
 * You can set the <code>ui5-button</code> as enabled or disabled. An enabled
 * <code>ui5-button</code> can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled <code>ui5-button</code> appears inactive and cannot be pressed.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Button";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Button
 * @extends UI5Element
 * @tagname ui5-button
 * @public
 */
class Button extends UI5Element {
  static get metadata() {
    return metadata$2;
  }

  static get styles() {
    return buttonCss;
  }

  static get render() {
    return litRender;
  }

  static get template() {
    return main;
  }

  static get dependencies() {
    return [Icon];
  }

  constructor() {
    super();

    this._deactivate = () => {
      if (activeButton) {
        activeButton.active = false;
      }
    };

    if (!isGlobalHandlerAttached) {
      document.addEventListener('mouseup', this._deactivate);

      isGlobalHandlerAttached = true;
    }

    this.i18nBundle = getI18nBundle('@ui5/webcomponents');
  }

  onBeforeRendering() {
    const FormSupport = getFeature('FormSupport');
    if (this.submits && !FormSupport) {
      console.warn(
        `In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
      ); // eslint-disable-line
    }

    this.iconOnly = this.isIconOnly;
    this.hasIcon = !!this.icon;
  }

  _onclick(event) {
    event.isMarked = 'button';
    const FormSupport = getFeature('FormSupport');
    if (FormSupport) {
      FormSupport.triggerFormSubmit(this);
    }
  }

  _onmousedown(event) {
    event.isMarked = 'button';
    this.active = true;
    activeButton = this; // eslint-disable-line
  }

  _onmouseup(event) {
    event.isMarked = 'button';
  }

  _onkeydown(event) {
    event.isMarked = 'button';

    if (isSpace(event) || isEnter(event)) {
      this.active = true;
    }
  }

  _onkeyup(event) {
    if (isSpace(event) || isEnter(event)) {
      this.active = false;
    }
  }

  _onfocusout(_event) {
    this.active = false;
    this.focused = false;
  }

  _onfocusin(event) {
    event.isMarked = 'button';
    this.focused = true;
  }

  get hasButtonType() {
    return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
  }

  get isIconOnly() {
    return !Array.from(this.childNodes).filter((node) => node.nodeType !== Node.COMMENT_NODE).length;
  }

  get accInfo() {
    return {
      ariaExpanded: this.ariaExpanded || (this._buttonAccInfo && this._buttonAccInfo.ariaExpanded),
      ariaControls: this._buttonAccInfo && this._buttonAccInfo.ariaControls,
      ariaHaspopup: this._buttonAccInfo && this._buttonAccInfo.ariaHaspopup,
      title: this._buttonAccInfo && this._buttonAccInfo.title
    };
  }

  get ariaLabelText() {
    return getEffectiveAriaLabelText(this);
  }

  static typeTextMappings() {
    return {
      Positive: BUTTON_ARIA_TYPE_ACCEPT,
      Negative: BUTTON_ARIA_TYPE_REJECT,
      Emphasized: BUTTON_ARIA_TYPE_EMPHASIZED
    };
  }

  get buttonTypeText() {
    return this.i18nBundle.getText(Button.typeTextMappings()[this.design]);
  }

  get tabIndexValue() {
    const tabindex = this.getAttribute('tabindex');

    if (tabindex) {
      return tabindex;
    }

    return this.nonFocusable ? '-1' : this._tabIndex;
  }

  get styles() {
    return {
      icon: {
        width: this.iconSize,
        height: this.iconSize
      }
    };
  }

  static async onDefine() {
    await fetchI18nBundle('@ui5/webcomponents');
  }
}

Button.define();

/**
 * Base class for Luigi web component micro frontends.
 */
class LuigiElement extends HTMLElement {
  constructor(options) {
    super();
    const closedShadow = options ? options.closedShadow : false;
    this._shadowRoot = this.attachShadow({
      mode: closedShadow ? 'closed' : 'open',
      delegatesFocus: false
    });
    this.__initialized = false;
    this.deferLuigiClientWCInit = options ? options.deferLuigiClientWCInit : false;
  }

  /**
   * Invoked by luigi core if present, internal, don't override.
   * @private
   */
  __postProcess(ctx, luigiClient, module_location_path) {
    this.LuigiClient = luigiClient;
    this.context = ctx;
    const template = document.createElement('template');
    template.innerHTML = this.render(ctx);
    const attCnt = () => {
      if (!this.__initialized) {
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        Reflect.ownKeys(Reflect.getPrototypeOf(this)).forEach((el) => {
          if (el.startsWith('$_')) {
            this._shadowRoot[el] = this[el].bind(this);
          }
        });
        const elementsWithIds = this._shadowRoot.querySelectorAll('[id]');
        if (elementsWithIds) {
          elementsWithIds.forEach((el) => {
            this['$' + el.getAttribute('id')] = el;
          });
        }
        this.afterInit(ctx);
        this.__initialized = true;
      }
    };
    if (this.luigiConfig && this.luigiConfig.styleSources && this.luigiConfig.styleSources.length > 0) {
      let nr_styles = this.luigiConfig.styleSources.length;
      const loadStylesSync = this.luigiConfig.loadStylesSync;
      const afterLoadOrError = () => {
        nr_styles--;
        if (nr_styles < 1) {
          attCnt();
        }
      };

      this.luigiConfig.styleSources.forEach((element, index) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', module_location_path + element);
        if (loadStylesSync) {
          link.addEventListener('load', afterLoadOrError);
          link.addEventListener('error', afterLoadOrError);
        }
        this._shadowRoot.appendChild(link);
      });
      if (!loadStylesSync) {
        attCnt();
      }
    } else {
      attCnt();
    }
  }

  /**
   * Override to execute logic after initialization of the web component, i.e.
   * after internal rendering and all context data set.
   *
   * @param {*} ctx The context object passed by luigi core
   */
  afterInit(ctx) {
    return;
  }

  /**
   * Override to return the html template string defining the web component view.
   *
   * @param {*} ctx The context object passed by luigi core
   */
  render(ctx) {
    return '';
  }

  /**
   * Override to execute logic after an attribute of this web component has changed.
   */
  update() {
    return;
  }

  /**
   * Override to execute logic when a new context object is set.
   *
   * @param {*} ctx The new context object passed by luigi core
   */
  onContextUpdate(ctx) {
    return;
  }

  /**
   * Query selector operating on shadow root.
   *
   * @see ParentNode.querySelector
   */
  querySelector(selector) {
    return this._shadowRoot.querySelector(selector);
  }

  /**
   * Handles changes on the context property.
   *
   * @private
   */
  set context(ctx) {
    this.__lui_ctx = ctx;
    if (this.__initialized) {
      this.onContextUpdate(ctx);
      this.attributeChangedCallback();
    }
  }

  get context() {
    return this.__lui_ctx;
  }

  /**
   * Handles changes on attributes.
   *
   * @private
   */
  attributeChangedCallback(name, oldVal, newVal) {
    this.update();
  }
}

/**
 * Html string processing according to luigi functionality.
 * Also useful in combination with LitElement VS Code plugins.
 *
 * @param {String} literal The literal to process.
 * @returns {String} Returns the processed literal.
 */
function html$1(literal, ...keys) {
  let html = '';
  literal.forEach((el, index) => {
    html += el;
    if (index < keys.length && keys[index] !== undefined && keys[index] !== null) {
      html += keys[index];
    }
  });
  return html.replace(/\$\_/gi, 'this.getRootNode().$_');
}

class myCustomWebComponent extends LuigiElement {
  constructor() {
    super();
  }

  afterInit(ctx) {
    this.$button = this.querySelector('ui5-button');
    this.$button.addEventListener('click', () => {
      if (this.showAlert) {
        this.LuigiClient.uxManager().showAlert({
          text: 'Hello from ' + this.label,
          type: 'info'
        });
      }
      this.LuigiClient.publishEvent(new CustomEvent('buttonPressed', { details: this.label }));
    });
    this.onContextUpdate(ctx);
  }

  onContextUpdate(ctx) {
    this.label = ctx.label;
    this.$button.innerHTML = this.label;
    this.showAlert = ctx.showAlert === undefined ? true : ctx.showAlert;
  }

  render() {
    return html$1`
    <div style="padding: 20px">
      <section class="fd-section">
        <p>This is a luigi micro frontend, based on web components.</p>
      </section>
      <div class="container">
        <ui5-button>Hello world!</ui5-button>
      </div>
    </div>
  `;
  }
}

export default myCustomWebComponent;
