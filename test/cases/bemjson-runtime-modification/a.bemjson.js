module.exports = {
  block: 'a',
  content: [
    require('./b.bemjson.js'),
    'content of a',
    require('./c.bemjson'),
    'the end'
  ],
};
