const { model, Schema } = require("mongoose");

const order = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },  
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number },
    },
  ],
  totalPrice: Number,
  discount: Number, // discount in currency
  phone:String,
  billingAddress: {
    division:String,
    district:String,
    subdistrict:String,
    union:String,
    unionNo:Number,
    address:String,
    landmark:String
  },
  shippingAddress:{
    division:String,
    district:String,
    subdistrict:String,
    union:String,
    unionNo:Number,
    address:String,
    landmark:String
  },
  status:String // enum:cancelled,

  
  
},{timestamps:true,timeseries:true});

const OrderModel = model("Order", order);

module.exports = OrderModel;
