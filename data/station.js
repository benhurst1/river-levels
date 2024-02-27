const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  id: String,
  notation: String,
  catchmentName: String,
  lat: Number,
  lng: Number,
  label: String,
  dateOpened: Date,
  riverName: String,
  town: String,
  dateTime: Date,
  value: Number,
});

const Station = mongoose.model(
  "Station",
  stationSchema,
  "stations"
);

module.exports = Station;
