const { CategoryModel } = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "The name field is required",
      });
    }

    const newCategory = new CategoryModel({
      name,
      imageUrl,
    });

    await newCategory.save();
    return res.status(201).json({
      success: true,
      message: "Category has been created successfully!",
      newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Create Category API",
      error: error.message,
    });
  }
};


const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Categories List",
      totalCount: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Get All Categories API",
      error: error.message,
    });
  }
};

const getCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category found",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Get Category by ID API",
      error: error.message,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "The name field is required",
      });
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category has been updated successfully!",
      updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Update Category API",
      error: error.message,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await CategoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category has been deleted successfully!",
      deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Delete Category API",
      error: error.message,
    });
  }
};

module.exports = { createCategoryController, getAllCategoriesController, updateCategoryController, deleteCategoryController, getCategoryByIdController };
