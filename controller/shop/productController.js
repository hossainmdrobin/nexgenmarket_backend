const { fail, success } = require("../../utils/responseFormatter")

exports.addProducts = async(req, res, next) => {
    try{
        req.body.user = req.member._id;
        const product =await ProductModel.create(req.body);
        return res.status(200).json(success("Product Uploaded", product));

    }catch(e){
        res.status(500).json(fail(e.message))
    }
}