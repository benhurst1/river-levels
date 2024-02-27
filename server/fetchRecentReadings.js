require("dotenv").config({ path: ".env.local" });
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Station = require("../data/station");

mongoose.connect(process.env.MONGO_URI);

async function fetchStations() {
  const res = await fetch(
    "https://environment.data.gov.uk/flood-monitoring/id/measures?_limit=4000"
  );
  const data = await res.json();

  return data.items
    .filter(
      (station) =>
        station.lat &&
        station.long &&
        station.riverName &&
        station.town &&
        !Array.isArray(station.lat) &&
        !Array.isArray(station.long) &&
        !Array.isArray(station.label)
    )
    .map((station) => ({
      notation: station.notation,
      catchmentName: station.catchmentName,
      lat: station.lat,
      lng: station.long,
      label: station.label,
      dateOpened: station.dateOpened,
      riverName: station.riverName,
      town: station.town,
    }));
}

async function storeStations(stations) {
  let count = 0;
  for (const station of stations) {
    const { notation, ...rest } = station;
    let stationDoc = await Station.findOne({ notation });

    if (!stationDoc) {
      stationDoc = new Station(station);
      await stationDoc.save();
      count++;
      console.log("station saved", count, notation);
    }
  }
}

async function fetchAndStoreStations() {
  const stations = await fetchStations();
  await storeStations(stations);
}

module.exports = fetchAndStoreStations;
