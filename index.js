//Server definition
import express from "express";
import { ApolloServer } from "apollo-server-express";

//GQL use
import schema from "./gql/index.js";

//server config
import createSSLServer from "./config/ssl.js";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { extractUserIdFromToken, corsConfig } from "./middleware/index.js";
//logger setup
import logger from "./config/logger.js";
import morgan from "morgan";
//get environtment variables
const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${environment}` });

async function startApolloServer() {
  //declaration server
  let serverApollo = new ApolloServer({
    schema,
    tracing: true,
    context: async ({ req, res }) => {
      return { req, res };
    },
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
  });

  //create https server
  const app = express();
  let server = createSSLServer(app);

  //Logging
  // logger.info(`Environment:${process.env.NODE_ENV}`);
  // logger.warn(`Environment2:${process.env.NODE_ENV}`);
  // logger.error(`Environment3:${process.env.NODE_ENV}`);
  //Middleware
  app.use(morgan("combined", { stream: logger.stream }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(extractUserIdFromToken);
  app.use(corsConfig);
  app.use("/api/nombre", async (req, res, next) => {
    res.status(200);
    res.send(JSON.stringify("Hola Mundo"));
  });

  //Add express to ApolloServer
  serverApollo.applyMiddleware({ app, path: "/queries", cors: false });

  //init server in port
  await new Promise((resolve) =>
    server.listen({ port: process.env.PORT||4000 }, resolve)
  );

  logger.info(
    `🚀 Server ready at http${process.env.SSL === "true" ? "s" : ""}://${
      process.env.HOSTNAME||"localhost"
    }:${process.env.PORT||4000}${serverApollo.graphqlPath}`
  );

  return { server, app };
}

//main method
startApolloServer();
