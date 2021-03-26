import winston from "winston";
import chalk from "chalk";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const myFormatWithColor = winston.format.printf(
  ({ level, message, stack, error, timestamp }) => {
    if (level === "info")
      return (
        chalk.blue(`[${timestamp}] `) +
        chalk.magenta.bold(`[${level.toUpperCase()}]  `) +
        chalk.green.underline.bold(`: ${message}`)
      );
    if (level === "warn")
      return (
        chalk.yellowBright(`[${timestamp}] `) +
        chalk.magenta.bold(`[${level.toUpperCase()}]  `) +
        chalk.yellow.underline.bold(`: ${message}`)
      );
    if (level === "error")
      return (
        chalk.red(`[${timestamp}] `) +
        chalk.magenta.bold(`[${level.toUpperCase()}]  `) +
        chalk.redBright.underline.bold(`: ${message}`) +
        chalk.redBright.underline.bold(`: ${stack}`) +
        chalk.redBright.underline.bold(JSON.stringify(error))
      );
  }
);

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const enumerateErrorFormat = winston.format((info) => {
  if (info.message instanceof Error) {
    info.message = Object.assign(
      {
        message: info.message.message,
        stack: info.message.stack,
        error: info.message.errors,
      },
      info.message
    );
  }
  if (info instanceof Error) {
    return Object.assign(
      {
        message: info.message,
        stack: info.stack,
        error: info.errors,
      },
      info
    );
  }
  return info;
});

export const matchPassword = async function (enteredPassword, modelsPassword) {
  return await bcrypt.compare(enteredPassword, modelsPassword);
};
