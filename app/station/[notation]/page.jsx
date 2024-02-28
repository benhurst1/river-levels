"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [station, setStation] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/fetchSingleStation?notation=${params.notation}`)
      .then((res) => {
        setStation(res.data.items);
        setLoading(false);
      });
  }, [params.notation]);

  function getCurrentReading() {
    if (Array.isArray(station.measures)) {
      const measure = station.measures.find((measure) =>
        measure.notation.endsWith("mASD")
      );

      if (!measure) {
        return <div>No measure found with notation ending in 'mASD'</div>;
      } else {
        return (
          <div>
            <p>{measure.latestReading.value}m</p>
            <p>{parseDate(measure.latestReading.dateTime)}</p>
          </div>
        );
      }
    } else {
      return (
        <div>
          <p>{station.measures.latestReading.value}m</p>
          <p>{parseDate(station.measures.latestReading.dateTime)}</p>
        </div>
      );
    }
  }

  function parseDate(dateTime) {
    return new Date(dateTime).toLocaleString();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const card = "p-3 bg-blue-200 rounded-md";

  return (
    <div className="flex w-screen justify-around mt-10">
      <div className={`${card}`}>
        <p>Date opened: {parseDate(station.dateOpened)}</p>
        <p>Catchment Name: {station.catchmentName}</p>
        <p>Town: {station.town}</p>
        <p>Typical High: {station.stageScale.typicalRangeHigh}m</p>
        <p>Typical Low: {station.stageScale.typicalRangeLow}m</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className={`${card} w-[50%] mx-auto`}>
          <p>Current reading:</p>
          {getCurrentReading()}
        </div>
        <div className="flex justify-around gap-3">
          <div className={card}>
            <p>Max on record:</p>
            <p>{station.stageScale.maxOnRecord.value}m</p>
            <p>{parseDate(station.stageScale.maxOnRecord.dateTime)}</p>
          </div>
          <div className={card}>
            <p>Min on record:</p>
            <p>{station.stageScale.minOnRecord.value}m</p>
            <p>{parseDate(station.stageScale.minOnRecord.dateTime)}</p>
          </div>
          <div className={card}>
            <p>Highest recent:</p>
            <p>{station.stageScale.highestRecent.value}m</p>
            <p>{parseDate(station.stageScale.highestRecent.dateTime)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
