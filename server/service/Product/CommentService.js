import Comment from "../../models/Comment.js";

const CommentService = async (req, res, next) => {
  const receiver = req.body.receiver;

  const data = await Comment.create({
    content: req.body.content,
    productId: req.body.id,
    rate: req.body.rate,
    writer: req.body.writer,
    receiver: receiver,
  });
  req.data = receiver;
  next();
};

export default CommentService;
