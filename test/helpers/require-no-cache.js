const fs = require('fs');
const nodeEval = require('node-eval');


module.exports = (path) => {
  const content = fs.readFileSync(path, 'utf-8');

  return nodeEval(content);
};
