

export function filterStations(stationsData) {
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

export function mapFilteredStations(stations) {
  return stations.map((station) => {
    const measure = station.measures.find(
      (measure) =>
        measure["@id"].endsWith("min-m") || measure["@id"].endsWith("min-mASD")
    );

    if (!station.lat || !station.long || !station.notation || !station.label) {
      throw new Error("Required property is missing");
    }

    return {
      measureId: measure ? measure["@id"] : null,
      notation: station.notation,
      catchmentName: station.catchmentName || null,
      lat: station.lat,
      long: station.long,
      label: station.label,
      dateOpened: station.dateOpened || null,
      riverName: station.riverName || null,
      town: station.town || null,
    };
  });
}

export function filterRecentReadings(readingsData) {
  return readingsData.items
    .filter(
      (reading) =>
        reading.latestReading && !Array.isArray(reading.latestReading)
    )
    .map((reading) => {
      return {
        id: reading["@id"],
        dateTime: reading.latestReading.dateTime,
        value: reading.latestReading.value,
      };
    });
}
