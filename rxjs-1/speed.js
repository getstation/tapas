const Rx = require('rxjs');

const { getRace } = require('./race');
const race = getRace();

const carName = `Lightning McQueen`;

const getCarSpeed = (race, car) => {
    return new Rx.Observable(observer => {
        let lastTime = 0;
        let lastLocation = 0;
        race.on('data', ({ time, carName, xLocation }) => {
            if (car === carName && time - lastTime > 200) {
                const speed = 1000 * ((xLocation - lastLocation) / (time - lastTime));
                observer.next(speed.toFixed(2));
                lastTime = time;
                lastLocation = xLocation;
            }
        });
    });
};

const speed$ = getCarSpeed(race, carName);

// adding `\r` allows to overwrite the message in the same line
speed$.subscribe(speed => process.stdout.write(`Speed: ${speed}m/s\r`));

race.start();