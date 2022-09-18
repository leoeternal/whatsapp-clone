import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./ChatSlice";
import userSlice from "./UserSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer,
  },
});
