import winston from "winston";
import {
  myFormatWithColor,
  enumerateErrorFormat,
} from "../utils/utilsFuncs.js";
import { Loggly } from "winston-loggly-bulk";
import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    enumerateErrorFormat()
  ),
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),

        myFormatWithColor
      ),
    }),
  ],
});

//logs management witgh Loggly
logger.add(
  new Loggly({
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
    tags: [`${process.env.NODE_ENV}`],
    json: true,
  })
);
logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

export default logger;
