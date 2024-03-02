
function filterFloodWarnings(floodData) {
  return floodData.items.map((flood) => {
    return {
      id: flood.floodAreaID,
      description: flood.description,
      areaName: flood.eaAreaName,
      severity: flood.severity,
      severityLevel: flood.severityLevel,
    };
  });
}

module.exports = filterFloodWarnings;
