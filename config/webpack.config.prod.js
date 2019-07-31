'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const paths = require('./paths');
const workspacePaths = require('./workspacePaths');
const sdkPaths = require('./sdkPaths');
const proStyle = require('./style/pro');
const { getBuildFileName, getValueFromFlag } = require('./utility');
const { FLAG, DEFAULT_OUTPUT_PATH } = require('./constant');
const buildFileName = getBuildFileName();
const mode = getValueFromFlag(FLAG.MODE);

const cssFilename = `${getValueFromFlag(FLAG.OUTPUT_PATH) ||
  DEFAULT_OUTPUT_PATH}/css/${buildFileName}.css`;
const jsBuildPath = `${getValueFromFlag(FLAG.OUTPUT_PATH) ||
  DEFAULT_OUTPUT_PATH}/js`;

module.exports = {
  mode,
  bail: true,
  output: {
    path: paths.appBuild,
    filename: `${jsBuildPath}/${buildFileName}.js`,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        include: [
          paths.appSrc,
          sdkPaths.components,
          sdkPaths.utils,
          sdkPaths.bootstrap,
          sdkPaths.reduxSdk,
          sdkPaths.helpers,
        ],
        use: [
          {
            loader: require.resolve('thread-loader'),
            options: {
              poolTimeout: 2000,
            },
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-class-properties',
              ],
              compact: true,
            },
          },
        ],
      },
      proStyle.cssLoader,
      proStyle.scssLoader,
      proStyle.scssModuleLoader,
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: cssFilename,
      chunkFilename: '[id].[hash].css',
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 6,
          output: {
            comments: false,
            ascii_only: true,
          },
          safari10: true,
          warnings: false,
          compress: true,
        },
        sourceMap: false,
      }),
    ],
  },
};
