const webpack = require('webpack');
const path = require('path');
const ModuleScopePlugin = require('react-dev-utils-for-webpack4/ModuleScopePlugin');
const { getValueFromFlag, getFileNameWithFlag } = require('./utility');
const alias = require('./alias');
const sdkPaths = require('./sdkPaths');
const paths = require('./paths');
const { FLAG } = require('./constant');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getClientEnvironment = require('./env');
const env = getClientEnvironment();
const mode = getValueFromFlag(FLAG.MODE);
const entryPoint = getFileNameWithFlag();
const indexPath = paths.projectIndex(entryPoint);

module.exports = {
  mode,
  entry: [require.resolve('./polyfills'), indexPath],
  output: {
    publicPath: '/',
    chunkFilename: 'static/js/[name].chunk.js',
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules, sdkPaths.appNodeModules],
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias,
    plugins: [
      new ModuleScopePlugin(sdkPaths.appSrc, [sdkPaths.appPackageJson]),
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [require.resolve('eslint-loader')],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      favicon: path.resolve(sdkPaths.appPublic, 'favicon.ico'), // TO DO - add dynamic favicon - OPTIONAL
    }),
    new InterpolateHtmlPlugin(env.raw),
    new webpack.DefinePlugin(env.stringified),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
