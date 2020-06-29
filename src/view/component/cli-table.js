const chalk = require('chalk');

class CliTable {
  constructor({header, width = [], style = []}) {
    this.header = header;
    this.width = width;
    this.style = style;

    this.rows = [];


    for (let i = 0; i < this.header.length; i++) {
      this.style[i] = this.style[i] ? this.style[i] : (s) => s;
    }
  }

  push(...args) {
    this.rows.push([...args]);
  }

  draw() {
    let line;

    line = '';
    for (let i = 0; i < this.header.length; i++) {
      line += this.header[i].padEnd(this.width[i]);
    }

    console.log(chalk.bold(line));

    line = '';
    for (let i = 0; i < this.header.length; i++) {
      if (!this.header[i]) {
        line += ''.padEnd(this.width[i]);
        continue;
      }

      line += '-----'.padEnd(this.width[i]);
    }
    console.log(line);

    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];

      line = '';
      for (let j = 0; j < row.length; j++) {
        line += this.style[j]((row[j] || '').toString().padEnd(this.width[j]));
      }

      console.log(line);
    }
  }
}

const create = (options) => new CliTable(options);

module.exports = {
  create,
};