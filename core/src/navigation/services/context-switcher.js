import * as Helpers from '../../utilities/helpers.js';

export const ContextSwitcherHelpers = {
  prepareParentNodePath(config) {
    if (!config.parentNodePath || !config.parentNodePath.startsWith('/')) {
      console.error(
        'Luigi Config Error: navigation.contextSwitcher.parentNodePath must be defined as an absolute path.'
      );
    }
    if (config.parentNodePath && !config.parentNodePath.endsWith('/')) {
      // add trailing slash it does not exist
      config.parentNodePath = `${config.parentNodePath}/`;
    }
    return config.parentNodePath;
  },

  generateSwitcherNav(config, rawOptions) {
    const parentNodePath = this.prepareParentNodePath(config);
    return rawOptions.map(opt => ({
      label: opt.label,
      path: (parentNodePath || '/') + opt.pathValue,
      id: opt.pathValue
    }));
  },

  getMatchingNodeName(options, id) {
    const found = options.find(o => o.pathValue === id);
    return found && found.label;
  },

  async getFallbackNodeName(fallbackLabelResolver, id) {
    return fallbackLabelResolver ? await fallbackLabelResolver(id) : id;
  },

  async getSelectedLabel(
    currentPath,
    options,
    parentNodePath,
    fallbackLabelResolver
  ) {
    let selectedLabel;
    const inContextBasePath =
      parentNodePath &&
      currentPath
        .split('/')
        .filter(s => Boolean(s))
        .includes(parentNodePath.substring(1));
    if (inContextBasePath) {
      // we are inside the context switcher base path
      const truncatedPath = Helpers.trimLeadingSlash(
        currentPath.replace(parentNodePath, '')
      );
      const selectedId = truncatedPath.split('/')[0];
      selectedLabel = ContextSwitcherHelpers.getMatchingNodeName(
        options,
        selectedId
      );
      selectedLabel =
        selectedLabel ||
        (await ContextSwitcherHelpers.getFallbackNodeName(
          fallbackLabelResolver,
          selectedId
        ));
    }
    return selectedLabel;
  }
};
