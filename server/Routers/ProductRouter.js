import express from "express";
import Product from "../models/Product.js";
import ProductImg from "../models/ProductImg.js";
import Favorite from "../models/Favorite.js";
import Category from "../models/Category.js";
import Common from "../models/Common.js";
import QnA from "../models/Qna.js";
import { Op } from "sequelize";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
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
    order: [["updatedAt", "ASC"]],
  });

  res.json(data);
});

productRouter.get(
  "/detail/:id",
  async (req, res, next) => {
    const { id } = req.params;
    const data = await Product.findOne({
      attributes: [
        "title",
        "price",
        "locationX",
        "locationY",
        "content",
        "productStatus",
        "exchange",
        "shippingincluded",
        "address",
      ],
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
        {
          model: Favorite,
          required: false,
        },
      ],
      where: { idx: id },
    });
    console.log(data);
    req.data = data;
    next();
  },
  async (req, res) => {
    const detailValue = req.data;
    const data = await Common.findAll({
      attributes: ["Column", "prod_sort"],
      where: { prod_sort: { [Op.lte]: 4 } },
      order: [["prod_sort", "ASC"]],
    });
    res.send([data, detailValue]);
  }
);

productRouter.post("/detail/postid", async (req, res) => {
  console.log(req.body.idx);
  const id = req.body.idx;
  res.send(await createOrDelete(id, 1));
});

async function createOrDelete(pid, uid) {
  const isExist = await Favorite.findOne({ where: { productId: pid } });
  if (!isExist) {
    Favorite.create({
      productId: pid,
      userId: uid,
    });
    return "danger";
  } else {
    Favorite.destroy({ where: { productId: pid } });
    return "secondary";
  }
}

productRouter.post("/detail/qna/:id", async (req, res) => {
  console.log(req.body);
  const data = await QnA.create({
    productId: req.body.idx,
    content: req.body.qnacontent,
    writer: 1,
  });
  res.json(data);
});

productRouter.get("/detail/qna/:id", async (req, res) => {
  const { id } = req.params;
  const data = await QnA.findAll({
    where: { productId: id },
  });
  res.json(data);
});

productRouter.delete("/detail/qna/:idx", async (req, res) => {
  const { idx } = req.params;
  console.log("HERE!!!!!!!!");
  console.log(idx);
  await QnA.destroy({
    where: { idx: idx },
  });
  res.send(idx);
});

productRouter.get("/pay", async (req, res, next) => {
  const isTrue = req.isAuthenticated();
  console.log(isTrue); //undefined  //true
  res.json(
    await Common.findAll({
      where: {
        paysort: { [Op.lte]: 5 },
      },
      order: [["paysort", "ASC"]],
    })
  );
});

export default productRouter;
