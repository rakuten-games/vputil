const program = require('commander');

const wrapper = require('../../util/wrapper');

const action = async(gameId, program) => {

};

program
    .command('game deploy [game_id] ')
    .description('[DESCRIPTION TBD]')
    .option('--token', '[DESCRIPTION TBD]')
    .option('--output', '[DESCRIPTION TBD]')
    .action(wrapper(action));