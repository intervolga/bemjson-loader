const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const vm = require('vm');
const generateConfig = require('./generate-config');

module.exports = (entry, stringify) => {
  return new Promise((resolve, reject) => {
    const config = generateConfig(entry, stringify);

    webpack(config, (wpErr, stats) => {
      const err = wpErr ||
        (stats.hasErrors() && stats.compilation.errors[0]) ||
        (stats.hasWarnings() && stats.compilation.warnings[0]);

      if (err) {
        reject(err);
        return;
      }

      try {
        let bundlePath = path.join(config.output.path, config.output.filename);
        const result = require(bundlePath);

        let resultPath = path.join(config.output.path, 'produced.bemjson.json');
        fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));

        resolve(result);
      } catch (e) {
        reject(err);
        return;
      }
    });
  });
};
