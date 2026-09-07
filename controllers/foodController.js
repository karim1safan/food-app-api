const foodModel = require("../models/foodModel");

const createFoodController = async (req, res) => {
    try {
        const {name, description, price, imageURL, foodTags, category, code, isAvailable, resturant, rating, ratingCount} = req.body;

        if (!name || !description || !price ) {
            return res.status(400).json({
                success: false,
                message: "Name, description, and price are required fields",
            });
        }

        const newFood = new foodModel({
            name,
            description,
            price,
            imageURL,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating,
            ratingCount
        });

        const savedFood = await newFood.save();

        return res.status(201).json({
            success: true,
            message: "Food created successfully",
            food: savedFood,
        });

    }catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Create Food API",
            error: error.message,
        });
    }
}

const getAllFoodsController = async (req, res) => {
    try {
        const foods = await foodModel.find({});

        if (!foods || foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No foods found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "All Foods List",
            totalCount: foods.length,
            foods,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Get All Foods API",
            error: error.message,
        });
    }
};

const getFoodByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const food = await foodModel.findById(id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Food details",
            food,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Get Food By ID API",
            error: error.message,
        });
    }
};

const getFoodByRestaurantIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const foods = await foodModel.find({ resturant: id });

        if (!foods || foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No foods found for this restaurant",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Foods for the restaurant",
            totalCount: foods.length,
            foods,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Get Foods By Restaurant ID API",
            error: error.message,
        });
    }
};

const updateFoodController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, imageURL, foodTags, category, code, isAvailable, resturant, rating, ratingCount } = req.body;

        const updatedFood = await foodModel.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                imageURL,
                foodTags,
                category,
                code,
                isAvailable,
                resturant,
                rating,
                ratingCount
            },
            { new: true }
        );

        if (!updatedFood) {
            return res.status(404).json({
                success: false,
                message: "Food not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Food updated successfully",
            food: updatedFood,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Update Food API",
            error: error.message,
        });
    }
};

const deleteFoodController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFood = await foodModel.findByIdAndDelete(id);

        if (!deletedFood) {
            return res.status(404).json({
                success: false,
                message: "Food not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Food deleted successfully",
            food: deletedFood,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Delete Food API",
            error: error.message,
        });
    }
};

const getRandomFoodController = async (req, res) => {
    try {
        const randomFood = await foodModel.aggregate([{ $sample: { size: 1 } }]);

        if (!randomFood || randomFood.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No food found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Random Food",
            food: randomFood[0],
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Get Random Food API",
            error: error.message,
        });
    }
};

module.exports = {
    createFoodController,
    getAllFoodsController,
    getFoodByIdController,
    updateFoodController,
    deleteFoodController,
    getFoodByRestaurantIdController,
    getRandomFoodController
}