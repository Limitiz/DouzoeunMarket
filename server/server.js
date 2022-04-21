import cors from "cors";
import express from "express";
import ProductRouter from "./Routers/ProductRouter.js";
import LoginRouter from "./Routers/LoginRouter.js";
import MyPageRouter from "./Routers/MyPageRouter.js";
import env from "dotenv";
import db from "./models/db.js";

env.config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

//라우팅
app.use("/auth", LoginRouter);
app.use("/product", ProductRouter);
app.use("/mypage", MyPageRouter);

app.get("/category", (req, res) => {
  conn.query(
    "select p.categoryID, c.name from productRouter p, category c where p.idx=c.idx;",
    (err, rows, fields) => {
      console.log(rows);
      res.json(rows);
    }
  );
});

//db 자동 연결
db.sequelize
  .sync({ force: false }) //true이면 매번 테이블 새로 생성
  .then(() => {
    app.listen(port, () => console.log(`server is running on ${port}`));
  });
