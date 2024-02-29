const fetch = require("node-fetch");
// import fetch from "node-fetch";

async function fetchStationsAPI() {
  try {
    const stationsRes = await fetch(
      `https://environment.data.gov.uk/flood-monitoring/id/stations`
    );
    return stationsRes.json();
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

async function fetchRecentReadingsAPI() {
  try {
    const stationsRes = await fetch(
      `https://environment.data.gov.uk/flood-monitoring/id/measures`
    );
    if (!stationsRes.ok) {
      console.log("Error: ", stationsRes.status, stationsRes.statusText);
      return [];
    }
    console.log("stationsRes", stationsRes.status, stationsRes.statusText);
    return stationsRes.json();
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

async function fetchSingleStationAPI(notation) {
  try {
    console.log("fetching station with notation:", notation);
    const stationRes = await fetch(
      `https://environment.data.gov.uk/flood-monitoring/id/stations/${notation}.json`
    );
    return stationRes.json();
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

module.exports = {
  fetchStationsAPI,
  fetchRecentReadingsAPI,
  fetchSingleStationAPI,
};
