const { model, Schema } = require("mongoose");

const product = new Schema({
  vendor: {
    type: Schema.types.ObjectId,
    ref:"User"
  },
  name: {
    type: String,
  },
  photos:[{
    image:String,
  }],
  description: {
    type: String,
  },
  price: Number,
  discount: Number,
  reviews: [
    {
      type: Schema.types.ObjectId,
      ref: "Review",
    },
  ],
});

const ProductModel = model("Product", product);

module.exports = ProductModel;
