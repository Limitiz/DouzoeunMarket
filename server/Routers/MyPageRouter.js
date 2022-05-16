import express from "express";
import upload from "../service/multer.js";
import ProductService from "../service/Mypage/ProductService.js";
import FavoriteService from "../service/Mypage/FavoriteService.js";
import OrderService from "../service/Mypage/OrderService.js";
import ImgService from "../service/Mypage/ImgService.js";
import ProfileService from "../service/Mypage/ProfileService.js";
import WithDrawService from "../service/Mypage/WithdrawService.js";
import CommentService from "../service/Mypage/CommentService.js";
import NumInfoService from "../service/Mypage/NumInfoService.js";
import NumInfoService2 from "../service/Mypage/NumInfoService2.js";
import NumInfoService3 from "../service/Mypage/NumInfoService3.js";
import NumInfoService4 from "../service/Mypage/NumInfoService4.js";

const MyPageRouter = express.Router();

MyPageRouter.get("/product/:userId", ProductService);

MyPageRouter.get("/favorite/:userId", FavoriteService);

MyPageRouter.get("/order/:userId", OrderService);

MyPageRouter.post("/img/:userId", upload.single("profileImg"), ImgService);

MyPageRouter.get("/profile/:userId", ProfileService);

MyPageRouter.get(
  "/num/:userId",
  NumInfoService,
  NumInfoService2,
  NumInfoService3,
  NumInfoService4
);

MyPageRouter.get("/comments/:userId", CommentService);

MyPageRouter.delete("/withdraw/:userId", WithDrawService);

export default MyPageRouter;
