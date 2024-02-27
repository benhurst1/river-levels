require("dotenv").config({ path: ".env.local" });
const Station = require("../data/station");
const mongoose = require("mongoose");

async function retrieveStations() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    return [];
  }
  const stations = await Station.find({});
  return stations;
}

module.exports = retrieveStations;
