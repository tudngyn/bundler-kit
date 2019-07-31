'use strict';

const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils-for-webpack4/WatchMissingNodeModulesPlugin');
const sdkPaths = require('./sdkPaths');
const paths = require('./paths');
const devStyle = require('./style/dev');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [require.resolve('react-dev-utils-for-webpack4/webpackHotDevClient')],
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: '[name].chunk.js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        include: [
          paths.appSrc,
          sdkPaths.bootstrap,
          sdkPaths.components,
          sdkPaths.helpers,
          sdkPaths.reduxSdk,
        ],
        use: [
          {
            loader: require.resolve('thread-loader'),
            options: {
              poolTimeout: Infinity,
            },
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                [
                  '@babel/plugin-transform-modules-commonjs',
                  { strictMode: false },
                ],
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-class-properties',
              ],
            },
          },
        ],
      },
      devStyle.cssLoader,
      devStyle.scssLoader,
      devStyle.scssModuleLoader,
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(sdkPaths.appNodeModules),
  ],
  performance: {
    hints: false,
  },
};
