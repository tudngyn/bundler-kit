'use strict';

const path = require('path');

const sdkDirectory = path.resolve(__dirname, '../');
const resolveApp = relativePath => path.resolve(sdkDirectory, relativePath);

module.exports = {
  root: sdkDirectory,
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  eslintConfig: resolveApp('.eslintrc.js'),
  eslintIgnoreConfig: resolveApp('.eslintignore'),
  editorConfig: resolveApp('.editorconfig'),
  components: resolveApp('components'),
  utils: resolveApp('utils'),
  helpers: resolveApp('helpers'),
  webpackConfigDev: resolveApp('config/webpack.config.dev.js'),
  webpackConfigProd: resolveApp('config/webpack.config.prod.js'),
  webpackConfigCommon: resolveApp('config/webpack.config.common.js'),
  projectIndex: projectPath => resolveApp('src/' + projectPath + '/index.js'),
  bootstrap: resolveApp('bootstrap'),
  reduxSdk: resolveApp('redux'),
  eslint: resolveApp('.eslintrc.js'),
  prettier: resolveApp('.prettierrc'),
};
