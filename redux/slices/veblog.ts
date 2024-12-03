import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type veblogStateType = {
  _id: string;
  title: string;
  category: string;
  views: number;
  desc: string;
};

const veblogState: veblogStateType[] = [];

export const getVeblogsFromServer = createAsyncThunk(
  "veblogs/getVeblogsFromServer",
  async () => {
    const res = await axios.get(
      "https://redux-cms.iran.liara.run/api/articles"
    );
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
  },
});

export default slice.reducer;
