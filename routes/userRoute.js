const express = require("express");
const router = express.Router();
const { userController } = require("../controllers/userController");

router.get("/allUsers", userController);

module.exports = router;
