import winston from "winston";
import {
  myFormatWithColor,
  enumerateErrorFormat,
} from "../utils/utilsFuncs.js";
import { Loggly } from "winston-loggly-bulk";

import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

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
logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};
//logs management witgh Loggly
try {
  logger.add(
    new Loggly({
      token: process.env.LOGGLY_TOKEN,
      subdomain: process.env.LOGGLY_SUBDOMAIN || "poloBustillo",
      tags: [`${process.env.NODE_ENV}`],
      json: true,
    })
  );
} catch (error) {
  logger.error(error)
}


export default logger;
