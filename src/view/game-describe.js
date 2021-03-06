const _ = require('lodash');
const moment = require('moment');

const cliTable = require('./component/cli-table');

const render = ({ output, game, gameDeployment }) => {
  switch (output) {
    case 'json':
      console.log(JSON.stringify({
        ...game,
        deployment: {
          ...gameDeployment,
        },
      }));
      break;
    default:
      const table = cliTable.create({
        header: ['key', 'value'],
        width: [20,],
      });

      table.push('Title', _.get(game, 'metadata.en.title'));
      table.push('Game ID', _.get(game, 'id'));
      table.push('Last Updated', renderLastUpdated(game));
      table.push('Version', _.get(gameDeployment, 'deployed_version'));

      table.draw();
  }
};

const renderLastUpdated = (game) => {
  let str = '';

  const date = _.get(game, 'updated');
  str = moment(date).format('YYYY-MM-DD HH:mm:ss');

  return str;
};

module.exports = {
  render,
};
