const { program } = require('@caporal/core');

const wrapper = require('../../program/wrapper');
const api = require('../../util/api');
const view = require('../../util/view');

const action = async (args, options) => {
  const gameId = args.gameId;
  let version = args.version;

  if (isNaN(version)) {
    throw new Error('Please type integer for version');
  }

  version = parseInt(version);

  const result = await api.setDeploy({
    gameId,
    version,
  });

  view.gameDeploy.render({ result });
};

program
  .command('game deploy', 'Deploy game')
  .argument('<game_id>', 'Game id')
  .argument('<version>', 'Version Number')
  .option('--token <token>', 'Access token')
  .option('--output <output>', 'Output target')
  .action(wrapper(action));
