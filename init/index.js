const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function initDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
    await Listing.deleteMany({});
    const ownerId = new mongoose.Types.ObjectId(
      "695ced54ce2a7aa5180ad293"
    );
    const listingsWithOwner = initData.data.map(obj => ({
      ...obj,
      owner: ownerId,
    }));
    await Listing.insertMany(listingsWithOwner);
    console.log("Data initialized with owner");

  } catch (err) {
    console.error("Error seeding DB:", err);
  } finally {
    await mongoose.connection.close();
    console.log("DB connection closed");
  }
}
initDB();