const envStore = require('../storage/env-store');
const view = require('../util/view');

module.exports = (fn) => {
  return async ({logger, args, options}) => {
    envStore.setAll(options);

    console.debug = view.logger.debug({logger});
    console.log = view.logger.info({logger});
    console.error = view.logger.error({logger});

    try {
      await fn(args, options, logger);
    } catch (err) {
      view.error.render({err});
    }
  }
};
