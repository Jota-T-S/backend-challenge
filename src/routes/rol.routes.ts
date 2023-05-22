import { Router } from "express";
import { getAllRoles, getUserByRol } from "../controllers/rol.controller";

const rolRouter = Router();

rolRouter.get("/all-rol", getAllRoles).get("/:id", getUserByRol);

export default rolRouter;
