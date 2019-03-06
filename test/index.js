
const fs = require('fs');
const path = require('path');
var deepEqual = require('deep-equal');
var assert = require('assert');

const OscObjectStream = require('../index.js');
const testCases = require('./cases');

describe('full xml test cases', () => {
    for (const testCase of testCases) {
        it(testCase.caseDir, async () => {
            const oscObjectStream = new OscObjectStream(testCase.options);
            const xmlInputStream = fs.createReadStream(path.join(testCase.caseDir, 'input.xml'));
            const expectedArray = JSON.parse(fs.readFileSync(path.join(testCase.caseDir, 'expected.json')));
            const resultArray = [];

            xmlInputStream.pipe(oscObjectStream);

            for await (const bulk of oscObjectStream) {
                resultArray.push(bulk);
            }

            assert.deepStrictEqual(resultArray, expectedArray);
        });
    }
});