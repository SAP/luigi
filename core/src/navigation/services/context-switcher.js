import { GenericHelpers } from '../../utilities/helpers';
import { Routing } from '../../services/routing';
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

  getNodePathFromCurrentPath(option, selectedOption) {
    const currentPath = GenericHelpers.addLeadingSlash(
      Routing.getCurrentPath()
    );
    const selectedPath = GenericHelpers.addLeadingSlash(selectedOption.path);
    if (currentPath.startsWith(selectedPath)) {
      return (
        option.path +
        GenericHelpers.addLeadingSlash(
          currentPath.substring(selectedPath.length)
        )
      );
    } else {
      return option.path;
    }
  },

  getOptionById(options, id) {
    return options.find(o => o.id === id);
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

  getSelectedId(currentPath, options, parentNodePath) {
    currentPath = GenericHelpers.normalizePath(currentPath);
    parentNodePath = GenericHelpers.normalizePath(parentNodePath);
    if (
      !ContextSwitcherHelpers.isContextSwitcherDetailsView(
        currentPath,
        parentNodePath
      )
    ) {
      return undefined;
    }

    // we are inside the context switcher base path
    return currentPath
      .replace(parentNodePath, '')
      .split('/')[0]
      .split('?')[0]; //ignore everything after '?'
  },

  async getSelectedOption(currentPath, options, parentNodePath) {
    let selectedOption;
    const selectedId = this.getSelectedId(currentPath, options, parentNodePath);
    if (selectedId && options) {
      selectedOption = ContextSwitcherHelpers.getOptionById(
        options,
        selectedId
      );
    }
    return selectedOption;
  },

  async getSelectedLabel(
    currentPath,
    options,
    parentNodePath,
    fallbackLabelResolver
  ) {
    const selectedId = this.getSelectedId(currentPath, options, parentNodePath);
    if (!selectedId) {
      return;
    }

    let selectedOption = await this.getSelectedOption(
      currentPath,
      options,
      parentNodePath
    );
    let selectedLabel = selectedOption ? selectedOption.label : undefined;

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
