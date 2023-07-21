const router = require("express").Router();

router.get("/products",(req, res, next)=>{
    return res.send("Hello world");
})

module.exports = router;