import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import MainRouter from "./Routers/MainRouter.js";
import product from "./Routers/product.js";
import LoginRouter from "./Routers/LoginRouter.js";
import LogoutRouter from "./Routers/LogoutRouter.js";
import cookieParser from "cookie-parser";

import env from "dotenv";

env.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log("passport session save: ", user);
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  console.log("passport session get id: ", id);
  done(null, id);
});

//라우팅
app.use("/auth", LoginRouter);
app.use("/main", MainRouter);
app.use("/logout", LogoutRouter);
app.use("/product", product);

app.listen(port, () => console.log(`server is running on ${port}`));
