const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Sorry, User Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Data Get Successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User route is not working",
      error: error.message,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { username, email, phone, address } = req.body;

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Sorry, User Not Found!",
      });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    const updatedUser = await userModel
      .findById(req.user.id)
      .select("-password");

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User route is not working",
      error: error.message,
    });
  }
};

// UPDATE PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide both oldPassword and newPassword",
      });
    }

    const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkOldPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const salt = await bcrypt.compareSync(10);
    const hashNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashNewPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Update Password API",
      error: error.message,
    });
  }
};

// RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "You must enter all fields",
      });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Sorry, User Not Found",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(newPassword, salt);

    // update password
    user.password = hashPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Password Reset API",
      error: error.message,
    });
  }
};

// DELETE USER PROFILE ACCOUNT
const deleteUserConteroller = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Sorry, User Not Found",
      });
    }

    await userModel.findByIdAndDelete(req.user.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Delete User API",
      error: error.message,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserConteroller,
};
