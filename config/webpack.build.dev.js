const webpack = require('webpack');
const chalk = require('chalk');
const { getConfigFile } = require('./utility');
const WebpackDevServer = require('webpack-dev-server');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('../config/react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils-for-webpack4/openBrowser');
const createDevServerConfig = require('../config/webpackDevServer.config');
const sdkPaths = require('../config/sdkPaths');
const paths = require('../config/paths');
const generateFile = require('./webpack.generate.file');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = '0.0.0.0';

module.exports = function() {
  generateFile();

  choosePort(HOST, DEFAULT_PORT)
    .then(port => {
      if (port == null) {
        // We have not found a port.
        return;
      }
      const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
      const appName = require(sdkPaths.appPackageJson).name;
      const urls = prepareUrls(protocol, HOST, port);
      // Create a webpack compiler that is configured with custom messages.
      const compiler = createCompiler(webpack, getConfigFile(), appName, urls);
      // Load proxy config
      const proxySetting = require(paths.appPackageJson).proxy;
      const proxyConfig = prepareProxy(proxySetting, sdkPaths.appPublic);
      // Serve webpack assets generated by the compiler over a web sever.
      const serverConfig = createDevServerConfig(
        proxyConfig,
        urls.lanUrlForConfig
      );
      const devServer = new WebpackDevServer(compiler, serverConfig);
      // Launch WebpackDevServer.
      devServer.listen(port, HOST, err => {
        if (err) {
          return console.log(err);
        }
        console.log(chalk.cyan('\nStarting the development server...\n'));
        openBrowser(urls.localUrlForBrowser); // TO REMOVE
      });

      ['SIGINT', 'SIGTERM'].forEach(function(sig) {
        process.on(sig, function() {
          devServer.close();
          process.exit();
        });
      });
    })
    .catch(err => {
      if (err && err.message) {
        console.log(err.message);
      }
      process.exit(1);
    });
};