import jwt from "jsonwebtoken";
import logger from "../config/logger.js";
import cors from "cors";

export const extractUserIdFromToken = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    logger.info(`UserId from middleware ${userId}`);
    // add the user to future requests
    req.userId = userId;
  }
  next();
};

export const corsConfig = cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (process.env.ALLOWED_ORIGINS.split(",").indexOf(origin) === -1) {
      var msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      logger.error(msg);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
});

export const notFound = (req, res, next) => {
  const error = new Error(`NOT FOUND ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
