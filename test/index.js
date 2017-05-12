const fs = require('fs');
const path = require('path');
const assert = require('assert');
const runWebpack = require('./helpers/run-webpack');
const requireFromString = require('./../lib/require-from-string');

describe('require from string', () => {
  it('should not cache module content', (done) => {
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
    assert.equal(evaluated1, expected1);

    // modify
    const modifiedPath = path.join(casePath, 'c_modified.bemjson.js');
    fs.writeFileSync(sourcePath, fs.readFileSync(modifiedPath));

    // run #2
    const twiceEvaluatedModule = requireFromString(entryContent, entryPath);

    // check #2
    const evaluated2 = JSON.stringify(twiceEvaluatedModule.exports, null, 2);
    const expected2Path = path.join(casePath, 'expected2.bemjson.json');
    const expected2 = fs.readFileSync(expected2Path).toString();
    assert.equal(evaluated2, expected2);

    done();
  });
});


describe('bemjson loader', () => {
  it(`should pass normal bemjson`, (done) => {
    const source = path.join(__dirname, 'cases', 'normal-bemjson',
      'source.bemjson.js');

    runWebpack(source).then((result) => {
      assert.deepEqual(
        result,
        require(path.join(__dirname, 'cases', 'normal-bemjson',
          'expected.bemjson.json'))
      );
      done();
    }).catch(done);
  });

  it(`should pass normal bemjson with requires`, (done) => {
    const source = path.join(__dirname, 'cases', 'bemjson-with-requires',
      'source.bemjson.js');

    runWebpack(source).then((result) => {
      assert.deepEqual(
        result,
        require(path.join(__dirname, 'cases', 'bemjson-with-requires',
          'expected.bemjson.json'))
      );
      done();
    }).catch(done);
  });

  // it(`should pass normal bemjson when requires changed`, (done) => {
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

  it(`should produce readable errors`, (done) => {
    const source = path.join(__dirname, 'cases', 'error-bemjson',
      'source.bemjson.js');

    runWebpack(source).then((result) => {
      done(new Error('This test case should not be success'));
    }).catch((err) => {
      let message = err.toString();
      assert.ok(message.indexOf('Module build failed') > 0);
      assert.ok(message.indexOf('source.bemjson.js:7') > 0);
      assert.ok(message.indexOf('elemMods: { m1: \'v1\' },') > 0);
      done();
    });
  });
});
