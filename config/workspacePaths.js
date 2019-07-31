'use strict';

const path = require('path');

const sdkDirectory = path.resolve('../../');
const resolveApp = relativePath => path.resolve(sdkDirectory, relativePath);

module.exports = {
  root: sdkDirectory,
  appNodeModules: resolveApp('node_modules'),
};
