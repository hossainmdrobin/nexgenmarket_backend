const OrderModel = require("../../models/shop/order");
const { fail, success } = require("../../utils/responseFormatter")

exports.createOrder = async(req, res, next) => {
    try{
        req.body.user = req.user._id;
        const order = await OrderModel.create(req.body);        
        res.status(200).json(success("Order Placed", order));
    }catch(e){
        res.status(500).json(fail(e.message));
    }
}

exports.getAllOrders = async(req, res, next) => {
    try{
        const orders = await OrderModel.find().sort({"createdAt":-1})
        .skip((_page - 1) * _limit) // Skip the documents on previous pages
        .limit(_limit);
      const total = await OrderModel.countDocuments();
      res.status(200).json(success("Getting", {orders,total}));

    }catch(e){
        res.status(500).json(fail(e.message));
    }
}

exports.getCustomerOrders = async(req, res, next) => {
    try{
        const orders = await OrderModel.find({user:req.user._id}).sort({"createdAt":-1})
        .skip((_page - 1) * _limit) // Skip the documents on previous pages
        .limit(_limit);
      const total = await OrderModel.countDocuments();
      res.status(200).json(success("Getting", {orders,total}));

    }catch(e){
        res.status(500).json(fail(e.message));
    }
}

exports.cancelOrder = async(req, res, next) => {
    const {orderId} = req.params;
    try{
        const order = await OrderModel.findByIdAndUpdate(orderId, {status:"cancelled"});
        res.status(200).json(success("Order Placed", order));        
    }catch(e){
        return res.status(500).json(fail(e.message));
    }
}

