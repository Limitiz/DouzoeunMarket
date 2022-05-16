import Comment from "../../models/Comment.js";

const NumInfoService3 = async (req, res, next) => {
  const tmp = req.data;
  const { userId } = req.params;
  const cNum = await Comment.findAndCountAll({
    where: { receiver: userId },
  });
  req.data = [tmp[0], tmp[1], cNum.count];
  next();
};
export default NumInfoService3;
