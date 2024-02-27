import retrieveStations from "@/server/retrieveStations";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const stations = await retrieveStations();
  return Response.json(stations);
}
