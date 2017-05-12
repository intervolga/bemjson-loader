const loaderUtils = require('loader-utils');
const requireFromString = require('./require-from-string');
const getRequiredModules = require('./get-required-modules');

/**
 * BemJson loader
 *
 * @param {String} source
 * @return {String|Object}
 */
function bemjsonLoader(source) {
  const options = loaderUtils.getOptions(this) || {stringify: true};
  const stringify = typeof options.stringify === 'boolean' ?
    options.stringify : true;

  const fileName = this.resourcePath;
  const evaluatedModule = requireFromString(source, fileName);
  if (!evaluatedModule.exports) { // TODO: check
    throw new Error(`BemJson ${fileName} does't export anything`);
  }
  const self = this;
  getRequiredModules(evaluatedModule).forEach((requiredModule) => {
    self.addDependency(requiredModule); // TODO check
  });

  const bemJson = evaluatedModule.exports.default ?
    evaluatedModule.exports.default : evaluatedModule.exports;
  const result = {
    'bemjson': JSON.parse(JSON.stringify(bemJson)),
  };

  if (stringify) {
    return 'module.exports = ' + JSON.stringify(result) + ';';
  }

  return result;
}

module.exports = bemjsonLoader;
