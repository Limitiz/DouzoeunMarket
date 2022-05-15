import Order from "../../models/Order.js";
import User from "../../models/User.js";
import ProductImg from "../../models/ProductImg.js";
import Product from "../../models/Product.js";
const OrderService = async (req, res) => {
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
      {
        model: Order,
        required: true,
        where: { buyer: userId },
      },
    ],
    limit: 4,
    offset: page,
  });
  res.json(data);
};
export default OrderService;
