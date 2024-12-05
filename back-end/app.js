const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors()); // Add this line to enable CORS
app.use(express.json());

const authRouter = require("./routes/auth");

app.use("/api/auth", authRouter);

module.exports = app;
