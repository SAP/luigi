import * as Helpers from '../../utilities/helpers.js';

export const ContextSwitcherHelpers = {
  getPreparedParentNodePath(config) {
    if (!config.parentNodePath || !config.parentNodePath.startsWith('/')) {
      console.error(
        'Luigi Config Error: navigation.contextSwitcher.parentNodePath must be defined as an absolute path.'
      );
    }
    if (config.parentNodePath) {
      return Helpers.addTrailingSlash(config.parentNodePath);
    }
    return config.parentNodePath;
  },

  generateSwitcherNav(config, rawOptions) {
    const parentNodePath = this.getPreparedParentNodePath(config);
    return rawOptions.map(opt => ({
      label: opt.label,
      path: (parentNodePath || '/') + opt.pathValue,
      id: opt.pathValue
    }));
  },

  getLabelFromOptions(options, id) {
    const found = options.find(o => o.id === id);
    return found && found.label;
  },

  isContextSwitcherDetailsView(currentPath, parentNodePath) {
    const currentPathNormalized = Helpers.normalizePath(currentPath);
    const parentNodePathNormalized = Helpers.normalizePath(parentNodePath);

    return Boolean(
      parentNodePath &&
        currentPathNormalized.startsWith(parentNodePathNormalized) &&
        !currentPathNormalized.endsWith(parentNodePathNormalized)
    );
  },

  async getFallbackLabel(fallbackLabelResolver, id) {
    return fallbackLabelResolver ? await fallbackLabelResolver(id) : id;
  },

  async getSelectedLabel(
    currentPath,
    options,
    parentNodePath,
    fallbackLabelResolver
  ) {
    currentPath = Helpers.normalizePath(currentPath);
    parentNodePath = Helpers.normalizePath(parentNodePath);

    if (
      !ContextSwitcherHelpers.isContextSwitcherDetailsView(
        currentPath,
        parentNodePath
      )
    ) {
      return;
    }

    // we are inside the context switcher base path
    const selectedId = currentPath.replace(parentNodePath, '').split('/')[0];

    let selectedLabel;

    if (options) {
      selectedLabel = ContextSwitcherHelpers.getLabelFromOptions(
        options,
        selectedId
      );
    }

    // get the label from fallback if selectedId is not
    // in options or options not yet lazy loaded by click
    return (
      selectedLabel ||
      (await ContextSwitcherHelpers.getFallbackLabel(
        fallbackLabelResolver,
        selectedId
      ))
    );
  }
};
