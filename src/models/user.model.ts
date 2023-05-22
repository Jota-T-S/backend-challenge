import { Schema, model } from "mongoose";

// Configuración de los campos de la coleccion/tabla de usuarios.

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: [true, "First username is required"],
  },
  email: {
    type: String,
    required: [true, "First email is required"],
  },
  password: {
    type: String,
    required: [true, "First password is required"],
  },
  thumbnail: {
    type: String,
    required: false,
    default: "",
  },
  memes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meme",
    },
  ],
  likedMemes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meme",
    },
  ],
  rol: {
    type: Schema.Types.ObjectId,
    ref: "Rol",
  },
});
const UserModel = model("User", UserSchema);

export default UserModel;
