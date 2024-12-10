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
    const res = await axios.get("/api/users");

    return res.data.users;
  }
);

export const deleteUsersFromServer = createAsyncThunk(
  "users/deleteUsersFromServer",
  async (id: string) => {
    const res = await axios.delete(`/api/users/${id}`);
    return res.data;
  }
);

export const addUserToServer = createAsyncThunk(
  "users/addUserToServer",
  async (user: {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    age: number;
  }) => {
    const res = await axios.post(`/api/users`, user);
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
    builder.addCase(deleteUsersFromServer.fulfilled, (state, action) => {
      return [...state].filter((e) => e._id !== action.payload.id);
    });
    builder.addCase(addUserToServer.fulfilled, (state, action) => {
      return [...state];
    });
  },
});

export default slice.reducer;
