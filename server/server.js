const express = require("express");
const next = require("next");
const cron = require("node-cron");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3002;

const fetchAndStoreStations = require("./fetchStations");

cron.schedule("*/15 * * * *", fetchAndStoreStations);

app
  .prepare()
  .then(() => {
    const server = express();

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error:", err);
  });
