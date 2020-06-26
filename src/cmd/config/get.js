const program = require('commander');

const configStore = require('../../storage/config-store');
const wrapper = require('../../util/wrapper');

// const allowKeys = [
//     ''
// ];

const action = async(key, value, program) => {
    // if (!(key in allowKeys)) {
    //     console.log('not a valid key');
    //     return;
    // }

    configStore.set(key, value);
};

program
    .command('config get [key] [value]')
    .description('[DESCRIPTION TBD]')
    .action(wrapper(action));