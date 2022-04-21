import express from "express";
import Product from "../models/Product.js";
import ProductImg from "../models/ProductImg.js";
import Favorite from "../models/Favorite.js";
import Category from "../models/Category.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  console.log(req.query.page);
  const page = (req.query.page - 1) * 4
    const data = await Product.findAll({
        include:[
            {
                model:ProductImg,
                attributes:['imgUrl'],
                required:true
            }
        ],
        limit:4,
        offset: page,
    });
  res.json(data);
});

// localhost:8000/productRouter/3/man
/**
 * productRouter.get("/:id/:gender", (req, res) => {
    const { id, gender } = req.params;
 *
 *
 */

// get("id") -> localhost:8000/productRouter/id로만 접근
productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Product.findOne({
        include: [
            {
                model: ProductImg,
                attributes: ["imgUrl"],
                required: true,
            },
            {
                model: Category,
                attributes: ["name"],
                required: true,
            },
        ],
        where: { idx: id },
    });
    res.json(data);
});

// productRouter.post("/postid", (req, res) => {
//   console.log(req.body.idx);
//   const id = req.body.idx;
//
//   Favorite.create({
//       productId : id,
//       userId : 1
//   });
// });
export default productRouter;
