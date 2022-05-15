import ProductImg from "../../models/ProductImg.js";

const ProductFormService2 = async (req, res) => {
  const idx = req.data;
  console.log(req.files);
  req.files.map(async (data) => {
    console.log(data);
    await ProductImg.create({
      imgUrl: data.filename,
      productId: idx,
    });
  });

  res.redirect(process.env.CLIENT_URL_PORT);
};

export default ProductFormService2;
