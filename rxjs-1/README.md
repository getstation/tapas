# RxJS and racing
The objective of this challenge is to implement a live leaderboard of a car race using RxJS.

## Context

A race between 2 cars is happening on a straight line.

The location of the 2 cars on the line are broadcasted live by a radar and are available as an [event-emitter](https://nodejs.org/api/events.html#events_class_eventemitter):

```js
// `getRace` will use mocked data
const { getRace } = require('./race');
const race = getRace();

// race is an event-emitter
race.on('data', ({ time, carName, xLocation }) => {
  // time (number) - is the time in ms since the begining of the race
  // carName (string) - the name of the car
  // xLocation (number) - the distance (in meter) of the car `carName` from
  // the starting line

  console.log(`At ${time}ms of the begining of the race, car ${carName} is at ${xLocation}m from the starting line`);
});

race.on('end', () => {
  console.log('The race ended');
});

// get the name of the cars actually running the race
const carNames = race.getCars();
console.log('Participants:', carNames.join('/'));

// will actually start the race
race.start();
```

## Constraints
- Use the most of RxJS in your implementation
- Use the provided `getRace` exported in `race.js` to test your implementation

## Challenge
### Calculate the speed

Write a function `getCarSpeed`, that, given a `race` event-emiter and the name of a car, will return a RxJS Observable that emits the speed of the given car in _m/s_ **in live**.

```js
const { getRace } = require('./race');
const race = getRace();

const carName = `Lightning McQueen`;

const speed$ = getCarSpeed(race, carName);

// adding `\r` allows to overwrite the message in the same line
speed$.subscribe(speed => process.stdout.write(`Speed: ${speed}m/s\r`));

race.start();
```

Speed is calculated using the car location in a 200ms window.

### Calculate the leader-board
Write a function `getLeaderBoard`, that, given a `race` event-emiter, will return a RxJS Observable that emits in live a `leaderBoard` object representing the leader board **in live**.

`leaderBoard` is an array of object of `position` ordered items with:
- `carName` the name of the car
- `position` the position of the car in the race: `1` for first place, `2` for second place
- `leaderGapDistance` the distance (in meter) to the leader
- `leaderGapTime` the time (in ms) to the leader

```js
// will help with formating a table
const Table = require('easy-table')

const { getRace } = require('./race');
const race = getRace();


const leaderBoard$ = getLeaderBoard(race);

leaderBoard$.subscribe(leaderBoard => {
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
});

race.start();
```

There are several ways of [calculating the time gap](https://cyclingtips.com/2012/06/how-time-gaps-are-calculated/), but we'll chose the simplest one: if, at a given time, the leader car is at position X, the time gap for a car is the time it will take to reach X with its current speed.

## Preparation

```sh
cd tapas/rxjs-1

# Install dependencies
npm install

# Run the example
node example.js
```

## Resources for RxJS
 - [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
 - [Learnrx interactive operator tutorial](http://reactivex.io/learnrx/)
 - [Learn RxJS](http://learnrxjs.io) - RxJS 5 descriptions, examples, and resources by Brian Troncone
 - [Interactive diagrams of Rx Observables](http://rxmarbles.com/) - André Staltz
 - [Rx Visualizer](https://rxviz.com) - Animated playground for Rx Observables by Misha Moroshko
 - [RxJS documentation] - RxJS 6 official documentation
 
**Tips:** for this challenge, among others, you might find these operators useful: _filter_, _map_, _throttleTime_, _buffer_ and friends, _combineLatest_, _window_ and friends, _mergeAll_, _take_ and friends, _flatMap_ and friends, _interval_.
