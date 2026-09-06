const express = require("express");
const router = express.Router();
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserConteroller,
  logoutUserController,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/getProfile", authMiddleware, getUserController);
router.put("/updateProfile", authMiddleware, updateUserController);
router.put("/updatePassword", authMiddleware, updatePasswordController);
router.post("/resetPassword", authMiddleware, resetPasswordController);
router.delete("/deleteProfile", authMiddleware, deleteUserConteroller);
router.post("/logout", authMiddleware, logoutUserController);

module.exports = router;
