#!/usr/bin/env node

const program = require('commander');
const walkSync = require('walk-sync');

program.version('0.1.0');

// require('./cmd/config/get');

console.log(__dirname);

const paths = walkSync(`${__dirname}/cmd`, {
  directories: false,
  globs: ['**/*.js']
});

for (let i = 0; i < paths.length; i++) {
  console.log(paths[i])
  require(`${__dirname}/cmd/${paths[i]}`);
}



program.on('command:*', function() {
  program.outputHelp();
});

program.parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
}
