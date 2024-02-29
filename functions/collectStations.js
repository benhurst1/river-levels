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

module.exports = { fetchStationsAPI };
