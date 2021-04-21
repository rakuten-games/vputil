const render = ({ output, key, value }) => {
  switch (output) {
    case 'json':
      console.log(JSON.stringify({
        key,
        value,
      }));
      break;
    default:
      console.log(value);
  }
};

module.exports = {
  render,
};
