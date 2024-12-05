const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());

const authRouter = require("./routes/auth");

app.use("/api/auth", authRouter);

module.exports = app;
