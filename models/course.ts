import mongoose, { Schema, model, Document, Types } from "mongoose";

interface Course extends Document {
  title: string;
  price: number;
  category: string;
  registersCount: number;
  discount: number;
  desc: string;
}

const courseSchema = new Schema<Course>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  registersCount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  desc: {
    type: String,
    required: true,
  },
});

const courseModel =
  mongoose.models.Course || model<Course>("Course", courseSchema);
export default courseModel;
