function filterStations(stationsData) {
  return stationsData.items.filter(
    (station) =>
      station.lat &&
      station.long &&
      station.measures &&
      station.notation &&
      !Array.isArray(station.lat) &&
      !Array.isArray(station.long) &&
      Array.isArray(station.measures)
  );
}

module.exports = { fetchStationsAPI, filterStations };
