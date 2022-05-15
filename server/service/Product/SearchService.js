import Product from "../../models/Product.js";
import ProductImg from "../../models/ProductImg.js";
import { Op } from "sequelize";

const SearchService = async (req, res) => {
  const { title } = req.params;
  const data = await Product.findAll({
    include: [{ model: ProductImg, required: true }],
    where: {
      title: {
        [Op.like]: "%" + title + "%",
      },
    },
  });
  res.json(data);
};

export default SearchService;
