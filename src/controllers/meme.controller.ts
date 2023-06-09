import { Request, Response } from "express";
import fs from "fs-extra";
import { uploadMemes } from "../utils/cloudinary";
import MemeModel from "../models/meme.model";
import UserModel from "../models/user.model";
import CategoryModel from "../models/category.model";

export const getAllMemes = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const memes = await MemeModel.find().lean().exec();
    res.status(200).send({ status: true, data: memes });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const getMemeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const meme = await MemeModel.findById(id).lean().exec();
    res.status(200).send({ status: true, data: meme });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const createMeme = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, description, categories } = req.body;
  const { file }: any = req.files;

  try {
    if (!req.files?.file) {
      throw new Error("File is required");
    }
    const resultMeme = await uploadMemes(file.tempFilePath);
    await fs.unlink(file.tempFilePath);

    const categoryMeme = await CategoryModel.find({ name: categories });

    const newMeme = await MemeModel.create({
      name,
      description,
      file: resultMeme.secure_url,
      categories: categoryMeme[0]._id,
      userId: id,
    });

    await UserModel.findByIdAndUpdate(id, {
      $push: { memes: newMeme.id },
    });

    res.status(200).send({ status: true, data: newMeme });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const updateMeme = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const meme = await MemeModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true }
    );

    res.status(200).send({ status: true, data: meme });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const deleteMeme = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const meme = await MemeModel.findByIdAndDelete(id);
    res.status(200).send({ status: true, data: meme });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const getMemesByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const memes = await MemeModel.find({ userId: id }).lean().exec();
    res.status(200).send({ status: true, data: memes });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const searchMeme = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.params;
  try {
    const memes = await MemeModel.find({
      name: { $regex: name, $options: "i" },
    })
      .lean()
      .exec();
    res.status(200).send({ status: true, data: memes });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const deleteMemeByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { memeId, id } = req.params;

  try {
    const meme: any = await MemeModel.findById(memeId).lean().exec();

    if (meme.userId.toString() !== id) {
      res.status(403).send({ status: false, message: "Unauthorized access" });
      return;
    }

    await MemeModel.findByIdAndDelete(memeId).exec();

    await UserModel.findByIdAndUpdate(id, {
      $pull: { memes: memeId },
    });

    res.status(200).send({ status: true, data: meme });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};
