const program = require('commander');

const configStore = require('../../storage/config-store');
const wrapper = require('../../util/wrapper');

const action = async(key, program) => {
    const value = configStore.get(key);

    if (!value) {
        console.log('not existed')
    }

    return value;
};


program
    .command('config get [key]')
    .description('[DESCRIPTION TBD]')
    .action(wrapper(action));