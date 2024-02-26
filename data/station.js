const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  notation: String,
  catchmentName: String,
  lat: Number,
  lng: Number,
  label: String,
  dateOpened: Date,
  riverName: String,
  town: String,
});

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;