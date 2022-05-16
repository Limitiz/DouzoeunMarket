import express from "express";
import passport from "passport";
import KakaoPassport from "../passport/KakaoPassport.js";
import GooglePassport from "../passport/GooglePassport.js";
import KakaoLoginService from "../service/User/KakaoLoginService.js";
import GoogleLoginService from "../service/User/GoogleLoginService.js";
const LoginRouter = express.Router();

KakaoPassport();
GooglePassport();
//카카오 로그인
LoginRouter.get("/kakao", passport.authenticate("kakao"));
//카카오 로그인 콜백함수
LoginRouter.get(
  "/callback",
  passport.authenticate("kakao", {
    failureRedirect: process.env.CLIENT_URL_PORT,
  }),
  KakaoLoginService
);
//구글 로그인
LoginRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//구글 로그인 콜백함수
LoginRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL_PORT,
  }),
  GoogleLoginService
);

export default LoginRouter;
