import { Meme } from "./meme";
import { Rol } from "./rol";

export interface User {
  _id?: string;
  id: string;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  // thumbnail: string;
  memes: Meme[];
  likesMemes: Meme[];
  rol: Rol;
}
