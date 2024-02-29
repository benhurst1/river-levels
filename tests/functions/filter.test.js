import { filterStations, mapFilteredStations } from "../../functions/filter.js";
import stationsData from "../../data/stations.json";

describe("filterStations", () => {
  it("should filter and transform the stations data correctly", () => {
    const result = filterStations(stationsData);

    // Check that the result is an array
    expect(Array.isArray(result)).toBe(true);

    // Check that all stations in the result have the required properties
    result.forEach((station) => {
      expect(station).toHaveProperty("@id");
      expect(station).toHaveProperty("notation");
      expect(station).toHaveProperty("lat");
      expect(station).toHaveProperty("long");
    });

    // Check that lat, long and label are not arrays in all stations in the result
    // There is only one station in the data that has lat, long and label as arrays at index 1412
    result.forEach((station) => {
      expect(Array.isArray(station.lat)).toBe(false);
      expect(Array.isArray(station.long)).toBe(false);
      expect(Array.isArray(station.measures)).toBe(true);
    });

    // Check that all stations in the result have the correct types
    result.forEach((station) => {
      expect(typeof station["@id"]).toBe("string");
      expect(typeof station.notation).toBe("string");
      expect(typeof station.lat).toBe("number");
      expect(typeof station.long).toBe("number");
    });
  });
});

describe("mapFilteredStations", () => {
  it("should map the filtered stations correctly", () => {
    const filteredStations = filterStations(stationsData);
    const result = mapFilteredStations(filteredStations);

    // Check that the result is an array
    expect(Array.isArray(result)).toBe(true);

    // Check that all stations in the result have the required properties
    result.forEach((station) => {
      expect(station).toHaveProperty("measureId");
      expect(station).toHaveProperty("notation");
      expect(station).toHaveProperty("lat");
      expect(station).toHaveProperty("long");
      expect(station).toHaveProperty("label");
      expect(station).toHaveProperty("dateOpened");
      expect(station).toHaveProperty("riverName");
      expect(station).toHaveProperty("town");
    });
  });
});
