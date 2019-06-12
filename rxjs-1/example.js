const { startRace } = require('./race');

const race$ = startRace();
const raceEnd = race$.toPromise();

race$.subscribe(({ time, carName, xLocation }) => {
  if (carName === 'Lightning McQueen') {
    process.stdout.write(`Time: ${time}, Location: ${xLocation}m\r`);
  }
});

raceEnd.then(() => {
  process.stdout.write('\nend of stream\n');
});
