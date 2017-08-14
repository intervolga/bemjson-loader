module.exports = {
  block: 'b1',
  content: [
    {
      elem: [{error: 1}], // wrong name
    },
    {
      elem: 'e11',
      elemMods: [{error: 2}], // wrong elemMods syntax
    },
    {
      elem: 'e12',
      mods: {error: 3}, // mods applies to block
    },
    {
      block: 'b3',
      mods: {m2: undefined}, // undefined tends to be errors
    },
    {
      block: 'b3',
      abc: {m2: undefined}, // undefined tends to be errors
    },
    {
      block: 'b4',
      attrs: [{'a': 2}], // attrs should not be list
    },
    {
      block: 'b5',
      mods: function() {
        return 'abc';
      },
    },
  ],
};
