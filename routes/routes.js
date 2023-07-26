const router = require("express").Router();
const productRoute = require("./shop/productRoutes");
const userRoute = require("./user/userRouter");
const orderRoute = require("./shop/orderRoute");


router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/order",orderRoute)
module.exports = router;
