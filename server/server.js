const express = require("express");
const next = require("next");
const cron = require("node-cron");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3002;

const fetchAndStoreStations = require("./fetchStations");
const retrieveStations = require("./retrieveStations");

cron.schedule("*/15 * * * *", fetchAndStoreStations);

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors());

    server.get("/map", async (req, res) => {
      const data = await retrieveStations();
      return res.json(data);
    });

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
