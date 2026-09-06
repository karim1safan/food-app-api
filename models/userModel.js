const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "username is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
    address: { type: Array, required: [true, "address is required"] },
    phone: { type: String, required: [true, "phone is required"] },
    usertype: {
      type: String,
      required: [true, "usertype is required"],
      default: "Client",
      enum: ["Client", "Admin", "Vendor", "Driver"],
    },
    profile: {
      type: String,
      default: "https://www.svgrepo.com/show/452030/avatar-default.svg",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true },
);

// export
module.exports = mongoose.model("User", userSchema);

// {timestamps: true} is used to automatically add createdAt and updatedAt fields to the schema.

// mongoose.model("User", userSchema): creates a model named "User" based on the userSchema. This model can be used to interact with the "users" collection in the MongoDB database.
