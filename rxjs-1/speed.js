const { Observable } = require("rxjs");
const { bufferTime, filter, map } = require("rxjs/operators");
const { getRace } = require("./race");
const race = getRace();

const carName = `Lightning McQueen`;

const getCarSpeed = (race, carName) => {
  const filterByCar = ({ carName: currentCarname }) =>
    currentCarname === carName;

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

  return new Observable((observer) => {
    const dataHandler = (data) => {
      observer.next(data);
    };

    const errorHandler = (err) => {
      observer.error(err);
    };

    const endHandler = () => {
      observer.complete();
    };

    race.addListener("data", dataHandler);
    race.addListener("error", errorHandler);
    race.addListener("end", endHandler);

    return () => {
      race.removeListener("data", dataHandler);
      race.removeListener("error", errorHandler);
      race.removeListener("end", endHandler);
    };
  })
    .pipe(filter(filterByCar))
    .pipe(bufferTime(200))
    .pipe(map(calculateSpeedInInterval));
};

const speed$ = getCarSpeed(race, carName);

// adding `\r` allows to overwrite the message in the same line
speed$.subscribe((speed) => process.stdout.write(`Speed: ${speed}m/s\r`));

race.start();
