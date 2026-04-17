const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

app.use(express.json());

const authRoutes = require("./src/routes/auth.routes");

app.use("/api/auth", authRoutes);

module.exports = app;