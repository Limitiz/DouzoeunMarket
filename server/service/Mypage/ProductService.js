import Product from "../../models/Product.js";
import User from "../../models/User.js";
import ProductImg from "../../models/ProductImg.js";

const ProductService = async (req, res) => {
  const { userId } = req.params;
  const page = (req.query.page - 1) * 4;
  const data = await Product.findAll({
    include: [
      {
        model: User,
        required: false,
        where: { idx: userId },
      },
      {
        model: ProductImg,
        attributes: ["imgUrl"],
        required: true,
      },
    ],
    limit: 4,
    offset: page,
    where: { seller: userId },
  });
  res.json(data);
};

export default ProductService;
