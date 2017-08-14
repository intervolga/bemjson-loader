const path = require('path');
const loader = path.join(__dirname, '..', '..', 'index.js');

module.exports = function(entry) {
  return {
    entry: entry,

    output: {
      path: path.dirname(entry),
      filename: 'produced.bundle.js',
      libraryTarget: 'commonjs2',
    },

    module: {
      loaders: [{
        test: /\.bemjson\.js$/,
        use: [
          {loader: loader},
          '@intervolga/eval-loader',
        ],
      }],
    },

    target: 'node',
  };
};
