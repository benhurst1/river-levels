export const dynamic = "force-dynamic"; // defaults to auto
const  filterFloodWarnings  = require("../../../functions/floodWarnings");
const fetchAPI = require("../../../functions/fetchAPI");

export async function GET() {
  try {
    const res = await fetchAPI(
      "https://environment.data.gov.uk/flood-monitoring/id/floods"
    );
    const data = filterFloodWarnings(res);
    return Response.json(data);
  } catch (error) {
    console.log("error", error);
    return [];
  }
}
