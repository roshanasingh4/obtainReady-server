//DataBase connection
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const DB_URI = process.env.MONGODB_URI;

const connectToMongo = () => {
  mongoose
    .connect(DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectToMongo;
