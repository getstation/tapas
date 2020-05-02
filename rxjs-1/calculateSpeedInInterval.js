module.exports = (interval) => {
  if (!interval || !interval.length) {
    return 0;
  }
  [firstEntry] = interval;
  [lastEntry] = interval.slice(-1);

  const timeInSecond = (lastEntry.time - firstEntry.time) / 1000;
  const distanceInMeter = lastEntry.xLocation - firstEntry.xLocation;

  return Math.round(distanceInMeter / timeInSecond);
};
