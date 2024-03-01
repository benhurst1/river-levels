const mongoose = require("mongoose");

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

const Station =
  mongoose.models.Station ||
  mongoose.model("Station", stationSchema, "stationsTest");

module.exports = Station;
