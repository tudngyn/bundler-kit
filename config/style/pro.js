const cssText = /\.css$/;
const scssText = /\.scss$/;
const scssModuleText = /\.module\.scss$/;

const {
  resourceLoader,
  postCssLoader,
  cssLoader,
  scssModuleOptions,
  getFinalLoader,
} = require('./common');

const sassLoader = {
  loader: 'sass-loader',
  options: {
    outputStyle: 'compressed',
  },
};

const scssLoader = {
  test: scssText,
  exclude: scssModuleText,
  use: [
    getFinalLoader(),
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
      },
    },
    postCssLoader,
    sassLoader,
    resourceLoader,
  ],
};

const scssModuleLoader = {
  test: scssModuleText,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: scssModuleOptions,
    },
    postCssLoader,
    sassLoader,
    resourceLoader,
  ],
};

module.exports = {
  cssLoader,
  scssLoader,
  scssModuleLoader,
  cssText,
  scssText,
  scssModuleText,
};
