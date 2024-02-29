import { fetchAPI } from "../../../functions/fetchAPI";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req) {
  const notation = req.nextUrl.searchParams.get("notation");
  const res = await fetchAPI(
    `https://environment.data.gov.uk/flood-monitoring/id/stations/${notation}.json`
  );
  return Response.json(res);
}
