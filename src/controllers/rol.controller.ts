import { Request, Response } from "express";
import RolModel from "../models/rol.model";
import UserModel from "../models/user.model";

export const getAllRoles = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const rols = await RolModel.find().lean().exec();
    res.status(200).send({ status: true, data: rols });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const getUserByRol = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    const users = await UserModel.find({ rol: id }).lean().exec();
    res.status(200).send({ status: true, data: users });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};
