import { Request, Response } from "express";
import CategoryModel from "../models/category.model";
import MemeModel from "../models/meme.model";

export const getAllCategories = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await CategoryModel.find().lean().exec();
    res.status(200).send({ status: true, data: categories });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const getMemeByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const memes = await MemeModel.find({ categories: id }).lean().exec();

    res.status(200).send({ status: true, data: memes });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};
