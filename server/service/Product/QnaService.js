import QnA from "../../models/QnA.js";

const QnaService = async (req, res) => {
  const data = await QnA.create({
    productId: req.body.idx,
    content: req.body.qnacontent,
    writer: req.body.writer,
  });
  res.json(data);
};
export default QnaService;
