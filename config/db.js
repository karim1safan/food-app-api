const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected: ${mongoose.connection.host}`.cyan.underline.bold,
    );
  } catch (error) {
    console.log(`Error in connecting to database: ${error.message}`.red.bold);
  }
};

module.exports = connectDB;