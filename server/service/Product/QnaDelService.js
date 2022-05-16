import QnA from "../../models/QnA.js";

const QnaDelService = async (req, res) => {
  const { idx } = req.params;
  await QnA.destroy({
    where: { idx: idx },
  });
  res.send(idx);
};
export default QnaDelService;
