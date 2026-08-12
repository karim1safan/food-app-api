const userModel = require("../models/userModel");

const userController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User route is not working",
      error: error.message,
    });
  }
};

module.exports = {userController}
