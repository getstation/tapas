const { fromEvent } = require('rxjs');
const { throttleTime, flatMap } = require('rxjs/operators');

const { getRace } = require('./race');
const { round } = require('./util');

const race = getRace();
const carNames = race.getCars();

console.log('Participants:', carNames.join('/'));

const ONE_SEC_IN_MS = 1e3

function getCarSpeed(race, carName) {
  return fromEvent(race, 'data').pipe(
    throttleTime(200),
    flatMap(car => car.carName === carName
      ? [round(car.xLocation / (car.time / ONE_SEC_IN_MS))]
      : []),
  )
}

const carName1 = `Lightning McQueen`;

const speed$ = getCarSpeed(race, carName1);

speed$.subscribe({
  next: (speed) => process.stdout.write(`Speed: ${speed}m/s\r`),
});

race.start();
