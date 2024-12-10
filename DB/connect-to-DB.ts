import mongoose from "mongoose";

export default async function ConnectTODb() {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    }
    await mongoose.connect("mongodb://localhost:27017/cms-panel");
  } catch (error) {}
}
