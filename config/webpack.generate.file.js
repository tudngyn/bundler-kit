const fs = require('fs');
const { isLocationExist } = require('./utility');
const paths = require('./paths');
const sdkPaths = require('./sdkPaths');
const { COPYFILE_FICLONE } = fs.constants;

module.exports = function() {
  if (!isLocationExist(paths.appBuild)) {
    fs.mkdirSync(paths.appBuild);
  }

  if (!isLocationExist(paths.appPublic)) {
    fs.mkdirSync(paths.appPublic);
  }

  if (!isLocationExist(paths.appHtml)) {
    fs.writeFileSync(paths.appHtml, '', {
      flag: 'w',
    });
    fs.copyFileSync(sdkPaths.appHtml, paths.appHtml, COPYFILE_FICLONE);
  }

  if (!isLocationExist(paths.eslintConfig)) {
    fs.writeFileSync(paths.eslintConfig, '', {
      flag: 'w',
    });
    fs.copyFileSync(
      sdkPaths.eslintConfig,
      paths.eslintConfig,
      COPYFILE_FICLONE
    );
  }

  if (!isLocationExist(paths.editorConfig)) {
    fs.writeFileSync(paths.editorConfig, '', {
      flag: 'w',
    });
    fs.copyFileSync(
      sdkPaths.editorConfig,
      paths.editorConfig,
      COPYFILE_FICLONE
    );
  }

  if (!isLocationExist(paths.eslintIgnoreConfig)) {
    fs.writeFileSync(paths.eslintIgnoreConfig, '', {
      flag: 'w',
    });
    fs.copyFileSync(
      sdkPaths.eslintIgnoreConfig,
      paths.eslintIgnoreConfig,
      COPYFILE_FICLONE
    );
  }
};
