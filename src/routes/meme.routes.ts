import { Router } from "express";
import {
  getAllMemes,
  getMemeById,
  createMeme,
  updateMeme,
  getMemesByUser,
  searchMeme,
  deleteMemeByUser,
  deleteMeme,
} from "../controllers/meme.controller";

const memeRouter = Router();

memeRouter
  .get("/all-memes", getAllMemes)
  .post("/create-meme/:id", createMeme)
  .get("/:id", getMemeById)
  .put("/update-meme/:id", updateMeme)
  .get("/memes-by-user/:id", getMemesByUser)
  .get("/search-meme/:name", searchMeme)
  .delete("/delete-meme/:memeId/:id", deleteMemeByUser)
  .delete("/delete-meme/:id", deleteMeme);

export default memeRouter;
