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
    ],
    '@babel/preset-typescript'
  ];
  return {
    presets
  };
};
