"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

export default function Page({ params }) {
  const [area, setArea] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/fetchFloodArea?id=${params.id}`).then((res) => {
      setArea(res.data.items);
      setLoading(false);
    });
  }, [params.id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex mt-10 gap-3 w-screen justify-center">
      <div className="flex flex-col gap-1 bg-blue-200 w-2/6 rounded-lg   p-3">
        <p>Severity: {area.severity}</p>
        <p>
          Severity changed:{" "}
          {new Date(area.timeSeverityChanged).toLocaleString()}
        </p>
        <h1>{area.description}</h1>
        <p>Area Name: {area.eaAreaName}</p>
        <p>River / Sea: {area.floodArea.riverOrSea}</p>
        <p>Message: {area.message}</p>
      </div>
      <div data-testid="google-maps" className="h-[500px] md:w-[500px] w-full">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}>
          <GoogleMap
            mapContainerStyle={{
              height: "100%",
              width: "100%",
            }}
            zoom={10}
            center={{ lat: area.floodArea.lat, lng: area.floodArea.long }}
            options={{
              streetViewControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker
              position={{
                lat: area.floodArea.lat,
                lng: area.floodArea.long,
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
