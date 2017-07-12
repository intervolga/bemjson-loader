/**
 * Validate BEM declarations
 *
 * @param {Array} bemDecl
 * @param {String} fileName
 * @return {Array} of validation errors
 */
function validateBemDecl(bemDecl, fileName) {
  let errors = [];

  bemDecl.forEach((decl) => {
    errors = errors.concat(validateBemDeclItem(decl, fileName));
  });

  return errors;
}

/**
 * Validate single BEM declaration
 *
 * @param {Object} decl
 * @param {String} fileName
 * @return {Array} of validation errors
 */
function validateBemDeclItem(decl, fileName) {
  let errors = [];

  Object.keys(decl).forEach((key) => {
    const val = decl[key];
    if (val === '[object Object]') {
      errors.push(new Error('Error in BemJson ' + fileName +
        ' produced wrong BemDecl ' + JSON.stringify(decl, null, 2)));
    }
  });

  return errors;
}

module.exports = validateBemDecl;
