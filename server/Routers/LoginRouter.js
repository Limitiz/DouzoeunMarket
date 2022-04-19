import express from "express";
import passport from "passport";
import KakaoStrategy from "passport-kakao";

const LoginRouter = express.Router();
KakaoStrategy.Strategy;

LoginRouter.get("/kakao", passport.authenticate("kakao-login"));

export default LoginRouter;
