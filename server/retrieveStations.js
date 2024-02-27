require("dotenv").config({ path: ".env.local" });
const Station = require("../data/station");
const mongoose = require("mongoose");

async function retrieveStations() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    return [];
  }
  const stations = await Station.find({});
  await mongoose.connection.close();
  return stations;
}

module.exports = retrieveStations;
