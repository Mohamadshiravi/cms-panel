import mongoose from "mongoose";

interface User {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  age: number;
}

const Schema = new mongoose.Schema<User>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const userModel = mongoose.models.User || mongoose.model<User>("User", Schema);
export default userModel;
