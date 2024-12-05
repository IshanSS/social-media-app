const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors()); // Add this line to enable CORS
app.use(express.json());

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

app.use("/api/auth", authRouter);
app.use("/api", postRouter);

module.exports = app;
