"use client";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";

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
    <div data-testid="google-maps" className="h-[700px] w-[700px]">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          zoom={7}
          center={getCenter()}
          options={{
            streetViewControl: false, // turns off street view
            fullscreenControl: false, // turns off full screen option
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
                    <p>Town: {station.town}</p>
                    <p>River Name: {station.riverName}</p>
                    <p>Latest reading: {station.value}</p>
                    <p>
                      Last updated:{" "}
                      {new Date(station.dateTime).toLocaleString()}
                    </p>
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
