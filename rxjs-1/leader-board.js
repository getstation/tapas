const { combineLatest, interval, from } = require("rxjs");
const {
  bufferTime,
  filter,
  map,
  window,
  mergeAll,
  take,
  bufferCount,
  reduce,
  flatMap,
  mergeMap,
} = require("rxjs/operators");
// will help with formating a table
const Table = require("easy-table");
const fromStream = require("./fromStream");
const { getRace } = require("./race");
const race = getRace();

const getLeaderBoard = (race) => {
  const carsNumber = race.getCars().length;

  const sortByPosition = (raceStatus) => {
    if (!raceStatus) {
      return [];
    }

    const sortByXLocationDesc = (a, b) => b.xLocation - a.xLocation;

    return raceStatus.sort(sortByXLocationDesc);
  };

  const getLeaderGapDistance = (xLocation, leader) => {
    if (!leader) {
      return 0;
    }

    return +(leader.xLocation - xLocation).toFixed(2);
  };

  const cleanPositions = ([leader, ...otherCars]) => {
    const { xLocation, ...leaderPositionObject } = leader;
    return [leaderPositionObject, ...otherCars];
  };

  const transformToPositionObject = (positions, { carName, xLocation }) => {
    const position = positions.length + 1;
    const [leader] = positions;
    const isLeader = position === 1;
    const isLatest = position === carsNumber;

    const positionObject = {
      position,
      carName,
      ...(isLeader && {
        xLocation,
      }),
      leaderGapDistance: getLeaderGapDistance(xLocation, leader),
      leaderGapTime: null,
    };
    positions.push(positionObject);

    if (isLatest) {
      return cleanPositions(positions);
    }

    return positions;
  };

  return fromStream(race)
    .pipe(bufferCount(carsNumber))
    .pipe(map(sortByPosition))
    .pipe(mergeMap((x) => from(x).pipe(reduce(transformToPositionObject, []))));
};

const leaderBoard$ = getLeaderBoard(race);

// leaderBoard$.subscribe((leaderBoard) => {
//   const t = new Table();
//   leaderBoard.forEach(function (car) {
//     t.cell("#", car.position);
//     t.cell("Name", car.carName);
//     t.cell("Gap Distance", `${car.leaderGapDistance}m`);
//     t.cell("Gap Time", `${car.leaderGapTime}ms`);
//     t.newRow();
//   });
//   process.stdout.write(t.toString());
//   // clear current the table at next writing
//   process.stdout.moveCursor(0, -4);
// });

leaderBoard$.subscribe((response) => console.log(" ") || console.log(response));

race.start();
