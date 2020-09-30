const { program } = require('@caporal/core');

const wrapper = require('../../program/wrapper');
const api = require('../../util/api');
const view = require('../../util/view');

const action = async (args, options) => {
  const gameId = args.gameId;

  const game = await api.getGame({
    gameId,
  });

  view.gameDescribe.render({game});
};

program
  .command('game describe', 'Print game info')
  .argument('<game_id>', 'Game id')
  .option('--token <token>', 'Access token')
  .option('--output <output>', 'Output target')
  .action(wrapper(action));
