const OrdersModel = require("../models/orderModel");
const FoodModel = require("../models/foodModel");

const createOrderController = async (req, res) => {
  try {
    const {
      foods,
      payment,
      deliveryAddress,
      notes,
    } = req.body;

    if (!Array.isArray(foods) || foods.length === 0 || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Foods and delivery address are required",
      });
    }

    const foodItems = await FoodModel.find({
      _id: { $in: foods },
      isAvailabe: true,
    });

    if (foodItems.length !== foods.length) {
      return res.status(400).json({
        success: false,
        message: "One or more food items are unavailable or invalid",
      });
    }

    const totalAmount = foodItems.reduce(
      (total, food) => total + food.price,
      0
    );

    if (totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total amount must be greater than zero",
      });
    }
    
    const order = await OrdersModel.create({
      foods,
      payment,
      totalAmount,
      deliveryAddress,
      notes,
      buyer: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Create Order API",
      error: error.message,
    });
  }
};

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await OrdersModel.find({}).populate("foods").populate("buyer");

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Orders List",
      totalCount: orders.length,
      orders
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Get All Orders API",
      error: error.message,
    });
  }
};

const getOrderByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrdersModel.findById(id).populate("foods").populate("buyer");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order details",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Get Order By ID API",
      error: error.message,
    });
  }
};

const updateOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    const { foods, payment, deliveryAddress, notes } = req.body;
    const updateData = {};

    if (foods !== undefined) {
      if (!Array.isArray(foods) || foods.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Foods must be a non-empty array",
        });
      }

      const foodItems = await FoodModel.find({
        _id: { $in: foods },
        isAvailabe: true,
      });

      if (foodItems.length !== foods.length) {
        return res.status(400).json({
          success: false,
          message: "One or more food items are unavailable or invalid",
        });
      }

      updateData.foods = foods;
      updateData.totalAmount = foodItems.reduce(
        (total, food) => total + food.price,
        0
      );
    }

    if (payment !== undefined) updateData.payment = payment;
    if (deliveryAddress !== undefined) updateData.deliveryAddress = deliveryAddress;
    if (notes !== undefined) updateData.notes = notes;

    const order = await OrdersModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("foods").populate("buyer");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Update Order API",
      error: error.message,
    });
  }
};

const deleteOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrdersModel.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Delete Order API",
      error: error.message,
    });
  }
};

const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    if (!orderStatus || !["preparing", "on the way", "delivered"].includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await OrdersModel.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    ).populate("foods").populate("buyer");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Update Order Status API",
      error: error.message,
    });
  }
};

module.exports = {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController,
  updateOrderStatusController,
};