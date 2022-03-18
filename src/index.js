const mongoose = require("mongoose");
const express = require('express');
const helmet = require("helmet");
const app = express();
require("dotenv").config();

// Express config
app.use(express.json());
app.use(helmet());

// MongoDB connection
try {
    mongoose.connect(`${process.env.DB_URI}`);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }

// Routes
const authRoute = require("./routes/Auth");
app.use("/auth", authRoute);


app.listen(3333);