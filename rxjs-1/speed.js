const { bufferTime, filter, map } = require("rxjs/operators");
const fromStream = require("./fromStream");
const { getRace } = require("./race");
const calculateSpeedInInterval = require("./calculateSpeedInInterval");
const race = getRace();

const carName = `Lightning McQueen`;

const getCarSpeed = (race, carName) => {
  const filterByCar = ({ carName: currentCarName }) =>
    currentCarName === carName;

  return fromStream(race)
    .pipe(filter(filterByCar))
    .pipe(bufferTime(200))
    .pipe(map(calculateSpeedInInterval));
};

const speed$ = getCarSpeed(race, carName);

// adding `\r` allows to overwrite the message in the same line
speed$.subscribe((speed) => process.stdout.write(`Speed: ${speed}m/s\r`));

race.start();
