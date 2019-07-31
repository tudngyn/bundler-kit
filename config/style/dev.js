const scssText = /\.scss$/;
const scssModuleText = /\.module\.scss$/;

const {
  resourceLoader,
  postCssLoader,
  cssLoader,
  scssModuleOptions,
  styleLoader,
} = require('./common');

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

const scssLoader = {
  test: scssText,
  exclude: scssModuleText,
  use: [
    styleLoader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 2,
      },
    },
    {
      ...postCssLoader,
      options: {
        ...postCssLoader.options,
        sourceMap: true,
      },
    },
    sassLoader,
    resourceLoader,
  ],
};

const scssModuleLoader = {
  test: scssModuleText,
  use: [
    styleLoader,
    {
      loader: 'css-loader',
      options: { ...scssModuleOptions, sourceMap: true },
    },
    {
      ...postCssLoader,
      options: {
        ...postCssLoader.options,
        sourceMap: true,
      },
    },
    sassLoader,
    resourceLoader,
  ],
};

module.exports = {
  cssLoader,
  scssLoader,
  scssModuleLoader,
};
