import { Category } from "./category";

export interface Meme {
  id: string;
  name: string;
  description: string;
  file: string;
  Category: Category[];
  likeCount: number;
}
