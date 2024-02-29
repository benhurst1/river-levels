require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const Station = require("../../../functions/station");
const {
  fetchStationsAPI,
  fetchRecentReadingsAPI,
} = require("../../../functions/fetchAPI");
import { filterStations, filterRecentReadings } from "@/functions/filter";

function combineStationsAndReadings(stations, readings) {
  const combinedStations = stations.map((station) => {
    const reading = readings.find((reading) => reading.id === station.id);
    if (reading) {
      return { ...station, dateTime: reading.dateTime, value: reading.value };
    } else {
      return station;
    }
  });
  console.log("combined stations length", combinedStations.length);
  return combinedStations;
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
  const stations = await fetchStationsAPI();
  const recentReadings = await fetchRecentReadingsAPI();
  console.log("stations length", stations.items.length);
  console.log("recent readings length", recentReadings.items.length);
  const filteredStations = filterStations(stations);
  const filteredRecentReadings = filterRecentReadings(recentReadings);
  console.log("filtered stations length", filteredStations.length);
  console.log("filtered readings length", filteredRecentReadings.length);
  const combinedStationsAndReadings = combineStationsAndReadings(
    filteredStations,
    filteredRecentReadings
  );
  await storeStations(combinedStationsAndReadings);
}

fetchAndStoreStations();

module.exports = fetchAndStoreStations;
