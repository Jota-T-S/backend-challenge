import { Schema, model } from "mongoose";

const MemeSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  file: {
    type: String,
  },
  categories: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
});
const MemeModel = model("Meme", MemeSchema);
export default MemeModel;
