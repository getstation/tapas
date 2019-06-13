// will help with formating a table
const Table = require('easy-table')
const Rx = require('rxjs');

const { getRace } = require('./race');
const race = getRace();

const getLeaderBoard = (race) => {
    return new Rx.Observable(observer => {
        const cars = [];
        race.on('data', ({ time, carName, xLocation }) => {
            const car = cars.find((car) => car.carName === carName);
            if (car) {
                car.speed = 1000 * ((xLocation - car.xLocation) / (time - car.time));
                car.time = time;
                car.xLocation = xLocation;
            } else {
                cars.push({ carName, time, xLocation });
            }

            cars.sort((carA, carB) => {
                if (carA.xLocation > carB.xLocation) {
                    return -1;
                }
                return 1;
            });

            const leaderboard = cars.map((car, pos) => {
                const distanceGap = (cars[0].xLocation - car.xLocation);
                const timeGap = 1000 * distanceGap / car.speed;

                return  {
                    carName: car.carName,
                    position: pos + 1,
                    leaderGapDistance: distanceGap.toFixed(2),
                    leaderGapTime: timeGap.toFixed(2),
                }
            });
            observer.next(leaderboard);
        });
    });
}

const leaderBoard$ = getLeaderBoard(race);

leaderBoard$.subscribe(leaderBoard => {
    const t = new Table()
    leaderBoard.forEach(function (car) {
        t.cell('#', car.position)
        t.cell('Name', car.carName)
        t.cell('Gap Distance', `${car.leaderGapDistance}m`)
        t.cell('Gap Time', `${car.leaderGapTime}ms`)
        t.newRow()
    });
    process.stdout.write(t.toString());
    // clear current the table at next writing
    process.stdout.moveCursor(0, -4)
});

race.start();