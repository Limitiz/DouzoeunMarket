import Product from "../../models/Product.js";

const ProductFormService = async (req, res, next) => {
  const title = req.body.title;
  const category = req.body.category;
  const address = req.body.address;
  const productStatus = req.body.productStatus;
  const exchange = req.body.exchange;
  const price = req.body.price;
  const shippingIncluded = req.body.shippingIncluded;
  const content = req.body.content;
  const seller = req.body.seller;

  const data = await Product.create({
    title: title,
    categoryId: category,
    address: address,
    productStatus: productStatus,
    exchange: exchange,
    price: price,
    shippingIncluded: shippingIncluded,
    content: content,
    seller: seller,
  });

  req.data = data.idx;
  next();
};
export default ProductFormService;
