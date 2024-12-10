import mongoose from "mongoose";

interface Categori {
  name: string;
}

const Schema = new mongoose.Schema<Categori>({
  name: {
    type: String,
    required: true,
  },
});

const categoriModel =
  mongoose.models.Categori || mongoose.model<Categori>("Categori", Schema);
export default categoriModel;
