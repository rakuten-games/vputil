const program = require('commander');

const wrapper = require('../../util/wrapper');

const action = async(gameId, bundle, program) => {

};

program
    .command('game upload [game_id] [bundle]')
    .description('[DESCRIPTION TBD]')
    .option('--token', '[DESCRIPTION TBD]')
    .option('--output', '[DESCRIPTION TBD]')
    .action(wrapper(action));