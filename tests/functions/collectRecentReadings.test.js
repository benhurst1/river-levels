const {
  filterRecentReadings,
} = require("../../functions/collectLatestReadings");
const recentReadingsData = require("../../data/recentReadings.json");

let filteredReadings;

beforeEach(() => {
  filteredReadings = filterRecentReadings(recentReadingsData);
});

describe("filterRecentReadings", () => {
  it("should return as an array", () => {
    expect(Array.isArray(filteredReadings)).toBe(true);
  });
  it("should not have the same items as the raw data", () => {
    expect(filteredReadings).not.toBe(recentReadingsData.items);
    expect(filteredReadings).not.toHaveProperty("meta");
  });
  it("should have the required properties", () => {
    filteredReadings.forEach((reading) => {
      expect(reading).toHaveProperty("id");
      expect(reading).toHaveProperty("dateTime");
      expect(reading).toHaveProperty("value");
      expect(reading).toHaveProperty("unitName");
    });
  });
  it("should have the correct types", () => {
    filteredReadings.forEach((reading) => {
      expect(typeof reading.id).toBe("string");
      expect(typeof reading.dateTime).toBe("string");
      expect(typeof reading.value).toBe("number");
      expect(typeof reading.unitName).toBe("string");
    });
  });
  it("should have only have readings with unitName m mOAD mASD", () => {
    filteredReadings.forEach((reading) => {
      expect(["m", "mASD", "mAOD"]).toContain(reading.unitName);
      expect(["%", "m/3s"]).not.toContain(reading.unitName);
    });
  });
});