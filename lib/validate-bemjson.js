/**
 * Validate BEM JSON
 *
 * @param {Object} bemJson
 * @param {String} fileName
 * @return {Array} of validation errors
 */
function validateBemJson(bemJson, fileName) {
  let errors = [];

  if (Array.isArray(bemJson)) {
    bemJson.forEach((childBemJson) => {
      errors = errors.concat(validateBemJson(childBemJson, fileName));
    });
  } else if (bemJson instanceof Object) {
    Object.values(bemJson).forEach((childBemJson) => {
      errors = errors.concat(validateBemJson(childBemJson, fileName));
    });

    errors = errors.concat(validateBemJsonNode(bemJson, fileName));
  }

  return errors;
}

/**
 * Validate single BemJson node https://ru.bem.info/platform/bemjson/
 *
 * @param {Object} bemJson
 * @param {String} fileName
 * @return {Array}
 */
function validateBemJsonNode(bemJson, fileName) {
  let errors = [];

  const fieldTypes = {
    block: ['string'],
    elem: ['string'],
    mods: ['object'],
    elemMods: ['object'],
    content: ['object', 'string', 'number', 'boolean'],
    html: ['string'],
    mix: ['object', 'string'],
    js: ['boolean', 'object'],
    bem: ['boolean'],
    attrs: ['object'],
    cls: ['string'],
    tag: ['boolean', 'string'],
  };

  Object.keys(bemJson).forEach((bemJsonKey) => {
    if (!fieldTypes[bemJsonKey]) {
      return;
    }

    let validType = false;
    fieldTypes[bemJsonKey].forEach((fieldType) => {
      if (typeof bemJson[bemJsonKey] === fieldType) {
        validType = true;
      }
    });
    if (!validType) {
      errors.push(new Error('BemJson type mismatch. Value of "' + bemJsonKey +
        '" expected to be {' + fieldTypes[bemJsonKey].join('|') + '}. Got: {' +
        typeof bemJson[bemJsonKey] + '}. Node: ' + extractBemJsonNode(bemJson) +
        '. File: ' + fileName));
    }
  });

  if (bemJson.html && Object.keys(bemJson).length > 1) {
    errors.push(new Error('BemJson node has "html" key. ' +
      'Other keys will be ignored. Node: ' + extractBemJsonNode(bemJson) +
      '. File: ' + fileName));
  }

  if (bemJson.mods && bemJson.elem) {
    errors.push(new Error('BemJson node has "elem" key. ' +
      'Key "mods" will be ignored. Node: ' + extractBemJsonNode(bemJson) +
      '. File: ' + fileName));
  }

  if (bemJson.mods && !bemJson.block) {
    errors.push(new Error('BemJson node has "mods" key, but miss "block". '
      + 'Key "mods" will be ignored. Node: ' + extractBemJsonNode(bemJson) +
      '. File: ' + fileName));
  }

  if (bemJson.elemMods && !bemJson.elem) {
    errors.push(new Error('BemJson node has "elemMods" key, but miss "elem". '
      + 'Key "elemMods" will be ignored. Node: ' + extractBemJsonNode(bemJson) +
      '. File: ' + fileName));
  }

  return errors;
}

/**
 * Strips all child nodes from BemJson node for print puproses
 *
 * @param {Object} bemJson
 * @return {Object}
 */
function extractBemJsonNode(bemJson) {
  let result = JSON.parse(JSON.stringify(bemJson));

  Object.keys(result).forEach((key) => {
    result[key] = result[key].toString();
  });

  return JSON.stringify(result, null, 2);
}

module.exports = validateBemJson;
