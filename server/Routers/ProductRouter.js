import express from "express";
import Product from "../models/Product.js";
import ProductImg from "../models/ProductImg.js";
import Favorite from "../models/Favorite.js";
import Category from "../models/Category.js";
import Common from "../models/Common.js";
import QnA from "../models/Qna.js";
import { Op } from "sequelize";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Comment from "../models/Comment.js";
import sequelize from "../models/sq.js";

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

productRouter.get("/search/:title", async (req, res) => {
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
});

productRouter.post(
  "/detail",
  async (req, res, next) => {
    const id = req.body.id;
    const userId = req.body.userId;
    //const userId = req.params.userId;

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
        {
          model: User,
          required: false,
          attributes: ["nickName", "idx"],
        },
        {
          model: Favorite,
          required: false,
          where: { userId: userId },
        },
        {
          model: Order,
          required: false,
        },
      ],
      where: { idx: id },
    });
    req.data = data;
    console.log(data);
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
  const userId = req.body.userId;
  const id = req.body.idx;
  res.send(await createOrDelete(id, userId));
});

async function createOrDelete(pid, uid) {
  const isExist = await Favorite.findOne({
    where: { userId: uid, productId: pid },
  });
  if (!isExist) {
    const data = await Favorite.create({
      productId: pid,
      userId: uid,
    });
    console.log(data.dataValues.idx);
    console.log(pid);
    await ProductImg.update(
      {
        favoriteId: data.dataValues.idx,
      },
      {
        where: { productId: pid },
      }
    );
    return "like";
  } else {
    Favorite.destroy({ where: { productId: pid, userId: uid } });
    return "unlike";
  }
}

productRouter.post("/detail/qna/:id", async (req, res) => {
  const data = await QnA.create({
    productId: req.body.idx,
    content: req.body.qnacontent,
    writer: req.body.writer,
  });
  res.json(data);
});

productRouter.get("/detail/qna/:id", async (req, res) => {
  const { id } = req.params;
  const data = await QnA.findAll({
    attributes: ["writer", "productId", "idx", "content"],
    where: { productId: id },
  });
  res.json(data);
});

productRouter.delete("/detail/qna/:idx", async (req, res) => {
  const { idx } = req.params;
  await QnA.destroy({
    where: { idx: idx },
  });
  res.send(idx);
});
productRouter.post("/favorite", async (req, res) => {
  const id = req.body.id;
  const like = await Favorite.findAndCountAll({
    attributes: ["productId"],
    where: { productId: id },
  });
  res.json(like.count);
});
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
        {
          model: User,
          required: false,
          attributes: ["nickName"],
        },
      ],
      where: { idx: req.id },
    });
    const user = req.user;
    const list = req.list;
    res.send([list, user, prod]);
  }
);

productRouter.post("/comment", async (req, res,next) => {
  const receiver = req.body.receiver;

  const data = await Comment.create({
    content : req.body.content,
    productId : req.body.id,
    rate : req.body.rate,
    writer : req.body.writer,
    receiver : receiver
  });
  req.data = receiver;
  next();
},
    async (req, res, next) => {
      const tmp = req.data;

      const data = await Comment.findOne({
      attributes : [[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('rate')), 1), 'avg']],
      where : {receiver : req.data}
    });
      req.data = [data.dataValues.avg, tmp];
      next();
},
    async (req, res) => {
      const tmp = req.data;

      await User.update(
          {rate : tmp[0]},
      {where : {idx : tmp[1]}
      });
});

export default productRouter;
