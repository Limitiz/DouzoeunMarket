import Favorite from "../../models/Favorite.js";
import ProductImg from "../../models/ProductImg.js";

const LikeService = async (req, res) => {
  const userId = req.body.userId;
  const id = req.body.idx;
  res.send(await createOrDelete(id, userId));
};

async function createOrDelete(pid, uid) {
  const isExist = await Favorite.findOne({
    where: { userId: uid, productId: pid },
  });
  if (!isExist) {
    const data = await Favorite.create({
      productId: pid,
      userId: uid,
    });
    console.log(data.dataValues.idx);
    console.log(pid);
    await ProductImg.update(
      {
        favoriteId: data.dataValues.idx,
      },
      {
        where: { productId: pid },
      }
    );
    return "like";
  } else {
    Favorite.destroy({ where: { productId: pid, userId: uid } });
    return "unlike";
  }
}

export default LikeService;
