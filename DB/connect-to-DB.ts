import mongoose from "mongoose";

export default async function ConnectTODb() {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    }
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {}
}
