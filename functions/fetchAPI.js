export async function fetchSingleStationAPI(notation) {
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