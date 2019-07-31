'use strict';

const fs = require('fs');
const path = require('path');

const sdkDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(sdkDirectory, relativePath);

module.exports = {
  root: sdkDirectory,
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  styleCommonLoader: resolveApp('src/style/loader'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  eslintConfig: resolveApp('.eslintrc.js'),
  editorConfig: resolveApp('.editorconfig'),
  eslintIgnoreConfig: resolveApp('.eslintignore'),
  webpackConfig: resolveApp('webpack/index.js'),
  appNodeModules: resolveApp('node_modules'),
  projectIndex: projectPath => resolveApp('src/' + projectPath + '/index.js'),
  resolveBuildPath: path => resolveApp('build/' + path),
};
