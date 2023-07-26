const { model, Schema } = require("mongoose");

const product = new Schema({
  user: {
    type: Schema.types.ObjectId,
    ref: "User",
  },  
  products: [
    {
      product: { type: Schema.types.ObjectId, ref: "Product" },
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
  }

  
  
});

const ProductModel = model("Product", product);

module.exports = ProductModel;
