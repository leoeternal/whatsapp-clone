import { createSlice } from "@reduxjs/toolkit";

import {
  addUser,
  loginUser,
  getAllUsers,
  getLoggedInUserDetails,
} from "./UserAction";

const initialState = {
  userId:
    localStorage.getItem("userId") === null
      ? false
      : localStorage.getItem("userId"),
  submitButtonLoader: false,
  enterButtonLoader: false,
  userAdded: false,
  users: [],
  loggedInUser: {},
  loggedUserInfoLoader: true,
  getAllUsersLoader: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSubmitButtonLoader: (state, action) => {
      state.submitButtonLoader = true;
    },
    updateEnterButtonLoader: (state, action) => {
      state.enterButtonLoader = true;
    },
    updateUserAddedValue: (state, action) => {
      state.userAdded = false;
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("userId");
      state.userId = false;
    },
  },
  extraReducers: {
    [addUser.pending]: (state, action) => {
      console.log("pending");
    },
    [addUser.fulfilled]: (state, action) => {
      if (action.payload.status === "success") {
        state.submitButtonLoader = false;
        state.userAdded = true;
      } else if (action.payload.status === "already exist") {
        state.submitButtonLoader = false;
      } else {
        state.submitButtonLoader = false;
      }
    },
    [addUser.rejected]: (state, action) => {
      console.log("rejected");
    },
    [loginUser.pending]: (state, action) => {
      console.log("pending");
    },
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload.status === "success") {
        state.enterButtonLoader = false;
        localStorage.setItem("userId", action.payload.data._id);
        state.userId = localStorage.getItem("userId");
      } else if (action.payload.status === "not registered") {
        state.enterButtonLoader = false;
      } else {
        state.enterButtonLoader = false;
      }
    },
    [loginUser.rejected]: (state, action) => {
      console.log("rejected");
    },
    [getAllUsers.pending]: (state, action) => {
      console.log("pending");
    },
    [getAllUsers.fulfilled]: (state, action) => {
      if (action.payload.status === "success") {
        state.users = action.payload.data;
        state.getAllUsersLoader = false;
      }
    },
    [getAllUsers.rejected]: (state, action) => {
      console.log("rejected");
    },
    [getLoggedInUserDetails.pending]: (state, action) => {
      console.log("pending");
    },
    [getLoggedInUserDetails.fulfilled]: (state, action) => {
      if (action.payload.status === "success") {
        state.loggedInUser = action.payload.data;
        state.loggedUserInfoLoader = false;
      }
    },
    [getLoggedInUserDetails.rejected]: (state, action) => {
      console.log("rejected");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
