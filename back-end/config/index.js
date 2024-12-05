require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGO_URI,
  JWT_SECRET: process.env.ACCESS_TOKEN_SECRET,
};
