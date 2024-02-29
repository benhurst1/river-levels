require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const Station = require("../../../functions/station");
const {
  fetchStationsAPI,
  fetchRecentReadingsAPI,
} = require("../../../functions/fetchAPI");
const {
  filterStations,
  filterRecentReadings,
  mapFilteredStations,
} = require("../../../functions/transformStations");

function combineStationsAndReadings(stations, readings) {
  return stations.map((station) => {
    const reading = readings.find((reading) => reading.id === station.id);
    if (reading) {
      return { ...station, dateTime: reading.dateTime, value: reading.value };
    } else {
      return station;
    }
  });
}

async function storeStations(stations) {
  await mongoose.connect(process.env.MONGO_URI);

  let count = 0;
  for (const station of stations) {
    const { id: id, ...rest } = station;
    let stationDoc = await Station.findOneAndUpdate({ id: id }, station, {
      new: true,
      upsert: true,
    });

    if (stationDoc) {
      count++;
      console.log("station saved or updated", count, id);
    }
  }
  await mongoose.connection.close();
}

async function fetchAndStoreStations() {
  const stations = await fetchAPI(
    `https://environment.data.gov.uk/flood-monitoring/id/stations`
  );
  const recentReadings = await fetchAPI(
    `https://environment.data.gov.uk/flood-monitoring/id/measures`
  );
  console.log("stations length", stations.items.length);
  console.log("recent readings length", recentReadings.items.length);
  const filteredStations = filterStations(stations);
  const mappedStations = mapFilteredStations(filteredStations);
  const filteredRecentReadings = filterRecentReadings(recentReadings);
  console.log("filtered stations length", filteredStations.length);
  console.log("filtered readings length", filteredRecentReadings.length);
  const combinedStationsAndReadings = combineStationsAndReadings(
    mappedStations,
    filteredRecentReadings
  );
  await storeStations(combinedStationsAndReadings);
}

fetchAndStoreStations();

module.exports = fetchAndStoreStations;
