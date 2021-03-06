const csvsync = require('csvsync');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

class Race extends EventEmitter {

  constructor(raceDataCSVPath) {
    super();
    ;
    this.data = csvsync.parse(
      fs.readFileSync(raceDataCSVPath),
      {
        returnObject: true
      }
    ).map(data => ({
      ...data,
      'Time car 1': parseFloat(data['Time car 1'], 10),
      'Time car 2': parseFloat(data['Time car 2'], 10),
      'Location car 1': parseFloat(data['Location car 1'], 10),
      'Location car 2': parseFloat(data['Location car 2'], 10)
    }))
  }

  getCars() {
    return ['Lightning McQueen', 'The King'];
  }

  start() {
    this.index = 0;
    this.intervalId = setInterval(() => {
      this._tick();

      if (this.index >= this.data.length) {
        clearInterval(this.intervalId);
        this.emit('end');
      }
    }, 50);
  }

  _tick() {
    const item = this.data[this.index];

    this.emit('data', {
      time: item['Time car 1'],
      carName: 'Lightning McQueen',
      xLocation: item['Location car 1']
    });
    this.emit('data', {
      time: item['Time car 2'],
      carName: 'The King',
      xLocation: item['Location car 2']
    });

    this.index += 1;
  }
}

function getRace() {
  return new Race(path.join(__dirname, 'race-data.csv'));
}

module.exports = {
  getRace,
  Race,
};
