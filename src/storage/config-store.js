const fs = require('fs');
var path = require('path');

const dataPath = '~/.config/vputil/config.json';

let data = {};
let isInit = false;

const allowKeys = [
  ''
];

const get = (key, defaultValue) => {
  if (!isInit) {
    load();

    isInit = true;
  }

  if (!key) {
    return data;
  }

  if (!(key in data)) {
    return defaultValue;
  }

  return data[key];
};

const set = (key, value) => {
  if (!isInit) {
    load();

    isInit = true;
  }

  data[key] = value;

  save();
};

const load = () => {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
};

const save = () => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
};


module.exports = {
  get,
  set,
};