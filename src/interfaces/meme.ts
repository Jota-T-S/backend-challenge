import { Category } from "./category";

interface LikedByTrack {
  userId?: string;
}

export interface Meme {
  id?: string;
  name?: string;
  description?: string;
  file?: string;
  categories?: Category[];
  likedBy?: { userId: string }[] | null;
  likeCount?: number;
}
