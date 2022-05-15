import Product from "../../models/Product.js";
import User from "../../models/User.js";
import ProductImg from "../../models/ProductImg.js";
import Favorite from "../../models/Favorite.js";

const FavoriteService = async (req, res) => {
  const { userId } = req.params;
  const page = (req.query.page - 1) * 4;
  const data = await Favorite.findAll({
    include: [
      {
        model: User,
        required: true,
        where: { idx: userId },
      },
      {
        model: Product,
        attributes: ["idx", "title", "price"],
        required: true,
      },
      {
        model: ProductImg,
        attributes: ["imgUrl"],
        required: true,
      },
    ],
    limit: 4,
    offset: page,
  });
  res.json(data);
};

export default FavoriteService;
