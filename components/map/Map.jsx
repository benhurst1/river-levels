"use client";
import { LoadScript, GoogleMap } from "@react-google-maps/api";

export default function Map() {
  return (
    <div data-testid="google-maps" className="h-[700px] w-[700px]">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          zoom={7}
          center={{
            lat: 52.5,
            lng: -1,
          }}
          options={{
            streetViewControl: false, // turns off street view
            fullscreenControl: false, // turns off full screen option
          }}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}
