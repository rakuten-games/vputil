const _ = require('lodash');
const envStore = require('../storage/env-store');

module.exports = new Proxy(this, {
  get: function (target, prop, receiver) {
    const name = _.kebabCase(prop);

    const obj = require(`../view/${name}`);

    return new Proxy(this, {
      get: function (target, prop, receiver) {
        const fn = obj[prop];

        const output = envStore.get('output');

        name !== 'logger' && console.debug(`output: ${output}`);

        return function () {
          const args = [...arguments];

          args[0] = {
            output,
            ...args[0],
          };

          return fn(...args);
        }
      },
    });
  },
});