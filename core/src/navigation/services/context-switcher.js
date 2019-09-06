import { GenericHelpers } from '../../utilities/helpers';
import { LuigiConfig } from '../../core-api';

export const ContextSwitcherHelpers = {
  getPreparedParentNodePath(config) {
    if (!config.parentNodePath || !config.parentNodePath.startsWith('/')) {
      console.error(
        'Luigi Config Error: navigation.contextSwitcher.parentNodePath must be defined as an absolute path.'
      );
    }
    if (config.parentNodePath) {
      return GenericHelpers.addTrailingSlash(config.parentNodePath);
    }
    return config.parentNodePath;
  },

  generateSwitcherNav(config, rawOptions) {
    const parentNodePath = this.getPreparedParentNodePath(config);
    return rawOptions.map(opt => ({
      label: opt.label,
      path: (parentNodePath || '/') + opt.pathValue,
      id: opt.pathValue,
      testId: opt.testId
    }));
  },

  getLabelFromOptions(options, id) {
    const found = options.find(o => o.id === id);
    return found && found.label;
  },

  isContextSwitcherDetailsView(currentPath, parentNodePath) {
    const currentPathNormalized = GenericHelpers.normalizePath(currentPath);
    const parentNodePathNormalized = GenericHelpers.normalizePath(
      parentNodePath
    );

    return Boolean(
      parentNodePath &&
        currentPathNormalized &&
        currentPathNormalized.startsWith(parentNodePathNormalized) &&
        currentPathNormalized !== parentNodePathNormalized
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
    currentPath = GenericHelpers.normalizePath(currentPath);
    parentNodePath = GenericHelpers.normalizePath(parentNodePath);

    if (
      !ContextSwitcherHelpers.isContextSwitcherDetailsView(
        currentPath,
        parentNodePath
      )
    ) {
      return;
    }

    // we are inside the context switcher base path
    const selectedId = currentPath
      .replace(parentNodePath, '')
      .split('/')[0]
      .split('?')[0]; //ignore everything after '?'

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
  },

  async fetchOptions(existingOptions = []) {
    const config = LuigiConfig.getConfigValue('navigation.contextSwitcher');
    if (!config.lazyloadOptions && existingOptions.length) {
      return existingOptions;
    }
    const contextSwitcherOptions = await LuigiConfig.getConfigValueAsync(
      'navigation.contextSwitcher.options'
    );
    return await ContextSwitcherHelpers.generateSwitcherNav(
      config,
      contextSwitcherOptions
    );
  }
};
