export const ContextSwitcherHelpers = {
  prepareParentNodePath(config) {
    if (config.parentNodePath) {
      if (!config.parentNodePath.startsWith('/')) {
        console.error(
          'Error: navigation.parentNodePath must be an absolute path and start with a slash.'
        );
      }
      // add trailing slash if it does not have a dynamic path segment
      const hasNoDynamicPathSegment =
        config.parentNodePath.split('/').filter(p => p.startsWith(':'))
          .length === 0;
      if (hasNoDynamicPathSegment && !config.parentNodePath.endsWith('/')) {
        config.parentNodePath = `${config.parentNodePath}/`;
      }
    }
    if (!config.parentNodePath) {
      const optionsWithoutAbsolutePaths =
        rawOptions.filter(o => o.pathValue.startsWith('/')).length !==
        rawOptions.length;
      if (optionsWithoutAbsolutePaths) {
        console.error(
          'Error: navigation.parentNodePath is not defined, therefore navigation.options[].pathValue must be absolute paths.'
        );
      }
    }
    return config.parentNodePath;
  },

  buildNodePath(parentNodePath, opt) {
    // prepare base path
    // 0 options[].pathValue renamed to pathValue, as it could contain a full path too
    // 1. check if parentNodePath exists
    // 1.1. if parentNodePath exists, must start with /
    // 1.2. parentNodePath must end with / or contain colon to substitute the value
    // 1.3. if no colon path segment, pathValue gets appended to parentNodePath
    // 1.4. if colon is present, parentValue will get substituted
    // 2. if parentNodePath does not exist
    // 2.1. options pathValue must start with /
    // 2.2. and will be completely used for routing

    let path = opt.pathValue;
    // parentNodePath contains dynamic pathSegment
    if (parentNodePath && parentNodePath.indexOf(':') !== -1) {
      path = parentNodePath
        .split('/')
        .map(pp => {
          // Replace dynamic node with pathValue. Name of dynamic node can be anything, also just a single colon
          return pp.startsWith(':') ? opt.pathValue : pp;
        })
        .join('/');
    } else if (parentNodePath) {
      // parentNodePath without dynamic pathSegment
      path = parentNodePath + opt.pathValue;
    }
    return path;
  },

  async getMatchingNodeName(options, fallbackLabelResolver, id) {
    return new Promise(async resolve => {
      resolve(fallbackLabelResolver ? await fallbackLabelResolver(id) : id);
    });
  },

  generateSwitcherNav(config, rawOptions) {
    const parentNodePath = this.prepareParentNodePath(config);
    return rawOptions.map(opt => ({
      label: opt.label,
      path: this.buildNodePath(parentNodePath, opt),
      id: opt.pathValue
    }));
  }
};
