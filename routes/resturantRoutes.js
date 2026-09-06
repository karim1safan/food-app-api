const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createResturantConteroller,
  getAllResturantController,
  getResturantById,
  deleteResturantConteroller,
} = require("../controllers/resturantController");
const router = express.Router();

/**
 * @description Create a new resturant
 * @route /api/v1/resturant/
 * @method POST
 * @access Private
 */
router.post("/create", authMiddleware, createResturantConteroller);

/**
 * @description Get all resturants
 * @method GET
 * @route /api/v1/resturant/getAll
 * @access Public
 */
router.get("/getAll", getAllResturantController);

/**
 * @description Get a resturant by id
 * @method GET
 * @route /api/v1/resturant/get/:id
 * @access Public
 */
router.get("/get/:id", getResturantById);

/**
 * @description Delete a resturant
 * @method DELET
 * @route /api/v1/resturant/delete/:id
 * @access Public
 */
router.delete("/delete/:id", deleteResturantConteroller);

module.exports = router;
