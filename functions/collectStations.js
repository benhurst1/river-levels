require("dotenv").config({ path: ".env.local" });

async function fetchStations(endpoint) {
  try {
    console.log(`fetching ${endpoint}...`);
    return await fetch(endpoint).then((res) => res.json());
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
        station.measures &&
        station.notation &&
        !Array.isArray(station.lat) &&
        !Array.isArray(station.long) &&
        Array.isArray(station.measures)
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
  return stationsData.map((station) => {
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
  });
}

async function storeStations(stationsData) {
  const mongoose = require("mongoose");
  const stationSchema = new mongoose.Schema({
    id: String,
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
  const Station = mongoose.model("Station", stationSchema, "stationsTest");
  await mongoose.connect(process.env.MONGO_URI);
  let count = 0;
  for (const station of stationsData) {
    const { id: id, ...rest } = station;
    let existingStation = await Station.findOne({ id: id });

    if (!existingStation) {
      let stationDoc = new Station(station);
      await stationDoc.save();
      count++;
      console.log("station saved", count, id);
    }
  }
  await mongoose.connection.close();
}

async function collectStations() {
  const stationsData = await fetchStations(
    `https://environment.data.gov.uk/flood-monitoring/id/stations`
  );
  console.log("fetched stations", stationsData.length);
  const filteredStations = filterStations(stationsData);
  console.log("filtered stations", filteredStations.length);
  const mappedStations = mapStations(filteredStations);
  console.log("mapped stations", mappedStations.length);
  await storeStations(mappedStations);
  console.log("stored stations");
}

collectStations();
module.exports = { filterStations, mapStations };
