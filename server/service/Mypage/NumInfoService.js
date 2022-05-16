import User from "../../models/User.js";
import Product from "../../models/Product.js";

const NumInfoService = async (req, res, next) => {
  const { userId } = req.params;
  const pNum = await Product.findAndCountAll({
    include: [
      {
        model: User,
        required: false,
        where: { idx: userId },
      },
    ],
    where: { seller: userId },
  });
  req.data = pNum.count;
  next();
};
export default NumInfoService;
