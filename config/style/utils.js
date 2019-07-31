const path = require('path');
const sdkPaths = require('../sdkPaths');
const paths = require('../paths');
const fs = require('fs');

const applyLoaders = () => {
  if (fs.existsSync(paths.styleCommonLoader)) {
    //Use this for Project's customizations
    return fs
      .readdirSync(path.resolve(paths.styleCommonLoader))
      .map(item => path.resolve(paths.styleCommonLoader, item));
  }

  return [];
};
const resources = [
  'src/styles/abstract/_variables.scss',
  'src/styles/abstract/_mixin.scss',
].map(file => path.resolve(sdkPaths.root, file));

module.exports = [...resources, ...applyLoaders()];
