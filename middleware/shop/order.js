const OrderModel = require("../../models/shop/order");
const { fail } = require("../../utils/responseFormatter")

exports.isMyOrder = async(req, res, next)=> {
    const {orderId} = req.params;
    try{
        const order = await OrderModel.findOne({_id:orderId, user:req.user._id})
        if(order){
            return next();
        }else{
            res.status(400).json(fail("You are unauthorized to make change here",400));
        }
    }catch(e){
        return res.status(500).json(fail(e.message));
    }
}