const { addProducts } = require("../../controller/shop/productController");
const { isAuth } = require("../../middleware/checkAuth");

const router = require("express").Router();

router.post("/add",isAuth, addProducts);

module.exports = router;