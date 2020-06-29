const program = require('caporal');

const wrapper = require('../../program/wrapper');
const api = require('../../util/api');
const view = require('../../util/view');

const action = async (args, options, logger) => {
  const gameId = args.gameId;

  const list = await api.getGames({
    gameId,
  });

  view.gameList.render({list});
};

program
  .command('game list')
  .description('Print game list')
  .option('--token <token>', 'Access token')
  .option('--output <output>', 'Output target')
  .action(wrapper(action));