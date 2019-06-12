const { getRace } = require('./race');

const race = getRace();

const carNames = race.getCars();

console.log('Participants:', carNames.join('/'));

race.on('data', ({time, carName, xLocation}) => {
  if (carName === 'Lightning McQueen') {
    process.stdout.write(`Time: ${time}, Location: ${xLocation}m\r`);
  }
});

race.start();
