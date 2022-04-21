import express from "express";
import fs from "fs";
import mysql from "mysql";
import DBConnect from "./DBConnect.js";

const product = express.Router();

product.get("/", (req, res) => {
  console.log(req.query.page);
  const page = (req.query.page - 1) * 5;

  const sql = `select p.idx, p.title, p.price, p.categoryID, i.imgUrl from product p, productImg i where p.idx=i.idx limit ${page}, 5`;
  DBConnect(sql, res);
});

product.get("/pay", (req, res, next) => {
  const isTrue = req.isAuthenticated();
  console.log(isTrue); //undefined  //true
  const sql = "select * from common where paysort <= 5 order by 3";
  DBConnect(sql, res);
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
