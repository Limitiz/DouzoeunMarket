import Product from "../../models/Product.js";
import ProductImg from "../../models/ProductImg.js";
import User from "../../models/User.js";
const PayService3 = async (req, res) => {
  const prod = await Product.findOne({
    include: [
      {
        model: ProductImg,
        attributes: ["imgUrl"],
        required: true,
      },
      {
        model: User,
        required: false,
        attributes: ["nickName"],
      },
    ],
    where: { idx: req.id },
  });
  const user = req.user;
  const list = req.list;
  res.send([list, user, prod]);
};
export default PayService3;
