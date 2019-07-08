const { fromEvent, from } = require('rxjs');
const { reduce, map, throttleTime, flatMap, bufferCount } = require('rxjs/operators');
const Table = require('easy-table');

const { getRace } = require('./race');
const { round } = require('./util');

const race = getRace();
const carNames = race.getCars();

console.log('Participants:', carNames.join('/'));

function sortByPosition(cars) {
  return cars.sort((x, y) => y.xLocation - x.xLocation)
}

function raceReducer(acc, curr, index) {
  const [leader, ...others] = acc
  const isLast = index + 1 === carNames.length
  return [
    // reset first object once all gaps are calculated
    ...(isLast ? [{ ...leader, leaderGapDistance: 0, leaderGapTime: 0 }, ...others] : acc),
    {
      position: index + 1,
      carName: curr.carName,
      leaderGapDistance: leader
        ? round(leader.leaderGapDistance - curr.xLocation)
        : curr.xLocation,
      leaderGapTime: leader
        ? round(leader.leaderGapTime - curr.time)
        : curr.time,
    },
  ]
}

function getLeaderBoard(race) {
  return fromEvent(race, 'data').pipe(
    bufferCount(carNames.length),
    throttleTime(200),
    map(sortByPosition),
    flatMap(x => from(x).pipe(
      reduce(raceReducer, []),
    )),
  )
}

const leaderBoard$ = getLeaderBoard(race);

leaderBoard$.subscribe({
  next: (leaderBoard) => {
    const t = new Table()
    leaderBoard.forEach(function(car) {
      t.cell('#', car.position)
      t.cell('Name', car.carName)
      t.cell('Gap Distance', `${car.leaderGapDistance}m`)
      t.cell('Gap Time', `${car.leaderGapTime}ms`)
      t.newRow()
    });
    process.stdout.write(t.toString());
    // clear current the table at next writing
    process.stdout.moveCursor(0, -4)
  },
});

race.start();
