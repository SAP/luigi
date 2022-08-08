module.exports = function(api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        },
        loose: true
      }
    ]
  ];
  const plugins = ['@babel/plugin-syntax-dynamic-import'];
  return {
    presets,
    plugins
  };
};
