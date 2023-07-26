const { fail, success } = require("../../utils/responseFormatter");
const ProductModel = require("./../../models/shop/product");
exports.addProducts = async (req, res, next) => {
  try {
    req.body.vendor = req.user._id;
    req.body.photos = req.files.image;
    const product = await ProductModel.create(req.body);
    return res.status(200).json(success("Product Uploaded", product));
  } catch (e) {
    res.status(500).json(fail(e.message));
  }
};

exports.getLatestProducts = async (req, res, next) => {
  const { _limit, _page, _keyword } = req.query;
  const find = _keyword
    ? {
        $or: [
          { name: { $regex: new RegExp(_keyword, "i") } },
          { category: { $regex: new RegExp(_keyword, "i") } },
          { subcategory: { $regex: new RegExp(_keyword, "i") } },
        ],
      }
    : {};    
  try {
    const products = await ProductModel.find(find).sort({"createdAt":-1})
      .skip((_page - 1) * _limit) // Skip the documents on previous pages
      .limit(_limit);
    const total = await ProductModel.countDocuments();

    return res
      .status(200)
      .json(success("Getting product", { total, products }));
  } catch (e) {
    return res.status(500).json(fail(e.message));
  }
};

exports.getMyProducts = async (req, res, next) => {
  const { _limit, _page, _keyword } = req.query;
  const find = _keyword
    ? {
        $or: [
          { name: { $regex: new RegExp(_keyword, "i") } },
          { category: { $regex: new RegExp(_keyword, "i") } },
          { subcategory: { $regex: new RegExp(_keyword, "i") } },
        ],
        vendor: req.user._id,
      }
    : { vendor: req.user._id };

  try {
    const products = await ProductModel.find(find)
      .skip((_page - 1) * _limit) // Skip the documents on previous pages
      .limit(_limit);
    const total = await ProductModel.countDocuments();

    return res
      .status(200)
      .json(success("Getting product", { total, products }));
  } catch (e) {
    return res.status(500).json(fail(e.message));
  }
};

exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await ProductModel.findByIdAndUpdate(productId, {
      $set: req.body,
    },{new:true});
    return res
      .status(200)
      .json(success("Product updated",  product ));
  } catch (e) {
    return res.status(500).json(fail(e.message));
  }
};

exports.deleteProduct = async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await ProductModel.findByIdAndDelete(productId);
      return res
        .status(200)
        .json(success("Product deleted",  product ));
    } catch (e) {
      return res.status(500).json(fail(e.message));
    }
  };
