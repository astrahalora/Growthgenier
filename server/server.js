require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const profileModel = require("./db/profile.model");

const { MONGO_URL, PORT = 5000 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/growth/", async(req, res) => {
    const profile = await profileModel.find();
    return res.json(profile);
  })

  const main = async () => {
    await mongoose.connect(MONGO_URL);
  
    app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}/api/growth`));
  }
  
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });