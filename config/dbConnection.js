import { Sequelize } from "sequelize";
import logger from "./logger.js";
import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: (...msg) => logger.info(msg),
  }
);

try {
  await sequelize.authenticate();
  logger.info("🚀 DB is up");
} catch (error) {
  logger.error(error);
}

export default sequelize;
