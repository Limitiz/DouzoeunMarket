import express from "express";
import DBConnect from "./DBConnect.js";

const product = express.Router();

product.get("/", (req, res) => {
  console.log(req.query.page);
  const page = (req.query.page - 1) * 5;
  const sql = `select p.idx, p.title, p.price, p.categoryID, i.imgUrl from product p, productImg i where p.idx=i.idx limit ${page}, 5`;
  
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
product.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  const sql = `select p.idx, p.title, p.price, p.categoryID, i.imgUrl from product p, productImg i where p.idx=i.idx AND p.idx = ${id}`;
  DBConnect(sql, res);
});

export default product;