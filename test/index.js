const fs = require('fs');
const path = require('path');
const expect = require('expect.js');
const runWebpack = require('./helpers/run-webpack');
const requireFromString = require('./../lib/require-from-string');

describe('require from string', () => {
  it('should not cache module content', () => {
    const casePath = path.join(__dirname, 'cases',
      'bemjson-runtime-modification');

    // prepare
    const originalPath = path.join(casePath, 'c_original.bemjson.js');
    const sourcePath = path.join(casePath, 'c.bemjson.js');
    fs.writeFileSync(sourcePath, fs.readFileSync(originalPath));

    // run
    const entryPath = path.join(casePath, 'a.bemjson.js');
    const entryContent = fs.readFileSync(entryPath).toString();
    const evaluatedModule1 = requireFromString(entryContent, entryPath);

    // check #1
    const evaluated1 = JSON.stringify(evaluatedModule1.exports, null, 2);
    const expected1Path = path.join(casePath, 'expected1.bemjson.json');
    const expected1 = fs.readFileSync(expected1Path).toString();
    expect(evaluated1).to.be(expected1);

    // modify
    const modifiedPath = path.join(casePath, 'c_modified.bemjson.js');
    fs.writeFileSync(sourcePath, fs.readFileSync(modifiedPath));

    // run #2
    const twiceEvaluatedModule = requireFromString(entryContent, entryPath);

    // check #2
    const evaluated2 = JSON.stringify(twiceEvaluatedModule.exports, null, 2);
    const expected2Path = path.join(casePath, 'expected2.bemjson.json');
    const expected2 = fs.readFileSync(expected2Path).toString();
    expect(evaluated2).to.be(expected2);
  });
});


describe('bemjson loader', () => {
  it('should pass normal bemjson', () => {
    const paths = getCasePaths('normal-bemjson');

    return runWebpack(paths.source).then((result) => {
      expect(result).to.eql(require(paths.expected));
    });
  });

  it('should pass normal bemjson with requires', () => {
    const paths = getCasePaths('bemjson-with-requires');

    return runWebpack(paths.source).then((result) => {
      expect(result).to.eql(require(paths.expected));
    });
  });

  // it('should pass normal bemjson when requires changed', (done) => {
  //   const source = path.join(__dirname, 'cases',
  //     'bemjson-with-requires-changed',
  //     'source_incl_2.bemjson.js');
  //   const original = path.join(__dirname, 'cases',
  //     'bemjson-with-requires-changed',
  //     'source_incl_2_original.bemjson.js');
  //   const changed = path.join(__dirname, 'cases',
  //     'bemjson-with-requires-changed',
  //     'source_incl_2_changed.bemjson.js');
  //
  //   fs.writeFileSync(source, fs.readFileSync(original));
  //
  //   const src = path.join(__dirname, 'cases',
  //     'bemjson-with-requires-changed', 'source.bemjson.js');
  //
  //   runWebpack(src).then((result) => {
  //     fs.writeFileSync(source, fs.readFileSync(changed));
  //
  //     runWebpack(src).then((result) => {
  //       assert.deepEqual(
  //         result,
  //         require(path.join(__dirname, 'cases',
  //           'bemjson-with-requires-changed', 'expected.bemjson.json'))
  //       );
  //       done();
  //     }).catch(done);
  //   }).catch(done);
  // });

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

  it('should produce error with bad export', () => {
    const paths = getCasePaths('wrong-bemjson-export');

    return runWebpack(paths.source).then(() => {
      // This test case should not be success
      expect().fail();
    }).catch((err) => {
      let message = err.toString();
      expect(message).to.contain('Wrong export in');
      expect(message).to.contain('wrong-bemjson-export/source.bemjson.js');
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

  it('should check for errors in bemjson (mods + elem)', () => {
    const paths = getCasePaths('incorrect-bemjson-mods-elem');

    return runWebpack(paths.source).then((result) => {
      // This test case should not be success
      expect().fail();
    }).catch((err) => {
      let message = err.toString();
      expect(message).to.contain('BemJson node has "elem" key.');
      expect(message).to.contain('Key "mods" will be ignored.');
      expect(message).to.contain('"elem": "e1"');
    });
  });

  it('should check for errors in bemjson (mods - block)', () => {
    const paths = getCasePaths('incorrect-bemjson-mods-block');

    return runWebpack(paths.source).then((result) => {
      // This test case should not be success
      expect().fail();
    }).catch((err) => {
      let message = err.toString();
      expect(message).to.contain('block: null, elem: \'error\'');
      expect(message).to.contain('the field `block` is undefined');
      expect(message).to.contain('incorrect-bemjson-mods-block');
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
