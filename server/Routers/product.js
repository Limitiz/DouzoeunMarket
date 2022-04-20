import express from "express";
import mysql from "mysql";
import Product from "../models/Product.js";
import ProductImg from "../models/ProductImg.js";

const product = express.Router();

product.get("/", (req, res) => {
  console.log(req.query.page);
  const page = (req.query.page - 1) * 4;
  res.json(data);
});
const data = await Product.findAll({
  include:[
    {
      model:ProductImg,
      attributes:['imgUrl'],
      required:true
    }
  ]
});

// localhost:8000/product/3/man
/**
 * product.get("/:id/:gender", (req, res) => {
    const { id, gender } = req.params;
 *
 *
 */

// get("id") -> localhost:8000/product/id로만 접근
product.get("/:id", (req, res) => {
  const { id } = req.params;
  conn.query(
      `select p.idx, p.title, p.price, p.content, c.name, i.imgUrl from product p, productImg i, category c where p.idx=i.idx AND p.categoryID=c.idx AND p.idx = ${id}`,
      (err, rows, fields) => {
        res.json(rows);
      }
  );
});

product.post("/postid", (req, res) => {
  console.log(req.body.idx);
  const id = req.body.idx;
  conn.query(
      `insert into favorite(productId, userId) values(${id},1)`,
      function (err, rows, fields) {
        if (err) {
          console.log(err);
        }
      }
  );
});

product.post("/postid", (req, res) => {
  console.log(req.body.idx);
  const id = req.body.idx;
  conn.query(
    `insert into favorite(productId, userId) values(${id},1)`,
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
});

export default product;
