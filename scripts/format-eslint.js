#!/usr/bin/env node
'use strict';
const glob = require('glob');
const fs = require('fs');
const prettier = require('prettier');
const sdkPaths = require('../config/sdkPaths');
const prettierConfigPath = sdkPaths.eslint;
const files = glob.sync('**/*.js', { ignore: '**/node_modules/**' });
let error = false;

const runPrettier = files => {
  console.log({ files });
  files.forEach(file => {
    const options = prettier.resolveConfig.sync(file, {
      config: prettierConfigPath,
    });
    try {
      const input = fs.readFileSync(file, 'utf8');
      const output = prettier.format(input, options);
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
      }
    } catch (err) {
      error = true;
      console.log('\n\n' + err.message);
      console.log(file);
    }
  });
};

runPrettier(files);

if (error) {
  process.exit(1);
}
