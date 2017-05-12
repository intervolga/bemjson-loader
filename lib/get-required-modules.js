/**
 * Generate list of modules required by parentModule
 *
 * @param {Module} parentModule
 * @return {Array}
 */
function getRequiredModules(parentModule) {
  let required = [];

  parentModule.children.forEach((childModule) => {
    required = required.concat(getRequiredModules(childModule));
    required.push(childModule.filename);
  });

  return required;
}

module.exports = getRequiredModules;
