import Comment from "../../models/Comment.js";
import Product from "../../models/Product.js";

const CommentService = async (req, res) => {
  const { userId } = req.params;
  const data = await Comment.findAll({
    include: [
      {
        model: Product,
        required: true,
      },
    ],
    where: { receiver: userId },
  });
  res.json(data);
};

export default CommentService;
