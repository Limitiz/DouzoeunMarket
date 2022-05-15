import express from "express";

import RootService from "../service/Product/RootService.js";
import SearchService from "../service/Product/SearchService.js";
import DetailService from "../service/Product/DetailService.js";
import DetailService2 from "../service/Product/DetailSevice2.js";
import LikeService from "../service/Product/LikeService.js";
import QnaService from "../service/Product/QnaService.js";
import QnaService2 from "../service/Product/QnaService2.js";
import QnaDelService from "../service/Product/QnaDelService.js";
import FavoriteService from "../service/Product/FavoriteService.js";
import PayService from "../service/Product/PayService.js";
import PayService2 from "../service/Product/PayService2.js";
import PayService3 from "../service/Product/PayService3.js";
import CommentService from "../service/Product/CommentService.js";
import CommentService2 from "../service/Product/CommentService2.js";
import CommentService3 from "../service/Product/CommentService3.js";

const productRouter = express.Router();

productRouter.get("/", RootService);

productRouter.get("/search/:title", SearchService);

productRouter.post("/detail", DetailService, DetailService2);
productRouter.post("/detail/postid", LikeService);

productRouter.post("/detail/qna/:id", QnaService);

productRouter.get("/detail/qna/:id", QnaService2);

productRouter.delete("/detail/qna/:idx", QnaDelService);

productRouter.post("/favorite", FavoriteService);
productRouter.get("/pay/:id/:email", PayService, PayService2, PayService3);

productRouter.post(
  "/comment",
  CommentService,
  CommentService2,
  CommentService3
);

export default productRouter;
