import { Router } from "express";
import {
  getAllCategories,
  getMemeByCategory,
} from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter
  .get("/all-category", getAllCategories)
  .get("/:id", getMemeByCategory);

export default categoryRouter;
