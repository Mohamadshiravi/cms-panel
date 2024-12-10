import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type categoriStateType = {
  _id: string;
  name: string;
};

const categotiState: categoriStateType[] = [];

export const getCategoriFromServer = createAsyncThunk(
  "categories/getCategoriFromServer",
  async () => {
    const res = await axios.get("/api/categori");
    return res.data.categories;
  }
);
export const addCategoriToServer = createAsyncThunk(
  "categories/addCategoriToServer",
  async (categori: { name: string }) => {
    const res = await axios.post("/api/categori", categori);
    return res.data;
  }
);

const slice = createSlice({
  name: "categories",
  initialState: categotiState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriFromServer.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addCategoriToServer.fulfilled, (state, action) => {
      return [...state];
    });
  },
});

export default slice.reducer;
