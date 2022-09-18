import React from "react";
import TextField from "@mui/material/TextField";
import "./chatList.css";
import ContactBox from "./ContactBox";
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/ChatSlice";

function ChatList({ users, setSelectedUser, selectedUser }) {
  const dispatch = useDispatch();

  const contactClickedHandler = (user) => {
    dispatch(chatActions.updateMessagesFetchedValue());
    setSelectedUser(user);
  };

  return (
    <div className="chatlist-wrapper">
      <div className="search">
        <TextField
          id="outlined-basic"
          fullWidth
          label="Search or start new chat"
          variant="outlined"
          autoComplete="off"
          style={{
            backgroundColor: "rgb(240,242,245)",
          }}
        />
      </div>
      <div className="chatlist">
        {users.map((user) => {
          return (
            <>
              {selectedUser !== null && selectedUser._id === user._id ? (
                <div className="chatbox">
                  <ContactBox user={user} />
                </div>
              ) : (
                <div
                  onClick={() => contactClickedHandler(user)}
                  className="chatbox"
                >
                  <ContactBox user={user} />
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ChatList;
