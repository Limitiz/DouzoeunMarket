import cors from "cors";
import express from "express";
import mysql from "mysql";
import fs from "fs";
import MainRouter from "./Routers/MainRouter.js";
import env from "dotenv";
env.config();
const app = express();
const port = process.env.PORT;

app.use("/main", MainRouter);
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`server is running on ${port}`));
