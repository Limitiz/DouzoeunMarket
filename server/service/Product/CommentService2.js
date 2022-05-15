import Comment from "../../models/Comment.js";
import sequelize from "../../models/sq.js";
const CommentService2 = async (req, res, next) => {
  const tmp = req.data;

  const data = await Comment.findOne({
    attributes: [
      [
        sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("rate")), 1),
        "avg",
      ],
    ],
    where: { receiver: req.data },
  });

  req.data = [data.dataValues.avg, tmp];
  next();
};
export default CommentService2;
