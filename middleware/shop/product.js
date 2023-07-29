const ProductModel = require("../../models/shop/product");
const { fail } = require("../../utils/responseFormatter")

exports.isMyProduct = async(req, res, next) => {
    const {productId} = req.params;
    try{
        const product = await ProductModel({_id:productId, vendor:req.user._id});
        if(product){
            return next()
        }else{
            res.status(400).json(fail("You are unauthorized to make change here",400));
        }
    }catch(e){
        res.status(500).json(fail(e.message));
    }
}