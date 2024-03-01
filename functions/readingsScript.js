const readings = require("../data/recentReadings");

let latestReadingsCount = 0;

readings.items.forEach((element) => {
  if (Array.isArray(element.latestReading)) {
    latestReadingsCount++;
  }
});

console.log("Readings with array latestReading", latestReadingsCount);
