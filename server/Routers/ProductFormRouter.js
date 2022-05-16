import express from "express";
import Product from "../models/Product.js";
import ProductImg from "../models/ProductImg.js";
import upload from "../service/multer.js";
import ProductFormService from "../service/ProductForm/ProductFormService.js";
import ProductFormService2 from "../service/ProductForm/ProductFromService2.js";
const productFormRouter = express.Router();

productFormRouter.post(
  "/imgs",
  upload.array("many"),
  ProductFormService,
  ProductFormService2
);

export default productFormRouter;
