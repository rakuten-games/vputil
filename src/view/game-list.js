const _ = require('lodash');
const chalk = require('chalk');

const cliTable = require('./component/cli-table');

const render = ({output, list}) => {
  switch (output) {
    case 'json':
      console.log(JSON.stringify(list));
      break;
    default:
      const games = list.data;

      const table = cliTable.create({
        header: ['', 'name', 'id'],
        width: [4, 40, 40],
        style: [, , chalk.green],
      });

      for (let i = 0; i < games.length; i++) {
        const {
          id,
          metadata: {
            en: {
              title,
            }
          }
        } = games[i];

        table.push(`${(i + 1)}.`, title, id);
      }

      table.draw();
  }
};

module.exports = {
  render,
};
