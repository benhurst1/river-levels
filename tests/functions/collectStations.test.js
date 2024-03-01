const {
  filterStations,
  mapStations,
} = require("../../functions/collectStations.js");
const stationsData = require("../../data/stations.json");

// stations with no measures = 11
// stations with no notation = 1
// stations with no lat or long = 557
// stations with lat or long as arrays = 1

let filteredStations;
let mappedStations;

beforeEach(() => {
  filteredStations = filterStations(stationsData);
  mappedStations = mapStations(filteredStations);
});

describe("filterStations", () => {
  it("should return as an array", () => {
    expect(Array.isArray(filteredStations)).toBe(true);
  });
  it("should not have the same items as the raw data", () => {
    expect(filteredStations).not.toBe(stationsData.items);
    expect(filteredStations).not.toHaveProperty("meta");
  });
  it("should have the required properties", () => {
    filteredStations.forEach((station) => {
      expect(station).toHaveProperty("@id");
      expect(station).toHaveProperty("notation");
      expect(station).toHaveProperty("lat");
      expect(station).toHaveProperty("long");
      expect(station).toHaveProperty("measures");
    });
  });
  it("should have the correct types", () => {
    filteredStations.forEach((station) => {
      expect(typeof station["@id"]).toBe("string");
      expect(typeof station.notation).toBe("string");
      expect(Array.isArray(station.measures)).toBe(true);
      expect(typeof station.lat).toBe("number");
      expect(typeof station.long).toBe("number");
      expect(typeof station.measures).toBe("object");
    });
  });
  it("should have only have stations with measures greater than 0", () => {
    filteredStations.forEach((station) => {
      expect(station.measures.length).toBeGreaterThan(0);
    });
  });
  it("should have a measures with each measure having the required properties", () => {
    filteredStations.forEach((station) => {
      station.measures.forEach((measure) => {
        expect(measure).toHaveProperty("measureId");
        expect(measure).toHaveProperty("parameterName");
        expect(measure).toHaveProperty("unitName");
      });
    });
  });
  it("should have a measures with measureId as a string", () => {
    filteredStations.forEach((station) => {
      station.measures.forEach((measure) => {
        expect(typeof measure.measureId).toBe("string");
      });
    });
  });
  it('should have only have measures with parameterName "Water Level"', () => {
    filteredStations.forEach((station) => {
      station.measures.forEach((measure) => {
        expect(measure.parameterName).toBe("Water Level");
      });
    });
  });
  it("should have only have measures with unitName m mOAD mASD", () => {
    filteredStations.forEach((station) => {
      station.measures.forEach((measure) => {
        expect(["m", "mASD", "mAOD"]).toContain(measure.unitName);
        expect(["%", "m/3s"]).not.toContain(measure.unitName);
      });
    });
  });
});

describe("mapStations", () => {
  it("should return as an array", () => {
    expect(Array.isArray(mappedStations)).toBe(true);
  });
  it("should not have the same items as the raw data or filteredData", () => {
    expect(mappedStations).not.toBe(stationsData.items);
    expect(mappedStations).not.toBe(filteredStations);
  });
  it("should have the required properties", () => {
    mappedStations.forEach((station) => {
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
  it("should have the correct types", () => {
    mappedStations.forEach((station) => {
      expect(typeof station.id).toBe("string");
      expect(typeof station.notation).toBe("string");
      expect(["string", "object"]).toContain(typeof station.catchmentName);
      expect(typeof station.lat).toBe("number");
      expect(typeof station.long).toBe("number");
      expect(typeof station.label).toBe("string");
      expect(Array.isArray(station.measures)).toBe(true);
      expect(["string", "object"]).toContain(typeof station.dateOpened);
      expect(["string", "object"]).toContain(typeof station.riverName);
      expect(["string", "object"]).toContain(typeof station.town);
    });
  });
});
