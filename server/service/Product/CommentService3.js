import User from "../../models/User.js";

const CommentService3 = async (req, res) => {
  const tmp = req.data;
  await User.update({ rate: tmp[0] }, { where: { idx: tmp[1] } });
};
export default CommentService3;
