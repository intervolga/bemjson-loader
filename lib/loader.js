const loaderUtils = require('loader-utils');
const bemjsonToDecl = require('bemjson-to-decl');
const getRequiredModules = require('./get-required-modules');
const requireFromString = require('./require-from-string');
const validateBemJson = require('./validate-bemjson');
const validateBemDecl = require('./validate-bemdecl');

/**
 * BemJson loader
 *
 * @param {String} source
 * @return {String|Object}
 */
function bemJsonLoader(source) {
  const options = {
    stringify: true,
  };
  Object.assign(options, loaderUtils.getOptions(this));

  const evaluatedModule = requireFromString(source, this.resourcePath);
  if (['object', 'string', 'number', 'boolean']
      .indexOf(typeof evaluatedModule.exports) < 0) {
    throw new Error('Wrong export in ' + this.resourcePath);
  }

  const result = {
    'bemjson': evaluatedModule.exports || '',
    'bemdecl': null,
  };

  const self = this;
  validateBemJson(result.bemjson, this.resourcePath).forEach((e) => {
    self.emitWarning(e);
  });

  try {
    result.bemdecl = bemjsonToDecl.convert(result.bemjson) || [];
  } catch (e) {
    throw new Error('BemJson to BemDecl error: ' + e.message +
      '. File: ' + this.resourcePath);
  }
  validateBemDecl(result.bemdecl, this.resourcePath).forEach((e) => {
    self.emitWarning(e);
  });

  getRequiredModules(evaluatedModule).forEach((requiredModule) => {
    self.addDependency(requiredModule);
  });

  if (options.stringify) {
    return 'module.exports = ' + JSON.stringify(result) + ';';
  }

  return result;
}

module.exports = bemJsonLoader;
