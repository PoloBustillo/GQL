//Server definition
import express from "express";
import { ApolloServer } from "apollo-server-express";

//GQL use
import schema from "./gql/index.js";

//server config
import createSSLServer from "./config/ssl.js";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

//logger setup
import logger from "./config/logger.js";
import morgan from "morgan";

var allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://yourapp.com",
];

async function startApolloServer() {
  //get environtment variables
  const environment = process.env.NODE_ENV || "production";
  dotenv.config({ path: `.env.${environment}` });

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
  app.use(morgan("combined", { stream: logger.stream }));
  //logger.info(`Environment:${process.env.NODE_ENV}`);
  //logger.warn(`Environment2:${process.env.NODE_ENV}`);
  //logger.error(`Environment3:${process.env.NODE_ENV}`);

  //Middleware
  app.use(express.json());
  app.use(cookieParser());
  app.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      console.log("TOKEN MIDDLE", userId);
      // add the user to future requests
      req.userId = userId;
    }
    next();
  });
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          logger.error(msg);
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );
  app.use("/api/nombre", async (req, res) => {
    res.status(200);
    res.send(JSON.stringify("data"));
  });

  //Add express to ApolloServer
  serverApollo.applyMiddleware({ app, path: "/queries", cors: false });

  //init server in port
  await new Promise((resolve) =>
    server.listen({ port: process.env.PORT }, resolve)
  );

  logger.info(
    `🚀 Server ready at http${process.env.SSL === "true" ? "s" : ""}://${
      process.env.HOSTNAME
    }:${process.env.PORT}${serverApollo.graphqlPath}`
  );

  return { server, app };
}

//main method
startApolloServer();
