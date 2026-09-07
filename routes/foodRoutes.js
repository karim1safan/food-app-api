const express = require("express");
const { createFoodController, getAllFoodsController, getFoodByIdController, updateFoodController, deleteFoodController, getFoodByRestaurantIdController, getRandomFoodController } = require("../controllers/foodController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @description Create new food
 * @method POST
 * @route /api/v1/food/create
 * @access Private
 */
router.post("/create", authMiddleware, createFoodController);

/**
 * @description Get all foods
 * @method GET
 * @route /api/v1/food/getAll
 * @access Public
 */
router.get("/getAll", getAllFoodsController);

/**
 * @description Get food by ID
 * @method GET
 * @route /api/v1/food/get/:id
 * @access Public
 */
router.get("/get/:id", getFoodByIdController);

/**
 * @description Get food by restaurant ID
 * @method GET
 * @route /api/v1/food/getByRestaurant/:id
 * @access Public
 */
router.get("/getByRestaurant/:id", getFoodByRestaurantIdController);

/**
 * @description Update food by ID
 * @method PUT
 * @route /api/v1/food/update/:id
 * @access Private
 */
router.put("/update/:id", authMiddleware, updateFoodController);

/**
 * @description Delete food by ID
 * @method DELETE
 * @route /api/v1/food/delete/:id
 * @access Private
 */
router.delete("/delete/:id", authMiddleware, deleteFoodController);

/**
 * @description Get random food
 * @method GET
 * @route /api/v1/food/getRandom
 * @access Public
 */
router.get("/getRandom", getRandomFoodController);



module.exports = router;