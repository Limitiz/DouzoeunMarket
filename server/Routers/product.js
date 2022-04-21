import express from "express";
import mysql from "mysql";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import ProductImg from "../models/ProductImg.js";
import Favorite from "../models/Favorite.js";

const product = express.Router();

product.get("/", async (req, res) => {
  const page = (req.query.page - 1) * 4;
  console.log(page);
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

  console.log(req.query.page);
  res.json(data);
});

// localhost:8000/product/3/man
/**
 * product.get("/:id/:gender", (req, res) => {
    const { id, gender } = req.params;
 *
 *
 */

// get("id") -> localhost:8000/product/id로만 접근
product.get("/:id", async (req, res) => {
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
  res.send(data);
});

product.post("/postid", async (req, res) => {
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
      imgId: pid,
    });
    return "danger";
  } else {
    Favorite.destroy({ where: { productId: pid } });
    return "secondary";
  }
}

export default product;
