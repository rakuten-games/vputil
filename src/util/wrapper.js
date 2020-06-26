const envStore = require('../storage/env-store');

module.exports = (fn) => {
    return (...args) => {
        const program = args[args.length - 1];
        envStore.setAll(program.opts());

        fn(...args);
    }
};
