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
    const stringify = typeof options.stringify === 'boolean'
        ? options.stringify
        : true;

    const evaluatedModule = requireFromString(source, this.resourcePath);

    const self = this;
    getRequiredModules(evaluatedModule).forEach((requiredModule) => {
        self.addDependency(requiredModule); // TODO check
    });

    const bemJson = evaluatedModule.exports.default ?
        evaluatedModule.exports.default : evaluatedModule.exports;

    if (stringify) {
        return 'module.exports = ' + JSON.stringify(bemJson) + ';';
    }

    return bemJson;
}

module.exports = bemjsonLoader;
