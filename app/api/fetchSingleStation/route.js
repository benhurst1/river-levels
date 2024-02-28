const { fetchSingleStationAPI } = require("../../../functions/fetchAPI");

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req) {
  const notation = req.nextUrl.searchParams.get("notation");
  const res = await fetchSingleStationAPI(notation);
  return Response.json(res);
}
