const moment = require('moment');

const cliTable = require('./component/cli-table');

const render = ({ output, jwt }) => {
  switch (output) {
    case 'json':
      console.log(JSON.stringify({
        exp: jwt.exp || null,
      }));
      break;
    default:
      const table = cliTable.create({
        header: ['key', 'value'],
        width: [20,],
      });

      table.push('Expired', renderExpire(jwt));

      table.draw();
  }
};

const renderExpire = (jwt) => {
  if (!jwt.exp) {
    return 'No';
  }

  let str = '';

  const exp = moment.unix(jwt.exp);

  str += exp.format('YYYY-MM-DD HH:mm:ss');

  const now = moment();

  if (exp.isAfter(now)) {
    const diff = exp - now;
    const dur = moment.duration(diff);

    str += ` (${dur.hours()} hrs ${dur.minutes()} min ${dur.seconds()} sec left)`;
  }

  return str;
};

module.exports = {
  render,
};
