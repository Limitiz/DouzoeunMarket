import express from "express";
import DBConnect from "./DBConnect.js";

const myPage = express.Router();

product.get("/myPage", (req, res) => {
  console.log(req.query.page);
  const page = (req.query.page - 1) * 5;
  const sql = `select p.idx, p.title, p.price, p.categoryID, i.imgUrl from product p, productImg i where p.idx=i.idx limit ${page}, 5`;
  DBConnect(sql, res);
});

product.get("/myPage/commnet", (req, res) => {
  console.log(req.query.page);
  const page = (req.query.page - 1) * 5;
  const sql = "selct * from commnent";
  DBConnect(sql. res);
});


export default myPage;