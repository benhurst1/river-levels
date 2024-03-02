import fetchAPI from "../../../functions/fetchAPI";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req) {
  const id = req.nextUrl.searchParams.get("id");
  console.log(id);
  const res = await fetchAPI(
    `http://environment.data.gov.uk/flood-monitoring/id/floods/${id}`
  );
  return Response.json(res);
}
