require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");


async function fetchAPI(endpoint) {
  try {
    console.log(`fetching ${endpoint}...`);
    return await fetch(endpoint).then((res) => res.json());
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

function filterRecentReadings(readingsData) {
  return readingsData.items
    .filter(
      (reading) =>
        reading["@id"] &&
        reading.latestReading &&
        !Array.isArray(reading.latestReading) &&
        !Array.isArray(reading.latestReading.value) &&
        (reading.unitName === "m" ||
          reading.unitName === "mAOD" ||
          reading.unitName === "mASD")
    )
    .map((reading) => {
      return {
        id: reading["@id"],
        dateTime: reading.latestReading.dateTime,
        value: reading.latestReading.value,
        notation: reading.stationReference,
        unitName: reading.unitName,
      };
    });
}

function filterStations(stationsData) {
  return stationsData.items
    .filter(
      (station) =>
        station.lat &&
        station.long &&
        station.measures &&
        station.notation &&
        !Array.isArray(station.lat) &&
        !Array.isArray(station.long) &&
        Array.isArray(station.measures) &&
        station.measures.length > 0
    )
    .map((station) => {
      station.measures = station.measures
        .filter(
          (measure) =>
            (measure.unitName === "m" ||
              measure.unitName === "mASD" ||
              measure.unitName === "mAOD") &&
            measure.parameterName === "Water Level" &&
            measure["@id"]
        )
        .map((measure) => {
          return {
            measureId: measure["@id"],
            parameterName: measure.parameterName,
            unitName: measure.unitName,
          };
        });
      return station;
    });
}

function mapStations(stationsData) {
  return stationsData
    .map((station) => {
      if (station.measures && station.measures.length > 0) {
        return {
          id: station["@id"],
          notation: station.notation,
          catchmentName: station.catchmentName || null,
          lat: station.lat,
          long: station.long,
          label: station.label,
          measures: station.measures,
          dateOpened: station.dateOpened || null,
          riverName: station.riverName || null,
          town: station.town || null,
        };
      }
      return null;
    })
    .filter((station) => station !== null);
}

function combineStationsAndReadings(stations, readings) {
  return stations
    .map((station) => {
      station.measures = station.measures
        .map((measure) => {
          const reading = readings.find(
            (reading) => reading.id === measure.measureId
          );
          if (reading && reading.dateTime && reading.value !== undefined) {
            return {
              ...measure,
              dateTime: reading.dateTime,
              value: reading.value,
            };
          }
          return null;
        })
        .filter((measure) => measure !== null);
      if (station.measures.length > 0) {
        return station;
      }
      return null;
    })
    .filter((station) => station !== null);
}

async function storeStations(stationsData) {
  const stationSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    notation: String,
    catchmentName: String,
    lat: Number,
    long: Number,
    label: String,
    dateOpened: Date,
    measures: Array,
    riverName: String,
    town: String,
  });

  const Station = mongoose.model("Station", stationSchema, "stations");

  await mongoose.connect(process.env.MONGO_URI);

  for (const stationData of stationsData) {
    const filter = { id: stationData.id };
    const update = stationData;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const updatedStation = await Station.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (updatedStation) {
      console.log("Updated station:", updatedStation);
    } else {
      console.log("No station found with id:", stationData.id);
    }
  }

  await mongoose.connection.close();
}

async function collectStations() {
  const stationsData = await fetchAPI(
    `https://environment.data.gov.uk/flood-monitoring/id/stations`
  );
  console.log("fetched stations", stationsData.items.length);
  const readingsData = await fetchAPI(
    "https://environment.data.gov.uk/flood-monitoring/id/measures"
  );
  console.log("fetched readingsData", readingsData.items.length);

  const filteredStations = filterStations(stationsData);
  console.log("filtered stations", filteredStations.length);
  const mappedStations = mapStations(filteredStations);
  console.log("mapped stations", mappedStations.length);

  const filteredReadings = filterRecentReadings(readingsData);
  console.log("filteredReadings", filteredReadings.length);

  const combinedStationsAndReadings = combineStationsAndReadings(
    mappedStations,
    filteredReadings
  );

  await storeStations(combinedStationsAndReadings);
  console.log("stored stations");
}

collectStations();
module.exports = {
  filterStations,
  mapStations,
  collectStations,
  filterRecentReadings,
  combineStationsAndReadings,
};
