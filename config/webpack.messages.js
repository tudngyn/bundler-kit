const {
  getParams,
  isModeValid,
  isEntryPointValid,
} = require('./validateParams');
const chalk = require('chalk');
const {
  prepareUrls,
} = require('react-dev-utils-for-webpack4/WebpackDevServerUtils');

const checkIcon = chalk.green.bgWhite(' ✔ ');
const xIcon = chalk.red.bgWhite(' ✖ ');

module.exports = ({ urls }) => {
  const { mode, entryPoint } = getParams();
  console.log('\n');

  console.log(` Link:       ${chalk.underline(urls.localUrlForTerminal)}`);

  console.log(
    ` mode:       ${chalk.white.bgBlack(mode)} ${
      isModeValid(mode) ? checkIcon : xIcon
    }`
  );
  console.log(
    ` entryPoint: ${chalk.white.bgBlack(entryPoint + '/index.js')}  ${
      isEntryPointValid(entryPoint) ? checkIcon : xIcon
    }`
  );

  console.log('\n');
};
