const MODE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

const FLAG = {
  MODE: '--mode',
  FILE: '--file',
  OUTPUT_PATH: '--output-path',
};

const DEFAULT_OUTPUT_PATH = 'build/static/';

module.exports = {
  MODE,
  FLAG,
  DEFAULT_OUTPUT_PATH,
};
