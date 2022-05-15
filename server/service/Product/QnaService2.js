import QnA from "../../models/QnA.js";

const QnaService2 = async (req, res) => {
  const { id } = req.params;
  const data = await QnA.findAll({
    attributes: ["writer", "productId", "idx", "content"],
    where: { productId: id },
  });
  res.json(data);
};
export default QnaService2;
