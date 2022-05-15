import Product from "../../models/Product.js";
import ProductImg from "../../models/ProductImg.js";
import Category from "../../models/Category.js";
import User from "../../models/User.js";
import Favorite from "../../models/Favorite.js";
import Order from "../../models/Order.js";

const DetailService = async (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  //const userId = req.params.userId;

  const data = await Product.findOne({
    include: [
      {
        model: ProductImg,
        attributes: ["imgUrl"],
        required: true,
      },
      {
        model: Category,
        attributes: ["name"],
        required: true,
      },
      {
        model: User,
        required: false,
        attributes: ["nickName", "idx"],
      },
      {
        model: Favorite,
        required: false,
        where: { userId: userId },
      },
      {
        model: Order,
        required: false,
      },
    ],
    where: { idx: id },
  });
  req.data = data;
  console.log(data);
  next();
};

export default DetailService;
