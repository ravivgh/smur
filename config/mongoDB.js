require("dotenv").config();
const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoDB Connection...");
  } catch (err) {
    console.log("Connection Error...", err);
  }
};

module.exports = { connectionDB };
