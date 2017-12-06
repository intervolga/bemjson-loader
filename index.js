const bemjsonToDecl = require('@bem/sdk.bemjson-to-decl');
const nodeEval = require('node-eval');
const validateBemJson = require('./lib/validate-bemjson');
const validateBemDecl = require('./lib/validate-bemdecl');

/**
 * BemJson loader
 *
 * @param {String} source
 * @return {String}
 */
function bemJsonLoader(source) {
  // Evaluate raw BemJson
  const bemJson = nodeEval(source) || '';

  // Validate BemJson for errors
  const self = this;
  validateBemJson(bemJson, this.resourcePath).forEach((e) => {
    self.emitWarning(e);
  });

  // Convert BemJson to BemDecl
  let bemDecl;
  try {
    bemDecl = bemjsonToDecl.convert(bemJson) || [];
  } catch (e) {
    throw new Error('BemJson to BemDecl error: ' + e.message + '. File: ' +
      this.resourcePath);
  }

  // Validate BemDecl for errors
  validateBemDecl(bemDecl, this.resourcePath).forEach((e) => {
    self.emitWarning(e);
  });

  return 'module.exports = ' + JSON.stringify(bemDecl, null, 2) + ';';
}

module.exports = bemJsonLoader;
