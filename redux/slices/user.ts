import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type userStateType = {
  _id: string;
  age: number;
  city: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
};

const usersState: userStateType[] = [];

export const getUsersFromServer = createAsyncThunk(
  "users/getUsersFromServer",
  async () => {
    const res = await axios.get("https://redux-cms.iran.liara.run/api/users");
    return res.data;
  }
);

const slice = createSlice({
  name: "users",
  initialState: usersState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersFromServer.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default slice.reducer;
