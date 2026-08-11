const userModel = require("../models/userModel");

const authController = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;

    // validation
    if (!username || !email || !password || !address || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if user already exists
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // create new user
    const newUser = await userModel.create({
      username,
      email,
      password,
      address,
      phone,
    });

    res.status(200).json({
      success: true,
      message: "Registration successful ",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Auth route is not working",
      error: error.message,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password!",
      });
    }

    // check user
    const userExist = await userModel.findOne({ email, password });

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successfully!",
      user: userExist,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login route is not working",
      error: err.message,
    });
  }
};

module.exports = { authController, loginController };
