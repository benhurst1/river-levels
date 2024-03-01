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
        unitName: reading.unitName,
      };
    });
}

function combineStationsAndReadings(stations, readings) {
  return stations.map((station) => {
    station.measures.map((measure) => {
      const reading = readings.find(
        (reading) => reading.id === measure.measureId
      );
      if (reading) {
        return { ...measure, dateTime: reading.dateTime, value: reading.value };
      }
    });
    return station;
  });
}

module.exports = { filterRecentReadings, combineStationsAndReadings };
