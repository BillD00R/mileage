const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");

const router = require("../routes/index");
const webServerConfig = require("./config");

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api", router);

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    function listen() {
      mongoose.set("useFindAndModify", false);
      return () => {
        httpServer
          .listen(webServerConfig.port)
          .on("listening", () => {
            console.log(`Web server listening on localhost:${webServerConfig.port}`);

            resolve();
          })
          .on("error", (err) => {
            reject(err);
          });
      };
    }
    const app = express();
    httpServer = http.createServer(app);
    app.use(cors());
    app.use(express.urlencoded({ limit: "30mb", extended: true }));
    app.use(express.json({ limit: "30mb", extended: true }));

    app.use("/api", router);

    app.get("/", async (req, res) => {
      res.end("HELLO WORLD");
    });

    mongoose
      // eslint-disable-next-line no-undef
      .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(listen())
      .catch((error) => console.log(error.message));
  });
}

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;
module.exports.initialize = initialize;
