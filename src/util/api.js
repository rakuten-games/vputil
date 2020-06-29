const _ = require('lodash');

const envStore = require('../storage/env-store');
const auth = require('../util/auth');

module.exports = new Proxy(this, {
  get: function (target, prop, receiver) {
    const name = _.kebabCase(prop);

    const fn = require(`../api/${name}`);

    const token = envStore.get('token');

    if (!token) {
      throw new Error('No value on token');
    }

    const jwt = auth.parse(token);

    if (!jwt.org) {
      throw new Error('No org in token. It is not a valid token');
    }

    const host = `https://api.${jwt.aud}`;
    const organization = jwt.org;
    const authorization = `Bearer ${token}`;

    console.debug(`host: ${host}`);
    console.debug(`organization: ${organization}`);
    console.debug(`authorization: ${authorization}`);

    return function () {
      const args = [...arguments];

      args[0] = {
        organization,
        authorization,
        host,
        ...args[0],
      };

      return fn(...args);
    }
  },
});