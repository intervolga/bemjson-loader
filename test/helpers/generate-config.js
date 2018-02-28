const path = require('path');
const loader = path.join(__dirname, '..', '..', 'index.js');

module.exports = function(entry) {
  return {
    mode: 'development',

    entry: entry,

    output: {
      path: path.dirname(entry),
      filename: 'produced.bundle.js',
      libraryTarget: 'commonjs2',
    },

    module: {
      rules: [{
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
