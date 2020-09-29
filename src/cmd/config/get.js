const { program } = require('@caporal/core');

const configStore = require('../../storage/config-store');
const wrapper = require('../../program/wrapper');
const view = require('../../util/view');

const action = async (args, options) => {
  const key = args.key;

  const value = configStore.get(key);
  if (!value) {
    throw new Error('Key is not existed')
  }

  view.configGet.render({
    key,
    value
  })
};

program
  .command('config get', 'Get config value from key')
  .argument('<key>', 'key')
  .option('--output <output>', 'Output target')
  .action(wrapper(action));
