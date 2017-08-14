module.exports = {
  block: 'b1',
  content: [{
    elem: 'e1',
    elemMods: {
      m1: 'v0',
      bool: true,
    },
    content: [
      'This is normal bemjson',
      1 + 2,
    ],
  }, {
    elem: 'e2',
    content: [{
      block: 'b1',
      mods: {
        b1m1: 'v2',
      },
    }, {
      block: 'b3',
      content: 'blah',
    }],
  }, {
    block: 'b2',
    content: {
      elem: 'e1Ofb2',
      content: {
        elem: 'e2Ofb2',
        content: [{
          block: 'b1',
          content: {
            elem: 'e3',
          },
        }, {
          block: 'b1',
          mods: {
            b1m1: 'v1',
          },
        }],
      },
    },
  }],
};
