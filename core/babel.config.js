module.exports = function(api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-regenerator'
  ];
  return {
    presets,
    plugins
  };
};
