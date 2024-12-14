import mongoose, { Schema, model, Document } from "mongoose";

interface veblog extends Document {
  title: string;
  category: string;
  views: number;
  body: string;
  desc: string;
}

const veblogSchema = new Schema<veblog>({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const veblogModel =
  mongoose.models.Veblog || mongoose.model("Veblog", veblogSchema);
export default veblogModel;
