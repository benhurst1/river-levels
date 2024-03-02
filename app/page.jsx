"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    axios.get("/api/index").then((res) => {
      setWarnings(res.data);
    });
  }, []);

  function mapWarnings() {
    const [openSeverityIndex, setOpenSeverityIndex] = useState(null);
    const [openAreaIndex, setOpenAreaIndex] = useState(null);

    if (warnings.length === 0) return <h1>No warnings</h1>;

    const categories = warnings.reduce((acc, warning) => {
      if (!acc[warning.severityLevel]) {
        acc[warning.severityLevel] = [];
      }
      acc[warning.severityLevel].push(warning);
      return acc;
    }, {});

    return Object.entries(categories).map(
      ([severityLevel, warnings], severityIndex) => {
        const areas = warnings.reduce((acc, warning) => {
          if (!acc[warning.areaName]) {
            acc[warning.areaName] = [];
          }
          acc[warning.areaName].push(warning);
          return acc;
        }, {});

        return (
          <div key={severityIndex} className="mt-3 ml-10 w-[400px]">
            <button
              onClick={() => {
                setOpenSeverityIndex(
                  openSeverityIndex === severityIndex ? null : severityIndex
                );
                setOpenAreaIndex(null);
              }}
              className="bg-blue-200 p-3 rounded-md w-full hover:brightness-90 transition-all duration-300 ease-in-out mt-1"
            >
              Severity Level: {warnings[0].severity}
            </button>
            {openSeverityIndex === severityIndex &&
              Object.entries(areas).map(([areaName, warnings], areaIndex) => (
                <div key={areaIndex} className="ml-2">
                  <button
                    onClick={() =>
                      setOpenAreaIndex(
                        openAreaIndex === areaIndex ? null : areaIndex
                      )
                    }
                    className="bg-blue-300 rounded-md p-1 w-full mt-1 hover:brightness-90 transition-all duration-300 ease-in-out"
                  >
                    Area: {areaName}
                  </button>
                  <div className="flex flex-col gap-1 my-1">
                    {openAreaIndex === areaIndex &&
                      warnings.map((warning, index) => (
                        <Link
                          key={index}
                          href={`/flood/${warning.id}`}
                          className=" text-sm p-1 rounded-md transition-all bg-blue-100 hover:brightness-110 duration-300 ease-in-out"
                        >
                          {warning.description} &rarr;
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        );
      }
    );
  }

  return <div>{mapWarnings()}</div>;
}
