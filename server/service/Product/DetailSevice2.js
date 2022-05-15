import Common from "../../models/Common.js";
import { Op } from "sequelize";

const DetailService2 = async (req, res) => {
  const detailValue = req.data;
  const data = await Common.findAll({
    attributes: ["Column", "prod_sort"],
    where: { prod_sort: { [Op.lte]: 4 } },
    order: [["prod_sort", "ASC"]],
  });
  res.send([data, detailValue]);
};
export default DetailService2;
