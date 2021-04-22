#!/usr/bin/env node
const updateNotifier = require('update-notifier');
const walkSync = require('walk-sync');
const { createLogger, format, transports } = require('winston');
const { program } = require('@caporal/core');

const packageJson = require('../package.json');

program.version(packageJson.version);

const paths = walkSync(`${__dirname}/cmd`, {
  directories: false,
  globs: ['**/*.js']
});

for (let i = 0; i < paths.length; i++) {
  require(`${__dirname}/cmd/${paths[i]}`);
}

if (process.argv.length === 2) {
  process.argv.push('--help');
}

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => {
            return `${info.message}`;
          })
      )
    }),
  ],
});

program.logger(logger);

program.run(process.argv.slice(2));

updateNotifier({ pkg: packageJson }).notify();
