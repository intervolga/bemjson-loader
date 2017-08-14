const path = require('path');
const expect = require('expect.js');
const runWebpack = require('./helpers/run-webpack');

describe('bemjson loader', () => {
  it('should pass normal bemjson', () => {
    const paths = getCasePaths('normal-bemjson');

    return runWebpack(paths.source).then((result) => {
      expect(result).to.eql(require(paths.expected));
    });
  });

  it('should pass normal bemjson without blocks', () => {
    const paths = getCasePaths('bemjson-export-string');

    return runWebpack(paths.source).then((result) => {
      expect(result).to.eql(require(paths.expected));
    });
  });

  it('should pass null bemjson', () => {
    const paths = getCasePaths('bemjson-export-null');

    return runWebpack(paths.source).then((result) => {
      expect(result).to.eql(require(paths.expected));
    });
  });

  it('should produce readable syntax errors', () => {
    const paths = getCasePaths('bemjson-with-error');

    return runWebpack(paths.source).then((result) => {
      // This test case should not be success
      expect().fail();
    }).catch((err) => {
      let message = err.toString();
      expect(message).to.contain('Module build failed');
      expect(message).to.contain('source.bemjson.js:7');
      expect(message).to.contain('elemMods: {m1');
    });
  });

  it('should check for errors in bemjson values types', () => {
    const paths = getCasePaths('incorrect-bemjson-type');

    return runWebpack(paths.source).then((result) => {
      // This test case should not be success
      expect().fail();
    }).catch((err) => {
      let message = err.toString();
      expect(message).to.contain('BemJson type mismatch.');
      expect(message).to.contain('Value of "elem" expected to be {string}.');
      expect(message).to.contain('Got: {object}');
      expect(message).to.contain('"elem": "[object Object]"');
    });
  });

  it('should check for errors in bemjson (html key)', () => {
    const paths = getCasePaths('incorrect-bemjson-html');

    return runWebpack(paths.source).then((result) => {
      // This test case should not be success
      expect().fail();
    }).catch((err) => {
      let message = err.toString();
      expect(message).to.contain('BemJson node has "html" key.');
      expect(message).to.contain('Other keys will be ignored.');
      expect(message).to.contain('overrides other keys');
    });
  });

  it('should check for errors in bemjson (mods - block - elem)', () => {
    const paths = getCasePaths('incorrect-bemjson-mods');

    return runWebpack(paths.source).then((result) => {
      // This test case should not be success
      expect().fail();
    }).catch((err) => {
      let message = err.toString();
      expect(message).to.contain('BemJson node has "mods" key,');
      expect(message).to.contain('Key "mods" will be ignored.');
    });
  });

  it('should check for errors in bemjson (mods - block)', () => {
    const paths = getCasePaths('incorrect-bemjson-mods-block');

    return runWebpack(paths.source).then((result) => {
      // This test case should not be success
      expect().fail();
    }).catch((err) => {
      let message = err.toString();
      expect(message).to.contain('the field `block` is undefined');
      expect(message).to.contain('incorrect-bemjson-mods-block/source.bemjson');
    });
  });

  it('should check for errors in bemjson (elemMods - elem)', () => {
    const paths = getCasePaths('incorrect-bemjson-elemmods-elem');

    return runWebpack(paths.source).then((result) => {
      // This test case should not be success
      expect().fail();
    }).catch((err) => {
      let message = err.toString();
      expect(message).to.contain('BemJson node has "elemMods" key, ' +
        'but miss "elem".');
      expect(message).to.contain('Key "elemMods" will be ignored.');
      expect(message).to.contain('"elemMods": "[object Object]"');
    });
  });

  it('should check for errors in bemdecl', () => {
    const paths = getCasePaths('incorrect-bemdecl');

    return runWebpack(paths.source).then((result) => {
      // This test case should not be success
      expect().fail();
    }).catch((err) => {
      let message = err.toString();
      expect(message).to.contain('Error in BemJson');
      expect(message).to.contain('incorrect-bemdecl');
      expect(message).to.contain('"block": "[object Object]"');
    });
  });

  it('should be fast', () => {
    const paths = getCasePaths('bemjson-speedtest');

    const start = process.hrtime();
    return runWebpack(paths.source).then((result) => {
      const elapsed = process.hrtime(start);

      expect(elapsed).to.be.an('array');
      expect(elapsed[0]).to.be(0);

      // most time used for webpack initialization
      expect(elapsed[1] / 1000000).to.be.below(300);
    });
  });
});

/**
 * Generate paths to source and expected files
 *
 * @param {String} caseName
 * @return {{source: *, expected: *}}
 */
function getCasePaths(caseName) {
  return {
    'source': path.join(__dirname, 'cases', caseName,
      'source.bemjson.js'),
    'expected': path.join(__dirname, 'cases', caseName,
      'expected.bemjson.json'),
  };
}
