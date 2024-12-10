import mongoose, { Types } from "mongoose";
import categoriModel from "./categori";

interface Course {
  title: string;
  price: number;
  categori: Types.ObjectId;
  registersCount: number;
  discount?: number;
  desc: string;
}

const courseSchema = new mongoose.Schema<Course>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categori: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categori",
    required: true,
  },
  registersCount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  desc: {
    type: String,
    required: true,
  },
});

const courseModel =
  mongoose.models.Course || mongoose.model<Course>("Course", courseSchema);
export default courseModel;
