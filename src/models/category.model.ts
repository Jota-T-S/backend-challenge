import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});
const CategoryModel = model("Category", CategorySchema);
export default CategoryModel;
