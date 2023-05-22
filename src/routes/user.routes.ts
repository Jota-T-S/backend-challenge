//import jwtCheck from "../middlewares/user.middleware";
import { Router } from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  likeMemeUser,
  dislikeMemeUser,
  deleteUser,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter
  .post("/create-user", createUser)
  .get("/all-users", getAllUsers)
  .get("/:id", getUserById)
  .put("/like-meme/:id", likeMemeUser)
  .put("/dislike-meme/:id", dislikeMemeUser)
  .put("/update-user/:id", updateUser)
  .delete("/delete-user/:id", deleteUser);

export default userRouter;
