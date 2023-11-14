require("dotenv").config();

exports.config = {
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  USER_SERVICE_API_KEY: process.env.USER_SERVICE_API_KEY,
  LOG_KEY: process.env.LOG_KEY,
  WALLET_SERVICE_URL: process.env.WALLET_SERVICE_URL,
  WALLET_SERVICE_TOKEN: process.env.WALLET_SERVICE_TOKEN,
};