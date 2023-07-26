const { model, Schema } = require("mongoose");

const product = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  name: {
    type: String,
  },
  photos:[{
    path:String,
  }],
  category:String,
  subcategory:String,
  stock:Number,
  description: {
    type: String,
  },
  price: Number,
  discount: Number,
  reviews: [
    {
      type:Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const ProductModel = model("Product", product);

module.exports = ProductModel;
