import express from "express";
import DBConnect from "./DBConnect.js";

const MainRouter = express.Router();

MainRouter.get("/", (req, res) => {
  const sql =
    "select p.idx, p.title, p.price, i.imgUrl from product p, productImg i where p.idx=i.idx";
  // DBConnect(sql, res);
});

export default MainRouter;
