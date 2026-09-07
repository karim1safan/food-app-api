const express = require("express");
const {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
} = require("../controllers/categoryController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @description Create category
 * @method POST
 * @route /api/v1/category/create
 * @access Private
 */
router.post("/create", authMiddleware, createCategoryController);

/**
 * @description Get all categories
 * @method GET
 * @route /api/v1/category/getAll
 * @access Public
 */
router.get("/getAll", getAllCategoriesController);

/**
 * @description Get Category by ID
 * @method GET
 * @route /api/v1/category/get/:id
 * @access Public
 */
router.get("/get/:id", getCategoryByIdController);
/**
 * @description Update category
 * @method PUT
 * @route /api/v1/category/update:id
 * @access Private
 */
router.put("/update/:id", authMiddleware, updateCategoryController);

/**
 * @description Delete category
 * @method DELETE
 * @route /api/v1/category/delete/:id
 * @access Private
 */
router.delete("/delete/:id", authMiddleware, deleteCategoryController);
module.exports = router;
