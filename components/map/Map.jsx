"use client";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import Link from "next/link";

export default function Map({ stations }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  function handleClick(station) {
    setSelectedMarker(station);
  }

  function getCenter() {
    if (selectedMarker == null) {
      return {
        lat: 52.5,
        lng: -1,
      };
    }
    return { lat: selectedMarker.lat, lng: selectedMarker.lng };
  }

  return (
    <div data-testid="google-maps" className="h-[700px] md:w-[700px] w-full">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          zoom={7}
          center={getCenter()}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
          }}
        >
          {stations.map((station, index) => (
            <Marker
              key={index}
              onClick={() => handleClick(station)}
              position={{
                lat: station.lat,
                lng: station.lng,
              }}
            >
              {selectedMarker === station && (
                <InfoWindow
                  position={{
                    lat: station.lat,
                    lng: station.lng,
                  }}
                >
                  <div className="p-3 text-black">
                    <h2 className="font-semibold text-lg">{station.label}</h2>
                    <p>Town: {station.town}</p>
                    <p>River Name: {station.riverName}</p>
                    <p>Latest reading: {station.value}</p>
                    <p>
                      Last updated:{" "}
                      {new Date(station.dateTime).toLocaleString()}
                    </p>
                    <Link
                      href={`/station/${station.notation}`}
                      value={station.notation}
                      className="text-blue-500"
                    >
                      More info...
                    </Link>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
