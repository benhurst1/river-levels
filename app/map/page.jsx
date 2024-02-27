"use client";

import Map from "@/components/map/Map";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios.get("/api/map").then((res) => {
      setStations(res.data);
    });
  }, []);

  return (
    <div>
      <Map stations={stations} />
    </div>
  );
}
