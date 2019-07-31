'use strict';

const errorOverlayMiddleware = require('react-dev-utils-for-webpack4/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils-for-webpack4/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils-for-webpack4/ignoredFiles');
const config = require('./webpack.config.dev');
const paths = require('./sdkPaths');
const sdkPaths = require('./sdkPaths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function(proxy, allowedHost) {
  return {
    disableHostCheck:
      !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: ignoredFiles(sdkPaths.appSrc),
    },
    https: protocol === 'https',
    host: host,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
    },
    public: allowedHost,
    proxy,
    before(app) {
      app.use(errorOverlayMiddleware());
      app.use(noopServiceWorkerMiddleware());
    },
  };
};
