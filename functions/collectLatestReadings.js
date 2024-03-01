require("dotenv").config({ path: ".env.local" });

async function fetchRecentReadings(endpoint) {
  try {
    console.log(`fetching ${endpoint}...`);
    return await fetch(endpoint).then((res) => res.json());
  } catch (error) {
    console.log("error", error);
    return [];
  }
}



async function collectLatestReadings() {
  // const mongoose = require("mongoose");
  const readingsData = await fetchRecentReadings(
    "https://environment.data.gov.uk/flood-monitoring/id/measures"
  );
  console.log("fetched readingsData", readingsData.items.length);

  const filteredReadings = filterRecentReadings(readingsData);
  console.log("filteredReadings", filteredReadings.length);

  // const stationSchema = new mongoose.Schema({
  //   id: { type: String, unique: true },
  //   notation: String,
  //   catchmentName: String,
  //   lat: Number,
  //   long: Number,
  //   label: String,
  //   dateOpened: Date,
  //   measures: Array,
  //   riverName: String,
  //   town: String,
  // });
  // const Station = mongoose.model("Station", stationSchema, "stationsTest");
  // await mongoose.connect(process.env.MONGO_URI);
  // console.log("connected to db");

  // for (const reading of filteredReadings) {
  //   const station = await Station.findOne({ notation: reading.notation });

  //   if (station) {
  //     const measureIndex = station.measures.findIndex(
  //       (measure) => measure.measureId === reading.id
  //     );

  //     if (measureIndex > -1) {
  //       const update = {
  //         $set: {
  //           [`measures.${measureIndex}.reading`]: reading.value,
  //           [`measures.${measureIndex}.dateTime`]: reading.dateTime,
  //         },
  //       };

  //       const options = { new: true, useFindAndModify: false };

  //       const updatedStation = await Station.findOneAndUpdate(
  //         { notation: reading.notation },
  //         update,
  //         options
  //       );

  //       if (updatedStation) {
  //         console.log("Updated station:", updatedStation.notation);
  //       } else {
  //         console.log("No station found with id:", updatedStation.notation);
  //       }
  //     }
  //   }
  // }
  // await mongoose.connection.close();
}
collectLatestReadings();

module.exports = { filterRecentReadings, combineStationsAndReadings };
