import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type courseStateType = {
  _id: string;
  title: string;
  price: number;
  category: string;
  registersCount: number;
  discount: number;
  desc: string;
};

const courseState: courseStateType[] = [];

export const getCoursesFromServer = createAsyncThunk(
  "courses/getCoursesFromServer",
  async () => {
    const res = await axios.get("https://redux-cms.iran.liara.run/api/courses");
    return res.data;
  }
);

const slice = createSlice({
  name: "courses",
  initialState: courseState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoursesFromServer.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default slice.reducer;
