const { createOrder } = require("../../controller/shop/orderController");
const { isAuth } = require("../../middleware/checkAuth");
const { isMyOrder } = require("../../middleware/shop/order");

const router = require("express").Router();

router.post("/create", isAuth, createOrder);
router.post("/cancel/:orderId",isMyOrder, isAuth,)

module.exports = router;