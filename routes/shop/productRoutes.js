const { addProducts, getMyProducts, getLatestProducts, updateProduct, deleteProduct } = require("../../controller/shop/productController");
const { isAuth } = require("../../middleware/checkAuth");
const { isMyProduct } = require("../../middleware/shop/product");
const upload = require("./../../middleware/multer")

const router = require("express").Router();

router.post("/add",isAuth,upload("photos").fields([{ name: "image", maxCount: 3,quality:60}]), addProducts);
router.put("/:productId",isAuth,isMyProduct, updateProduct);
router.delete("/:productId", isAuth, isMyProduct, deleteProduct);
router.get("/latest",getLatestProducts);
router.get("/my_products", isAuth, getMyProducts);

module.exports = router;