const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017"

const connectDb = async () => {
    await mongoose.connect(mongoUrl);
}

module.exports = {connectDb};

