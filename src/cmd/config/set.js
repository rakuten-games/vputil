const { program } = require('@caporal/core');

const configStore = require('../../storage/config-store');
const wrapper = require('../../program/wrapper');
const view = require('../../util/view');

const action = async (args, options) => {
  const key = args.key;
  const value = args.value;

  configStore.set(args.key, args.value);

  view.configSet.render({
    key,
    value
  })
};


program
  .command('config set', 'Set key-value to config')
  .argument('<key>', 'key')
  .argument('<value>', 'value')
  .option('--output <output>', 'Output target')
  .action(wrapper(action));
