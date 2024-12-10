import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type courseStateType = {
  _id: string;
  title: string;
  price: number;
  categori: { _id: string; name: string };
  registersCount: number;
  discount: number;
  desc: string;
};

const courseState: courseStateType[] = [];

export const getCoursesFromServer = createAsyncThunk(
  "courses/getCoursesFromServer",
  async () => {
    const res = await axios.get("/api/courses");
    return res.data.courses;
  }
);

export const addCoursesToServer = createAsyncThunk(
  "courses/addCoursesToServer",
  async (course: {
    title: string;
    desc: string;
    price: number;
    categori: string;
  }) => {
    const res = await axios.post("/api/courses", course);
    return res.data.course;
  }
);

export const deleteCoursesFromServer = createAsyncThunk(
  "courses/deleteCoursesFromServer",
  async (id: string) => {
    const res = await axios.delete(`/api/courses/${id}`);
    return res.data;
  }
);

export const addDiscountToCourses = createAsyncThunk(
  "courses/addDiscountToCourses",
  async (precent: string) => {
    const res = await axios.put(`/api/courses/discount`, {
      precent: Number(precent),
    });
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
    builder.addCase(addCoursesToServer.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(deleteCoursesFromServer.fulfilled, (state, action) => {
      return [...state].filter((e) => e._id !== action.payload.id);
    });
    builder.addCase(addDiscountToCourses.fulfilled, (state, action) => {
      return [...action.payload.courses];
    });
  },
});

export default slice.reducer;
