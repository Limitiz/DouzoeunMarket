import cors from "cors";
import express from "express";
import MainRouter from "./Routers/MainRouter.js";
import product from "./Routers/product.js";
import LoginRouter from "./Routers/LoginRouter.js";
import env from "dotenv";

env.config();

const app = express();
const port = process.env.PORT || 8000;


//라우팅
app.use("/auth", LoginRouter);
app.use("/main", MainRouter);


app.use(express.json());
app.use(cors());

app.use("/login", MainRouter);
app.use("/product", product);


//db 연결
var sequelize = require('./models').sequelize; //mysql 시퀄라이저 모델
sequelize.sync(); //서버가 실행될때 시퀄라이저의 스키마를 DB에 적용


app.get("/category", (req, res) => {
  conn.query(
    "select p.categoryID, c.name from product p, category c where p.idx=c.idx;",
    (err, rows, fields) => {
      console.log(rows);
      res.json(rows);
    }
  );
});

app.listen(port, () => console.log(`server is running on ${port}`));
