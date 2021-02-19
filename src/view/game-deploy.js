const _ = require('lodash');

const render = ({ output, result }) => {
  switch (output) {
    case 'json':
      console.log(JSON.stringify(result));
      break;
    default:
      console.log(`Deploy successfully`);
  }
};

module.exports = {
  render,
};
