#!/usr/bin/env node
'use strict';
const { validateParams } = require('../config/validateParams');
const { getValueFromFlag } = require('../config/utility');
const { MODE, FLAG } = require('../config/constant');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const paths = require('../config/sdkPaths');
process.on('unhandledRejection', err => {
  throw err;
});

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

if (!validateParams()) {
  return;
}
const mode = getValueFromFlag(FLAG.MODE);

process.env.BABEL_ENV = mode;
process.env.NODE_ENV = mode;

require('../config/env');

if (mode === MODE.DEVELOPMENT) {
  const buildDev = require('../config/webpack.build.dev');
  buildDev();
} else {
  const buildPro = require('../config/webpack.build.pro');
  buildPro();
}
