const bemjsonToDecl = require('bemjson-to-decl');
const path = require('path');
const getRequiredModules = require('./lib/get-required-modules');
const requireFromString = require('./lib/require-from-string');
const validateBemJson = require('./lib/validate-bemjson');
const validateBemDecl = require('./lib/validate-bemdecl');

/**
 * BemJson loader
 *
 * @param {String} source
 * @return {String|Object}
 */
function bemJsonLoader(source) {
  const self = this;

  // Evaluate raw BemJson. It may have dependencies
  const evaluatedModule = requireFromString(source, this.resourcePath);
  if (['object', 'string', 'number', 'boolean']
      .indexOf(typeof evaluatedModule.exports) < 0) {
    throw new Error('Wrong export in ' + this.resourcePath);
  }
  const bemJson = null === evaluatedModule.exports
    ? {} : evaluatedModule.exports;

  // Mark loader dependencies
  getRequiredModules(evaluatedModule).forEach((requiredModule) => {
    self.addDependency(requiredModule);
  });

  // Validate BemJson for errors
  validateBemJson(bemJson, this.resourcePath).forEach((e) => {
    self.emitWarning(e);
  });

  // // Emit evaluated BemJson without dependencies
  // const evaluatedPath = path.basename(this.resourcePath, '.js') + '.json';
  // const evaluatedString = JSON.stringify(evaluatedModule.exports, null, 2);
  // this.emitFile(evaluatedPath, evaluatedString);

  // Convert BemJson to BemDecl
  let bemDecl;
  try {
    // TODO: make faster then ~100ms
    bemDecl = bemjsonToDecl.convert(bemJson) || [];
  } catch (e) {
    throw new Error('BemJson to BemDecl error: ' + e.message +
      '. File: ' + this.resourcePath);
  }

  // Validate BemDecl for errors
  validateBemDecl(bemDecl, this.resourcePath).forEach((e) => {
    self.emitWarning(e);
  });

  const result = {
    bemjson: bemJson,
    bemdecl: bemDecl,
  };

  return 'module.exports = ' + JSON.stringify(result) + ';';
}

module.exports = bemJsonLoader;
