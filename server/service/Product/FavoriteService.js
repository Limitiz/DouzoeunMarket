import Favorite from "../../models/Favorite.js";

const FavoriteService = async (req, res) => {
  const id = req.body.id;
  const like = await Favorite.findAndCountAll({
    attributes: ["productId"],
    where: { productId: id },
  });
  res.json(like.count);
};
export default FavoriteService;
