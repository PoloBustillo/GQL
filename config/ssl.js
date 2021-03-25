import fs from "fs";
import https from "https";
import http from "http";

export default (app) => {
  let server;
  if (process.env.SSL === "true") {
    server = https.createServer(
      {
        key: fs.readFileSync(`./ssl/${process.env.NODE_ENV}/server.key`),
        cert: fs.readFileSync(`./ssl/${process.env.NODE_ENV}/server.crt`),
      },
      app
    );
  } else {
    server = http.createServer(app);
  }
  return server;
};
