import Order from "../../models/Order.js";

const NumInfoService4 = async (req, res, next) => {
  const tmp = req.data;
  const { userId } = req.params;
  const oNum = await Order.findAndCountAll({
    where: { buyer: userId },
  });
  res.json([tmp[0], tmp[1], tmp[2], oNum.count]);
};

export default NumInfoService4;
