import express from "express";
import fs from "fs";
import mysql from "mysql";

const product = express.Router();

const data = fs.readFileSync("./database.json");

const conf = JSON.parse(data);
//db 접속
const conn = mysql.createConnection(
  {
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,

    database: conf.database,
  },
  function (err, conn) {
    if (err) {
      console.log("접속실패 : ", err);
      return;
    }
    console.log("connect success");
  }
);

conn.connect();

product.get("/", (req, res) => {
  console.log(req.query.page);
  const page = (req.query.page - 1) * 5;

  conn.query(
    `select p.idx, p.title, p.price, p.categoryID, i.imgUrl from product p, productImg i where p.idx=i.idx limit ${page}, 5`,
    (err, rows, fields) => {
      res.json(rows);
    }
  );
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

  conn.query(
    `select p.idx, p.title, p.price, p.content, c.name, i.imgUrl from product p, productImg i, category c where p.idx=i.idx AND p.categoryID=c.idx AND p.idx = ${id}  `,
    (err, rows, fields) => {
      res.json(rows);
    }
  );
});

export default product;