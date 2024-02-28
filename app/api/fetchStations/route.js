const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Station = require("../../../data/station");

async function fetchStationsAPI() {
  try {
    const stationsRes = await fetch(
      `https://environment.data.gov.uk/flood-monitoring/id/stations`
    );
    return stationsRes.json();
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

function filterStations(stationsData) {
  return stationsData.items
    .filter(
      (station) =>
        station.lat &&
        station.long &&
        station.riverName &&
        station.town &&
        station.measures &&
        !Array.isArray(station.lat) &&
        !Array.isArray(station.long) &&
        !Array.isArray(station.label)
    )
    .map((station) => {
      const measure = station.measures.find(
        (measure) =>
          measure["@id"].endsWith("min-m") ||
          measure["@id"].endsWith("min-mASD")
      );

      return {
        id: measure ? measure["@id"] : null,
        notation: station.notation,
        catchmentName: station.catchmentName,
        lat: station.lat,
        lng: station.long,
        label: station.label,
        dateOpened: station.dateOpened,
        riverName: station.riverName,
        town: station.town,
      };
    });
}

async function fetchRecentReadings() {
  try {
    const stationsRes = await fetch(
      `https://environment.data.gov.uk/flood-monitoring/id/measures`
    );
    if (!stationsRes.ok) {
      console.log("Error: ", stationsRes.status, stationsRes.statusText);
      return [];
    }
    console.log("stationsRes", stationsRes.status, stationsRes.statusText);
    return stationsRes.json();
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

function filterRecentReadings(readingsData) {
  return readingsData.items
    .filter(
      (reading) =>
        reading.latestReading && !Array.isArray(reading.latestReading)
    )
    .map((reading) => {
      return {
        id: reading["@id"],
        dateTime: reading.latestReading.dateTime,
        value: reading.latestReading.value,
      };
    });
}

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
  const recentReadings = await fetchRecentReadings();
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
