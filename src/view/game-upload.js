const _ = require('lodash');
const cliProgress = require('cli-progress');

const render = ({output, result}) => {
  const {
    number,
  } = result;

  switch (output) {
    case 'json':
      console.log(JSON.stringify(result));
      break;
    default:
      console.log(`Upload successfully to version ${number}`);
  }
};

const onProgress = ({output}) => {
  let bar;

  return (event) => {
    if (output) {
      return;
    }

    const {
      loaded,
      total,
    } = event;

    if (!bar) {
      bar = new cliProgress.SingleBar({
        format: 'Uploading... [{bar}] {percentage}% | {value}/{total} KB'
      });
      bar.start(total, 0);
    }

    bar.update(loaded);

    if (loaded === total) {
      bar.stop();
      console.log('Processing...')
    }
  };
};

module.exports = {
  render,
  onProgress,
};