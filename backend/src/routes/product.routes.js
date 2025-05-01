import express from "express";

import {
  getAllProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/:id", getSingleProduct);

export default router;
