import User from "../../models/User.js";
import Favorite from "../../models/Favorite.js";

const NumInfoService2 = async (req, res, next) => {
  const tmp = req.data;
  const { userId } = req.params;
  const fNum = await Favorite.findAndCountAll({
    include: [
      {
        model: User,
        required: true,
        where: { idx: userId },
      },
    ],
  });

  console.log("++++++++FFFF" + JSON.stringify(fNum.rows));
  req.data = [tmp, fNum.count];
  next();
};
export default NumInfoService2;
