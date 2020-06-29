const _ = require('lodash');
const moment = require('moment');

const cliTable = require('./component/cli-table');

const render = ({output, game}) => {
  switch (output) {
    case 'json':
      console.log(JSON.stringify(game));
      break;
    default:
      const table = cliTable.create({
        header: ['key', 'value'],
        width: [20,],
      });

      table.push('Title', _.get(game, 'metadata.en.title'));
      table.push('Game ID', _.get(game, 'id'));
      table.push('Version', renderVersion(game));
      table.push('Last Updated', renderLastUpdated(game));

      table.draw();
  }
};

const renderVersion = (game) => {
  let str = '';
  const versions = _.get(game, 'rollout.versions');

  let total = 0;

  for (let i = 0; i < versions.length; i++) {
    const {
      weight,
    } = versions[i];

    total += weight;
  }

  for (let i = 0; i < versions.length; i++) {
    const {
      version,
    } = versions[i];

    str += `${version}`;

    if (i !== versions.length - 1) {
      str += ', ';
    }
  }

  return str;
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