const {
  filterStations,
  mapStations,
  filterRecentReadings,
  combineStationsAndReadings,
} = require("../../functions/collectStations");
const recentReadingsData = require("../../data/recentReadings");
const stationsData = require("../../data/stations");

let filteredStations;
let mappedStations;
let filteredReadings;
let combinedReadingsStations;

beforeEach(() => {
  filteredStations = filterStations(stationsData);
  mappedStations = mapStations(filteredStations);
  filteredReadings = filterRecentReadings(recentReadingsData);
  combinedReadingsStations = combineStationsAndReadings(
    mappedStations,
    filteredReadings
  );
});

describe("combineStationsAndReadings", () => {
  it("should return as an array", () => {
    expect(Array.isArray(combinedReadingsStations)).toBe(true);
  });
  it("should have the same length as the stations", () => {
    expect(combinedReadingsStations.length).toBe(mappedStations.length);
  });
  it("should have the required properties", () => {
    combinedReadingsStations.forEach((station) => {
      expect(station).toHaveProperty("id");
      expect(station).toHaveProperty("notation");
      expect(station).toHaveProperty("catchmentName");
      expect(station).toHaveProperty("lat");
      expect(station).toHaveProperty("long");
      expect(station).toHaveProperty("label");
      expect(station).toHaveProperty("measures");
      expect(station).toHaveProperty("dateOpened");
      expect(station).toHaveProperty("riverName");
      expect(station).toHaveProperty("town");
    });
  });
  it("should have a measures property that is an array of objects", () => {
    combinedReadingsStations.forEach((station) => {
      expect(Array.isArray(station.measures)).toBe(true);
      station.measures.forEach((measure) => {
        expect(typeof measure).toBe("object");
      });
      expect(station.measures.length).toBeGreaterThan(0);
    });
  });
  it("should have a measures property that is an array of objects with the required properties", () => {
    combinedReadingsStations.forEach((station) => {
      station.measures.forEach((measure) => {
        expect(measure).toHaveProperty("measureId");
        expect(measure).toHaveProperty("parameterName");
        expect(measure).toHaveProperty("unitName");
        expect(measure).toHaveProperty("dateTime");
        expect(measure).toHaveProperty("value");
      });
    });
  });
  it("should have a measures property that is an array of objects with the correct types", () => {
    combinedReadingsStations.forEach((station) => {
      station.measures.forEach((measure) => {
        expect(typeof measure.measureId).toBe("string");
        expect(typeof measure.parameterName).toBe("string");
        expect(typeof measure.unitName).toBe("string");
        expect(typeof measure.dateTime).toBe("string");
        expect(typeof measure.value).toBe("number");
      });
    });
  });
  it("should have only have measures with parameterName 'Water Level'", () => {
    combinedReadingsStations.forEach((station) => {
      station.measures.forEach((measure) => {
        expect(measure.parameterName).toBe("Water Level");
      });
    });
  });
});
