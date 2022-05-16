import ProductImg from "../../models/ProductImg.js";
import Product from "../../models/Product.js";

const RootService = async (req, res) => {
  console.log(req.query.page);
  const page = (req.query.page - 1) * 4;
  const data = await Product.findAll({
    include: [
      {
        model: ProductImg,
        attributes: ["imgUrl"],
        required: true,
      },
    ],
    limit: 4,
    offset: page,
    order: [["updatedAt", "DESC"]],
  });

  res.json(data);
};
export default RootService;
