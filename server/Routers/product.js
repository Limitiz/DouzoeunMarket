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
  // conn.query(
  //   `select p.idx, p.title, p.price, p.content, c.name, i.imgUrl from product p, productImg i, category c where p.idx=i.idx AND p.categoryID=c.idx AND p.idx = ${id}`,
  //   (err, rows, fields) => {
  //     res.json(rows);
  //   }
  // );
});

product.post("/postid", (req, res) => {
  console.log(req.body.idx);
  const id = req.body.idx;

  Favorite.create({
    productId: id,
    userId: 1,
  });
});

export default product;
