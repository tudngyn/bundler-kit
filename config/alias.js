const sdkPaths = require('./sdkPaths');

const alias = {
  'sdk-helpers': sdkPaths.root + '/helpers',
  'sdk-utils': sdkPaths.root + '/utils',
  'sdk-components': sdkPaths.root + '/components',
  'sdk-redux': sdkPaths.root + '/redux',
  'sdk-bootstrap': sdkPaths.root + '/bootstrap',
};

module.exports = alias;
