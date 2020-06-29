const _ = require('lodash');
const moment = require('moment');
const chalk = require('chalk');
const util = require('util');

const debug = ({logger}) => {
  return (...args) => {
    const timestamp = chalk.gray(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);

    for (let i = 0; i < args.length; i++) {
      let arg = args[i];

      if (_.isObject(arg)) {
        arg = util.inspect(arg, {
          colors: true,
        });
      }

      arg = arg.replace(/\n/g, `\n${timestamp} `);
      arg = `${timestamp} ${arg}`;

      logger.debug(arg);
    }
  }
};

const info = ({logger}) => {
  return logger.info;
};

const error = ({logger}) => {
  return logger.error;
};

module.exports = {
  debug,
  info,
  error,
};