const router = require("express").Router();
const productRoute = require("./shop/productRoutes");
const userRoute = require("./user/userRouter");

router.use("/product", productRoute);
router.use("/user", userRoute);

module.exports = router;
