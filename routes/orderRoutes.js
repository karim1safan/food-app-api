const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createOrderController, getAllOrdersController, getOrderByIdController, updateOrderController, deleteOrderController, updateOrderStatusController } = require("../controllers/orderController");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const router = express.Router();

/**
 * @description Create a new order
 * @method POST
 * @route /api/v1/order/create
 * @access Private
 */
router.post("/createOrder", authMiddleware, createOrderController);


/**
 * @description Get all orders for the authenticated user
 * @method GET
 * @route /api/v1/order/getAllOrders
 * @access Private
 */
router.get("/getAllOrders", authMiddleware, getAllOrdersController);

/**
 * @description Get an order by ID
 * @method GET
 * @route /api/v1/order/getOrder/:id
 * @access Private
 */
router.get("/getOrder/:id", authMiddleware, getOrderByIdController);
/**
 * @description Update an order
 * @method PUT
 * @route /api/v1/order/updateOrder/:id
 * @access Private
 */
router.put("/updateOrder/:id", authMiddleware, updateOrderController);

/**
 * @description Delete an order
 * @method DELETE
 * @route /api/v1/order/deleteOrder/:id
 * @access Private
 */
router.delete("/deleteOrder/:id", authMiddleware, deleteOrderController);

/**
 * @description Update an order's status
 * @method POST
 * @route /api/v1/order/admin/order/status/:id
 * @access Private
 */
router.post("/admin/order/status/:id", adminMiddleware, authMiddleware, updateOrderStatusController);

module.exports = router;