import express from "express";

const MainRouter = express.Router();

MainRouter.get("/", (req, res) => {
  res.send("Login");
});

export default MainRouter;
