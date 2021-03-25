//Server definition
import express from "express";
import { ApolloServer } from "apollo-server-express";

//GQL use
import schema from "./gql/index.js";

//server config
import createSSLServer from "./config/ssl.js";
import * as dotenv from "dotenv";

//logger setup
import logger from "./config/logger.js";
import morgan from "morgan";

async function startApolloServer() {
  //get environtment variables
  const environment = process.env.NODE_ENV || "production";
  dotenv.config({ path: `.env.${environment}` });

  //declaration server
  let serverApollo = new ApolloServer({
    schema,
    tracing: true,
    context: () => {
      return { greetings: "From Context" };
    },
  });

  //create https server
  const app = express();
  let server = createSSLServer(app);

  //Logging
  app.use(morgan("combined", { stream: logger.stream }));
  //logger.info(`Environment:${process.env.NODE_ENV}`);
  //logger.warn(`Environment2:${process.env.NODE_ENV}`);
  //logger.error(`Environment3:${process.env.NODE_ENV}`);

  //Example REST API
  app.use("/api/nombre", async (req, res) => {
    res.status(200);
    res.send(JSON.stringify("data"));
  });

  //Add express to ApolloServer
  serverApollo.applyMiddleware({ app, path: "/queries" });

  //init server in port
  await new Promise((resolve) =>
    server.listen({ port: process.env.PORT }, resolve)
  );

  logger.info(
    `🚀 Server ready at http${process.env.SSL === "true" ? "s" : ""}://${
      process.env.HOST
    }:${process.env.PORT}${serverApollo.graphqlPath}`
  );

  return { server, app };
}

//main method
startApolloServer();
