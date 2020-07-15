const program = require('caporal');

const wrapper = require('../../program/wrapper');
const api = require('../../util/api');
const view = require('../../util/view');

const action = async (args, options) => {
  const gameId = args.gameId;
  const bundle = args.bundle;
  const comment = options.comment;

  const onProgress = view.gameUpload.onProgress();

  const result = await api.uploadGame({
    gameId,
    bundle,
    comment,
    onProgress,
  });

  view.gameUpload.render({result});
};

program
  .command('game upload')
  .description('Upload game bundle')
  .argument('<game_id>', 'Game id')
  .argument('<bundle>', 'Bundle')
  .option('--comment <comment>', 'Comment')
  .option('--token <token>', 'Access token')
  .option('--output <output>', 'Output target')
  .action(wrapper(action));