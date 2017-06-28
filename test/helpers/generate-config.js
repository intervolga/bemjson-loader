const path = require('path');
const loader = path.join(__dirname, '..', '..', 'index.js');

module.exports = function(entry, stringify = null) {
  let config = {
    entry: entry,

    output: {
      path: path.dirname(entry),
      filename: 'produced.bundle.js',
      libraryTarget: 'commonjs2',
    },

    module: {
      loaders: [],
    },

    target: 'node',
  };

  let loaderConfig = {
    test: /\.bemjson\.js$/,
    use: {loader: loader},
  };
  if (null !== stringify) {
    loaderConfig.use.options = {stringify: stringify};
  }

  config.module.loaders.push(loaderConfig);

  return config;
};
