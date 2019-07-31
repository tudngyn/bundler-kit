const { getValueFromFlag, isLocationExist } = require('./utility');
const paths = require('./paths');
const chalk = require('chalk');
const { MODE, FLAG } = require('./constant');

const getParams = () => {
  const mode = getValueFromFlag(FLAG.MODE);
  const entryPoint = getValueFromFlag(FLAG.FILE) || process.env.FILENAME;

  return {
    mode,
    entryPoint,
  };
};

const isModeValid = mode => {
  if (!mode || !MODE[mode.toUpperCase()]) {
    return false;
  }

  return true;
};

const isEntryPointValid = entryPoint => {
  if (!entryPoint) {
    return false;
  }

  if (!isLocationExist(`${paths.appSrc}/${entryPoint}`)) {
    return false;
  }

  return true;
};

const validateParams = () => {
  const { mode, entryPoint } = getParams();

  console.clear();

  console.log(chalk.green('\nChecking script parameters ... \n'));

  if (!isModeValid(mode)) {
    console.log(`\n- Invalid ${chalk.red('mode')}
    Example: ${chalk.green(`${FLAG.MODE} development`)} OR ${chalk.green(
      `${FLAG.MODE} production`
    )}
    `);

    return false;
  }

  if (!isEntryPointValid(entryPoint)) {
    console.log(`\n- Invalid ${chalk.red('entryPoint')}
    Example: ${chalk.green(
      `${FLAG.FILE} path/to/project/index`
    )} OR ${chalk.green('FILENAME=path/to/project/index')}\n
    `);

    return false;
  }

  return true;
};

module.exports = {
  isModeValid,
  isEntryPointValid,
  validateParams,
  getParams,
};
