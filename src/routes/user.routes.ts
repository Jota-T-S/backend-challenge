import { Router } from "express";
import {
  registerUser,
  updateUser,
  getAllUsers,
  getUserById,
  likeMemeUser,
  dislikeMemeUser,
  deleteUser,
  loginUser,
  getLikedMemes,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter
  .post("/register-user", registerUser)
  .post("/login-user", loginUser)
  .get("/all-users", getAllUsers)
  .get("/:id", getUserById)
  .get("/liked-memes/:id", getLikedMemes)
  .put("/like-meme/:id", likeMemeUser)
  .put("/dislike-meme/:id", dislikeMemeUser)
  .put("/update-user/:id", updateUser)
  .delete("/delete-user/:id", deleteUser);

export default userRouter;
