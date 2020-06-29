const _ = require('lodash');
const chalk = require('chalk');
const util = require('util');

const renderError = ({output, err}) => {
  switch (output) {
    case 'json':
      console.log(JSON.stringify({
        error: err.message,
      }));
      break;
    default:
      console.error(chalk.bold.red('Error: ') + chalk.red(err.message));
  }

  console.debug(util.inspect(err, {
    colors: true,
  }));

  return true
};

const renderApiError = ({output, err}) => {
  const body = _.get(err, 'response.body');

  if (!body) {
    return false;
  }

  if (!Object.keys(body).length) {
    return false;
  }

  switch (output) {
    case 'json':
      console.log(JSON.stringify(body));
      break;
    default:
      const {
        status,
        error,
      } = body;

      let msg = '';

      msg += status;

      if (error) {
        msg += `- ${error}`;
      }

      console.error(chalk.bold.red('Error: ') + chalk.red(msg));
  }

  return true
};

const render = (args) => {
  if (renderApiError(args)) return;

  renderError(args);
};

module.exports = {
  render,
};