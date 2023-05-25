import { Request, Response } from "express";
import fs from "fs-extra";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadImage } from "../utils/cloudinary";
import UserModel from "../models/user.model";
import RolModel from "../models/rol.model";
import MemeModel from "../models/meme.model";

export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await UserModel.find().lean().exec();
    res.status(200).send({ status: true, data: users });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, lastName, userName, email, password, rol } = req.body;
  const { thumbnail }: any = req.files;

  try {
    if (!req.files?.thumbnail) {
      throw new Error("Thumbnail is required");
    }
    const resultImage = await uploadImage(thumbnail.tempFilePath);
    await fs.unlink(thumbnail.tempFilePath);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const rolUser = await RolModel.find({ name: "User" });

    const newUser = await UserModel.create({
      name,
      lastName,
      userName,
      email,
      password: hash,
      thumbnail: resultImage.secure_url,
      rol: rolUser[0]._id,
    });

    res.status(200).send({ status: true, data: newUser });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user!.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid email or password");
    }
    const token = jwt.sign({ userId: user!._id }, "secret_key");
    res.status(200).send({
      status: true,
      token,
      rol: user.rol,
      id: user._id,
    });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id).lean().exec();

    res.status(200).send({ status: true, data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, lastName, userName, password } = req.body;
  const { thumbnail }: any = req.files;
  try {
    if (!req.files?.thumbnail) {
      throw new Error("Thumbnail is required");
    }
    const resultImage = await uploadImage(thumbnail.tempFilePath);
    await fs.unlink(thumbnail.tempFilePath);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        lastName,
        userName,
        password: hash,
        thumbnail: resultImage.secure_url,
      },
      { new: true }
    );

    res.status(200).send({ status: true, data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    res.status(200).send({ status: true, data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const likeMemeUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const memeId = req.body.memeId;

  try {
    const addMeme = await UserModel.findByIdAndUpdate(id, {
      $push: { likedMemes: memeId },
    })
      .lean()
      .exec();

    const likedbyUser = await MemeModel.findByIdAndUpdate(memeId, {
      $push: { likedBy: id },
    });
    const countMeme = await MemeModel.findByIdAndUpdate(
      memeId,
      {
        $inc: { likeCount: 1 },
      },
      { new: true }
    )
      .lean()
      .exec();

    console.log("respuesta");
    res.status(200).send({ status: true, addMeme, countMeme, likedbyUser });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const dislikeMemeUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const memeId = req.body.memeId;
  try {
    const quitMeme = await UserModel.findByIdAndUpdate(id, {
      $pull: { likedMemes: memeId },
    })
      .lean()
      .exec();

    const likedbyUser = await MemeModel.findByIdAndUpdate(memeId, {
      $pull: { likedBy: id },
    });

    const countMeme = await MemeModel.findByIdAndUpdate(memeId, {
      $inc: { likeCount: -1 },
    });

    res.status(200).send({ status: true, quitMeme, countMeme, likedbyUser });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getLikedMemes = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id).populate("likedMemes");
    res.status(200).send({ data: user?.likedMemes });
  } catch (error) {
    res.status(400).send(error);
  }
};
