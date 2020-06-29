const program = require('caporal');

const wrapper = require('../program/wrapper');
const api = require('../util/api');
const view = require('../util/view');
const envStore = require('../storage/env-store');
const auth = require('../util/auth');

const action = async (args, options, logger) => {
  const token = envStore.get('token');

  const jwt = auth.parse(token);

  view.info.render({
    jwt,
  });
};

program
  .command('info')
  .description('Print the user info')
  .option('--token <token>', 'Access token')
  .option('--output <output>', 'Output target')
  .action(wrapper(action));