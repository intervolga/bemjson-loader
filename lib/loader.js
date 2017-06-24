const loaderUtils = require('loader-utils');
const bemjsonToDecl = require('bemjson-to-decl');
const getRequiredModules = require('./get-required-modules');
const requireFromString = require('./require-from-string');
const validateBemJson = require('./validate-bemjson.js');
const validateBemDecl = require('./validate-bemdecl.js');

/**
 * BemJson loader
 *
 * @param {String} source
 * @return {String|Object}
 */
function bemjsonLoader(source) {
  // this.cacheable(); // TODO: check

  const self = this;
  const options = loaderUtils.getOptions(this) || {stringify: true};
  const stringify = typeof options.stringify === 'boolean'
    ? options.stringify
    : true;

  const evaluatedModule = requireFromString(source, this.resourcePath);
  if (['object', 'string', 'number', 'boolean']
      .indexOf(typeof evaluatedModule.exports) < 0) {
    throw new Error('Wrong export in ' + this.resourcePath);
  }

  const result = {
    'bemjson': evaluatedModule.exports,
    'bemdecl': null,
  };
  validateBemJson(result.bemjson, this.resourcePath).forEach((e) => {
    self.emitWarning(e);
  });

  try {
    result.bemdecl = bemjsonToDecl.convert(result.bemjson);
  } catch (e) {
    throw new Error('BemJson to BemDecl error: ' + e.message +
      '. File: ' + this.resourcePath);
  }
  validateBemDecl(result.bemdecl, this.resourcePath).forEach((e) => {
    self.emitWarning(e);
  });

  getRequiredModules(evaluatedModule).forEach((requiredModule) => {
    self.addDependency(requiredModule); // TODO: check
  });

  if (stringify) {
    return 'module.exports = ' + JSON.stringify(result) + ';';
  }

  return result;
}

module.exports = bemjsonLoader;
