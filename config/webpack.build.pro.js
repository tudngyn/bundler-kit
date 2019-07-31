const chalk = require('chalk');
const webpack = require('webpack');
const { getConfigFile } = require('./utility');
const generateFile = require('./webpack.generate.file');
const paths = require('./paths');
const fs = require('fs-extra');
const formatWebpackMessages = require('react-dev-utils-for-webpack4/formatWebpackMessages');
const FileSizeReporter = require('react-dev-utils-for-webpack4/FileSizeReporter');
const printBuildError = require('react-dev-utils-for-webpack4/printBuildError');
const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;

function build(previousFileSizes) {
  console.log('Creating an optimized production build...');

  let compiler = webpack(getConfigFile());
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

module.exports = function() {
  // First, read the current file sizes in build directory.
  // This lets us display how much they changed later.
  generateFile();

  measureFileSizesBeforeBuild(paths.appBuild)
    .then(previousFileSizes => {
      fs.emptyDirSync(paths.appBuild);
      copyPublicFolder();
      return build(previousFileSizes);
    })
    .then(
      ({ stats, previousFileSizes, warnings }) => {
        if (warnings.length) {
          console.log('\n==============================');
          console.log(chalk.yellow('Compiled with warnings.\n'));
          console.log(warnings.join('\n\n'));
          console.log('==============================\n');
        }
        console.log(chalk.green('Compiled successfully.\n'));

        const { startTime, endTime } = stats;

        console.log('File sizes after gzip:\n');

        Object.keys(previousFileSizes.sizes).forEach(item => {
          const fileSize = previousFileSizes.sizes[item] || 0;

          if (fileSize) {
            console.log(`${item}: ${fileSize / 1000} kB`);
          } else {
            console.log(`${item}: --- kB`);
          }
        });

        console.log(` Build time: ${(endTime - startTime) / 1000}s`);
        console.log();
      },
      err => {
        console.log(chalk.red('Failed to compile.\n'));
        printBuildError(err);
        process.exit(1);
      }
    );

  // Create the production build and print the deployment instructions.
};
