const {model, Schema} = require("mongoose");

const product = new Schema({
    user:{
        type:Schema.types.ObjectId,
        ref:"User",
    },
    review:{
        type:String,
    },
    rating:Number,

})

const ProductModel = model("Product", product);

module.exports = ProductModel;