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
module.exports = { fetchRecentReadingsAPI };
