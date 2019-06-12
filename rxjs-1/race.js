const csvsync = require('csvsync');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');
const { interval, from } = require('rxjs');
const { map, flatMap, takeWhile } = require('rxjs/operators');

const RACE_CSV_PATH = path.join(__dirname, 'race-data.csv');

const parseRaceData = (data) => ({
  ...data,
  'Time car 1': parseFloat(data['Time car 1'], 10),
  'Time car 2': parseFloat(data['Time car 2'], 10),
  'Location car 1': parseFloat(data['Location car 1'], 10),
  'Location car 2': parseFloat(data['Location car 2'], 10),
});

const getRaceData = (raceDataCSVPath) => {
  return csvsync.parse(
    fs.readFileSync(raceDataCSVPath),
    {
      returnObject: true
    }
  ).map(parseRaceData);
};

const createRaceObservable = (raceDataCSVPath, ms) => {
  const data = getRaceData(raceDataCSVPath);
  return interval(ms)
    .pipe(
      map((index) => data[index]),
      takeWhile(item => Boolean(item)),
      flatMap((item) =>
        from([
          { time: item['Time car 1'], carName: 'Lightning McQueen', xLocation: item['Location car 1'] },
          { time: item['Time car 2'], carName: 'The King', xLocation: item['Location car 2'] },
        ])
      ),
    );
};

const startRace = () => createRaceObservable(RACE_CSV_PATH, 50);

module.exports = {
  startRace,
};
