import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import config from "../config/config";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  secure: true,
});

export const uploadImage = async (
  filePath: string
): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
    folder: "Avatar-user",
    height: 300,
    width: 300,
    crop: "scale",
    overwrite: true,
  });
};

export const uploadMemes = async (
  filePath: string
): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.upload(filePath, {
    resource_type: "auto",
    folder: "Memes",
    height: 300,
    width: 300,
    overwrite: true,
  });
};
