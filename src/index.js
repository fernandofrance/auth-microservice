const mongoose = require("mongoose");
const express = require('express');
const app = express();
require("dotenv").config();

// MongoDB connection
try {
    mongoose.connect(`${process.env.DB_URI}`);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }

// Express config
app.use(express.json())

// Routes



app.listen(3333)