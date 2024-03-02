const floodData = require("../../data/floodWarnings.json");
const filterFloodWarnings = require("../../functions/floodWarnings");

let filteredFloodWarnings;

beforeEach(() => {
  filteredFloodWarnings = filterFloodWarnings(floodData);
  console.log(filteredFloodWarnings.length);
});

describe("filterFloodWarnings", () => {
  it("should return as an array", () => {
    expect(Array.isArray(filteredFloodWarnings)).toBe(true);
  });
  it("should have the required properties", () => {
    filteredFloodWarnings.forEach((flood) => {
      expect(flood).toHaveProperty("id");
      expect(flood).toHaveProperty("description");
      expect(flood).toHaveProperty("areaName");
      expect(flood).toHaveProperty("severity");
      expect(flood).toHaveProperty("severityLevel");
    });
  });
  it("should have the required properties with the correct types", () => {
    filteredFloodWarnings.forEach((flood) => {
      expect(typeof flood.id).toBe("string");
      expect(typeof flood.description).toBe("string");
      expect(typeof flood.areaName).toBe("string");
      expect(typeof flood.severity).toBe("string");
      expect(typeof flood.severityLevel).toBe("number");
    });
  });
});
