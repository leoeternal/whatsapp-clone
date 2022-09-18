import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../helper/axiosInstance";

export const addUser = createAsyncThunk("user/addUser", async (data) => {
  const fetchData = () => {
    const response = axios.post("/user", data);
    return response;
  };
  try {
    const data = await fetchData();
    if (data.data.status === "success") {
      return data.data;
    } else {
      toast.error("User with this name already exist");
      return data.data;
    }
  } catch (error) {
    toast.error("Cannot register. Please try again later");
    return {
      status: "failed",
    };
  }
});

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  const fetchData = () => {
    const response = axios.post(`/login/user`, data);
    return response;
  };
  try {
    const data = await fetchData();
    if (data.data.status === "success") {
      return data.data;
    } else if (data.data.status === "wrong password") {
      toast.error("Wrong password");
      return data.data;
    } else {
      toast.error("User not registered");
      return data.data;
    }
  } catch (error) {
    toast.error("Cannot login. Please try again later");
    return {
      status: "failed",
    };
  }
});

export const getLoggedInUserDetails = createAsyncThunk(
  "user/getLoggedInUserDetails",
  async (loggedId) => {
    const fetchData = () => {
      const response = axios.get(`/user/logged/${loggedId}`);
      return response;
    };
    try {
      const data = await fetchData();
      if (data.data.status === "success") {
        return data.data;
      }
    } catch (error) {
      toast.error("Cannot fetch user. please try again later.");
      return {
        status: "failed",
      };
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (loggedId) => {
    const fetchData = () => {
      const response = axios.get(`/user/${loggedId}`);
      return response;
    };
    try {
      const data = await fetchData();
      if (data.data.status === "success") {
        return data.data;
      }
    } catch (error) {
      toast.error("Cannot fetch users. please try again later.");
      return {
        status: "failed",
      };
    }
  }
);
