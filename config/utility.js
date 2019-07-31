// const sdkPaths = require('./sdkPaths');
const fs = require('fs');
const merge = require('webpack-merge');
const { FLAG, MODE } = require('./constant');
const sdkPaths = require('./sdkPaths');
const paths = require('./paths');

const getFileNameWithFlag = () => {
  let fileNameOutput = process.env.FILENAME;

  if (fileNameOutput) {
    return fileNameOutput;
  }

  //User -f for file name OR FILENAME
  if (process.argv.indexOf(FLAG.FILE) != -1) {
    return process.argv[process.argv.indexOf(FLAG.FILE) + 1];
  }
};

const getValueFromFlag = flag => {
  if (process.argv.indexOf(`${flag}`) != -1) {
    return process.argv[process.argv.indexOf(`${flag}`) + 1];
  }
};

const isExistFlag = flag => process.argv.indexOf(flag) != -1;

const getBuildFileName = () => {
  const filename = getFileNameWithFlag();

  // let buildFileName = filename.replace(/[/]/g, '-').toLowerCase();
  let buildFileName = filename.toLowerCase();

  buildFileName = buildFileName.split('/');

  buildFileName = buildFileName[buildFileName.length - 1];

  return buildFileName;
};

const isLocationExist = paths => {
  if (!fs.existsSync(paths)) {
    return false;
  }

  return true;
};

const getConfigFile = () => {
  const mode = getValueFromFlag(FLAG.MODE);
  const commonConfig = require(sdkPaths.webpackConfigCommon);
  const devConfig = require(sdkPaths.webpackConfigDev);
  const proConfig = require(sdkPaths.webpackConfigProd);

  if (isLocationExist(paths.webpackConfig)) {
    const { common, development, production } = require(paths.webpackConfig);

    if (mode === MODE.DEVELOPMENT) {
      return merge(commonConfig, devConfig, common, development);
    } else {
      return merge(commonConfig, proConfig, common, production);
    }
  }

  if (mode === MODE.DEVELOPMENT) {
    return merge(commonConfig, devConfig);
  } else {
    return merge(commonConfig, proConfig);
  }
};

module.exports = {
  getFileNameWithFlag,
  isExistFlag,
  getValueFromFlag,
  getBuildFileName,
  isLocationExist,
  getConfigFile,
};
