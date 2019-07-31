const path = require('path');
const cssText = /\.css$/;
const sdkPaths = require('../sdkPaths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isBuildCss =
  process.env.CSS_BUILD_INDEX === undefined ? 0 : process.env.CSS_BUILD_INDEX;
const mode = process.env.NODE_ENV;
const { MODE } = require('../constant');

const getFinalLoader = () => {
  if (mode === MODE.DEVELOPMENT) {
    return {
      ...styleLoader,
    };
  }

  if (isBuildCss == 1) {
    return {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === MODE.DEVELOPMENT,
      },
    };
  } else {
    return {
      ...styleLoader,
      options: {
        singleton: true,
      },
    };
  }
};

const resourceLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: require(path.resolve(sdkPaths.root, 'config/style/utils.js')),
  },
};

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [require('autoprefixer')],
  },
};

const cssLoader = {
  test: cssText,
  use: ['style-loader', 'css-loader'],
};

const scssModuleOptions = {
  modules: true,
  localIdentName: '[local]__[hash:base64:8]',
};

const styleLoader = {
  loader: 'style-loader',
};

module.exports = {
  resourceLoader,
  postCssLoader,
  cssLoader,
  scssModuleOptions,
  styleLoader,
  getFinalLoader,
};
