const { ResturantModel } = require("../models/resturantModel");

const createResturantConteroller = async (req, res) => {
  try {
    const {
      name,
      imgURL,
      foods,
      time,
      delivery,
      isOpen,
      logoURL,
      rating,
      ratingCount,
      coords,
    } = req.body;

    if (!name || !coords) {
      return res.status(400).json({
        success: false,
        message: "Please provide the name and address field are required",
      });
    }

    const newResturant = new ResturantModel({
      name,
      imgURL,
      foods,
      time,
      delivery,
      isOpen,
      logoURL,
      rating,
      ratingCount,
      coords,
    });

    await newResturant.save();

    return res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      newResturant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Create Resturant API",
      error: error.message,
    });
  }
};

const getAllResturantController = async (req, res) => {
  try {
    const resturants = await ResturantModel.find();

    if (!resturants) {
      return res.status(404).json({
        success: false,
        message: "No restaurants found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Get all Resturant API",
      error: error.message,
    });
  }
};

const getResturantById = async (req, res) => {
  try {
    const resturant = await ResturantModel.findById(req.params.id);

    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurant fetched successfully",
      resturant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Get Resturant By Id API",
      error: error.message,
    });
  }
};

const deleteResturantConteroller = async (req, res) => {
  try {
    const resturant = await ResturantModel.findByIdAndDelete(req.params.id);
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Delete Resturant API",
      error: error.message,
    });
  }
};

module.exports = {
  createResturantConteroller,
  getAllResturantController,
  getResturantById,
  deleteResturantConteroller,
};
