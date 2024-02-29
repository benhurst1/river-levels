const stations = require("../data/stations");
const { mapFilteredStations } = require("../functions/filter");
const filterStations = require("../functions/filter").filterStations;

// Check if any of the lat or long properties are arrays
let latCount = 0;
let longCount = 0;
let riverNameCount = 0;
let townCount = 0;
let measureCount = 0;
let labelCount = 0;
let idCount = 0;
let notationCount = 0;
let measuresArrayCount = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  "4+": 0,
};
stations.items.forEach((station, index) => {
  if (!station.notation) {
    notationCount++;
  }
  if (!station.lat) {
    latCount++;
  }
  if (!station.long) {
    longCount++;
  }
  if (!station.riverName) {
    riverNameCount++;
  }
  if (!station.town) {
    townCount++;
  }
  if (!station.measures) {
    measureCount++;
  }
  if (!station.label) {
    labelCount++;
  }
  if (!station["@id"]) {
    idCount++;
  }
  if (station.measures) {
    if (station.measures.length === 0) {
      measuresArrayCount[0]++;
    } else if (station.measures.length === 1) {
      measuresArrayCount[1]++;
    } else if (station.measures.length === 2) {
      measuresArrayCount[2]++;
    } else if (station.measures.length === 3) {
      measuresArrayCount[3]++;
    } else {
      measuresArrayCount["4+"]++;
    }
  }
});

const filteredStations = filterStations(stations);
const mappedStations = mapFilteredStations(filteredStations);
console.log(mappedStations[0]);

console.log("stations with no lat", latCount);
console.log("stations with no long", longCount);
console.log("stations with no riverName", riverNameCount);
console.log("stations with no town", townCount);
console.log("stations with no measures", measureCount);
console.log("stations with no label", labelCount);
console.log("stations with no id", idCount);
console.log("stations with no notation", notationCount);
console.log("stations with 0 measures", measuresArrayCount[0]);
console.log("stations with 1 measures", measuresArrayCount[1]);
console.log("stations with 2 measures", measuresArrayCount[2]);
console.log("stations with 3 measures", measuresArrayCount[3]);
console.log("stations with 4+ measures", measuresArrayCount["4+"]);
