import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../helper/axiosInstance";

export const fetchConversation = createAsyncThunk(
  "chat/fetchConversation",
  async (data) => {
    const fetchData = () => {
      const response = axios.post("/conversation", data);
      return response;
    };
    try {
      const data = await fetchData();
      if (
        data.data.status === "success" ||
        data.data.status === "already exist"
      ) {
        return data.data;
      }
    } catch (error) {
      toast.error("Cannot fetch conversation. please try again later.");
      return {
        status: "failed",
      };
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (id) => {
    const fetchData = () => {
      const response = axios.get(`/message/${id}`);
      return response;
    };
    try {
      const data = await fetchData();
      if (data.data.status === "success") {
        return data.data;
      }
    } catch (error) {
      toast.error("Cannot fetch messages. please try again later.");
      return {
        status: "failed",
      };
    }
  }
);

export const createMessage = createAsyncThunk(
  "chat/createMessage",
  async (data) => {
    const fetchData = () => {
      const response = axios.post(`/message`, data);
      return response;
    };
    try {
      const data = await fetchData();
      if (data.data.status === "success") {
        return data.data;
      }
    } catch (error) {
      toast.error("Cannot post messages. please try again later.");
      return {
        status: "failed",
      };
    }
  }
);
