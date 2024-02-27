const mongoose = require('mongoose');

const recentReadingSchema = new mongoose.Schema({
  notation: String,
  catchmentName: String,
  lat: Number,
  lng: Number,
  label: String,
  dateOpened: Date,
  riverName: String,
  town: String,
});

const recentReading = mongoose.model('recentReading', recentReadingSchema);

module.exports = recentReading;