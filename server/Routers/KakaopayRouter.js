import express from "express";
import KakaopayService from "../service/pay/KakaopayService.js";
import KakaopaySuccessService from "../service/pay/KakaopaySuccessService.js";

const KakaopayRouter = express.Router();

KakaopayRouter.post("/", KakaopayService);
KakaopayRouter.post("/success", KakaopaySuccessService);

export default KakaopayRouter;
