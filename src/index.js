#!/usr/bin/env node
const walkSync = require('walk-sync');
const packageJson = require('../package.json');

const noColorIdx = process.argv.indexOf('--no-color');
if (noColorIdx >= 0) {
  process.argv[noColorIdx] = '--color=false';
  process.env['NO_COLOR'] = 1;
}

const program = require('caporal');
program.version(packageJson.version);

const paths = walkSync(`${__dirname}/cmd`, {
  directories: false,
  globs: ['**/*.js']
});

for (let i = 0; i < paths.length; i++) {
  require(`${__dirname}/cmd/${paths[i]}`);
}

program.parse(process.argv);
