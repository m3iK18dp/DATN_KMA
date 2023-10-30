const express = require("express");
const cors = require("cors");

const body_parser = require("body-parser");

const mailRouter = require("./routers/mail_routers");
const app = express();

app.use(cors());
app.use(body_parser.json());
app.use("/", mailRouter);

module.exports = app;
