import express from "express";
import passport from "passport";
import KakaoPassport from "../passport/KakaoPassport.js";

// import { Strategy as KakaoStrategy } from "passport-kakao";
const LoginRouter = express.Router();

KakaoPassport();

LoginRouter.get("/kakao", passport.authenticate("kakao"));

LoginRouter.get(
  "/callback",
  passport.authenticate("kakao", {
    failureRedirect: process.env.CLIENT_URL_PORT,
  }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const isTrue = req.isAuthenticated(); //true, false
      const user = req.user; //user 정보를 세션에 띄워줘야 사람이름 이메일 나이 등등을 받아올 수 있다.
      // const cookieConfig = {
      //   httpOnly: true,
      //   signed: false,
      //   // domain: process.env.CLIENT_URL_PORT,
      // };
      res.cookie("authCookie", { user, isTrue });
      res.redirect(process.env.CLIENT_URL_PORT);
    } else {
      console.log("fail");
    }
  }
);

// LoginRouter.get("/service", (res, req) => {
//   if (req.authenticate()) {
//     console.log(req.authenticate);
//     console.log("success");
//     res.send("로그아웃");
//   } else {
//     //res.send("로그인/회원가입");
//     console.log(req.authenticate);
//   }
// });

export default LoginRouter;
