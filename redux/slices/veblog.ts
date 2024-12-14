import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type veblogStateType = {
  _id: string;
  title: string;
  body: string;
  category: string;
  views: number;
  desc: string;
};

const veblogState: veblogStateType[] = [];

export const getVeblogsFromServer = createAsyncThunk(
  "veblogs/getVeblogsFromServer",
  async () => {
    const res = await axios.get("/api/veblog");
    return res.data.veblogs;
  }
);

export const addVeblogsToServer = createAsyncThunk(
  "veblogs/addVeblogsToServer",
  async (veblog: {
    title: string;
    category: string;
    body: string;
    desc: string;
  }) => {
    const res = await axios.post("/api/veblog", veblog);
    return res.data.veblog;
  }
);

export const deleteVeblogsFromServer = createAsyncThunk(
  "veblogs/deleteVeblogsFromServer",
  async (id: string) => {
    const res = await axios.delete(`/api/veblog/${id}`);
    return res.data;
  }
);

const slice = createSlice({
  name: "veblogs",
  initialState: veblogState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVeblogsFromServer.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addVeblogsToServer.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(deleteVeblogsFromServer.fulfilled, (state, action) => {
      return [...state].filter((e) => e._id !== action.payload.id);
    });
  },
});

export default slice.reducer;
