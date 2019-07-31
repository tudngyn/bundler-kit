#!/usr/bin/env node
'use strict';
const exec = require('child_process').exec;
const paths = require('../config/paths');
const sdkPaths = require('../config/sdkPaths');

const script = `prettier --config ${sdkPaths.prettier} --write \"./**/*.{js,jsx,json}\" ${paths.appSrc}`;
exec(script, error => {
  if (error !== null) {
    console.log(`error: ${error}`);
  }
});
