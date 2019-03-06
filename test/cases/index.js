
const { lstatSync, readdirSync, readFileSync } = require('fs');
const { join, basename } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

module.exports = getDirectories('./test/cases').map(caseDir => ({
    caseDir: caseDir,
    options: require('./' + join(basename(caseDir), 'options.js')),
}));
