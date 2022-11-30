import { GenericHelpers } from '../../utilities/helpers';
import { Routing } from '../../services/routing';
import { LuigiConfig } from '../../core-api';

export const ContextSwitcherHelpers = {
  _fallbackLabels: new Map(),

  resetFallbackLabelCache() {
    this._fallbackLabels.clear();
  },

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
      link: (parentNodePath || '/') + opt.pathValue,
      id: opt.pathValue,
      testId: opt.testId,
      customRendererCategory: opt.customRendererCategory
    }));
  },

  getNodePathFromCurrentPath(option, selectedOption) {
    const currentPath = GenericHelpers.addLeadingSlash(Routing.getCurrentPath());
    const selectedPath = GenericHelpers.addLeadingSlash(selectedOption.link);
    if (currentPath.startsWith(selectedPath)) {
      return option.link + GenericHelpers.addLeadingSlash(currentPath.substring(selectedPath.length));
    } else {
      return option.link;
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
    const parentNodePathNormalized = GenericHelpers.normalizePath(parentNodePath);

    return Boolean(
      parentNodePath &&
      currentPathNormalized &&
      typeof currentPathNormalized === 'string' &&
      currentPathNormalized.startsWith(parentNodePathNormalized) &&
      currentPathNormalized !== parentNodePathNormalized
    );
  },

  async getFallbackLabel(fallbackLabelResolver, id) {
    if (!fallbackLabelResolver) {
      return id;
    }

    const useFallbackLabelCache = LuigiConfig.getConfigBooleanValue('navigation.contextSwitcher.useFallbackLabelCache');
    const labelCache = ContextSwitcherHelpers._fallbackLabels;
    if (useFallbackLabelCache) {
      if (labelCache.has(id)) {
        return labelCache.get(id);
      }
    }

    const label = await fallbackLabelResolver(id);
    useFallbackLabelCache && labelCache.set(id, label);
    return label;
  },

  getSelectedId(currentPath, options, parentNodePath) {
    currentPath = GenericHelpers.normalizePath(currentPath);
    parentNodePath = GenericHelpers.normalizePath(parentNodePath);
    if (!ContextSwitcherHelpers.isContextSwitcherDetailsView(currentPath, parentNodePath)) {
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
      selectedOption = ContextSwitcherHelpers.getOptionById(options, selectedId);
    }
    return selectedOption;
  },

  async getSelectedLabel(currentPath, options, parentNodePath, fallbackLabelResolver) {
    const selectedId = this.getSelectedId(currentPath, options, parentNodePath);
    if (!selectedId) {
      return;
    }

    const selectedOption = await this.getSelectedOption(currentPath, options, parentNodePath);
    const selectedLabel = selectedOption ? selectedOption.label : undefined;

    // get the label from fallback if selectedId is not
    // in options or options not yet lazy loaded by click
    return selectedLabel || (await ContextSwitcherHelpers.getFallbackLabel(fallbackLabelResolver, selectedId));
  },

  async getSelectedNode(currentPath, options, parentNodePath) {
    const selectedId = this.getSelectedId(currentPath, options, parentNodePath);
    if (!selectedId) {
      return;
    }

    let selectedOption = await this.getSelectedOption(currentPath, options, parentNodePath);
    const selectedNodePath = selectedOption ? selectedOption.link : undefined;

    return selectedNodePath;
  },

  async fetchOptions(existingOptions = []) {
    const config = LuigiConfig.getConfigValue('navigation.contextSwitcher');
    if (!config.lazyloadOptions && existingOptions.length) {
      return existingOptions;
    }
    const contextSwitcherOptions = await LuigiConfig.getConfigValueAsync('navigation.contextSwitcher.options');
    return await ContextSwitcherHelpers.generateSwitcherNav(config, contextSwitcherOptions);
  }
};
