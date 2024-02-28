const Station = require("../../../functions/station");
const mongoose = require("mongoose");

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    return [];
  }
  const stations = await Station.find({});

  return Response.json(stations);
}
