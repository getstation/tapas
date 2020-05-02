const { bufferTime, filter, map } = require("rxjs/operators");
const fromStream = require("./fromStream");
const { getRace } = require("./race");
const race = getRace();

const carName = `Lightning McQueen`;

const getCarSpeed = (race, carName) => {
  const filterByCar = ({ carName: currentCarName }) =>
    currentCarName === carName;

  const calculateSpeedInInterval = (interval) => {
    if (!interval || !interval.length) {
      return 0;
    }
    [firstEntry] = interval;
    [lastEntry] = interval.slice(-1);

    const timeInSecond = (lastEntry.time - firstEntry.time) / 1000;
    const distanceInMeter = lastEntry.xLocation - firstEntry.xLocation;

    return Math.round(distanceInMeter / timeInSecond);
  };

  return fromStream(race)
    .pipe(filter(filterByCar))
    .pipe(bufferTime(200))
    .pipe(map(calculateSpeedInInterval));
};

const speed$ = getCarSpeed(race, carName);

// adding `\r` allows to overwrite the message in the same line
speed$.subscribe((speed) => process.stdout.write(`Speed: ${speed}m/s\r`));

race.start();
