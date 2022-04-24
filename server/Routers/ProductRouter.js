import express from "express";
import Product from "../models/Product.js";
import ProductImg from "../models/ProductImg.js";
import Favorite from "../models/Favorite.js";
import Category from "../models/Category.js";
import Common from "../models/Common.js";
import { Op } from "sequelize";
import User from "../models/User.js";

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
  });
  res.json(data);
});

productRouter.get(
  "/detail/:id",
  async (req, res, next) => {
    const { id } = req.params;
    const data = await Product.findOne({
      attributes: ["title", "price", "locationX", "locationY", "content"],
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
    console.log(data);
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

productRouter.get(
  "/pay/:id/:email",
  async (req, res, next) => {
    //항목 리스트 부르기
    //회원정보 부르기
    //상품정보 부르기
    const { id } = req.params;
    const { email } = req.params;
    console.log(id);
    console.log(email);
    const list = await Common.findAll({
      where: {
        paysort: { [Op.lte]: 5 },
      },
      order: [["paysort", "ASC"]],
    });
    req.list = list;
    req.id = id;
    req.email = email;
    next();
  },
  async (req, res, next) => {
    const user = await User.findOne({
      where: { email: req.email },
    });
    req.user = user;
    next();
  },
  async (req, res) => {
    const prod = await Product.findOne({
      include: [
        {
          model: ProductImg,
          attributes: ["imgUrl"],
          required: true,
        },
      ],
      where: { idx: req.id },
    });
    const user = req.user;
    const list = req.list;
    res.send([list, user, prod]);
  }
);

export default productRouter;
