import { CircularProgress } from "@mui/material";
import { useRef } from "react";
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createMessage,
  fetchConversation,
  fetchMessages,
} from "../../store/ChatAction";
import { chatActions } from "../../store/ChatSlice";
import { getAllUsers, getLoggedInUserDetails } from "../../store/UserAction";
import ChatList from "./ChatList";
import "./home.css";
import moment from "moment";
import LeftHeader from "./LeftHeader";
import RightBody from "./RightBody";

function Home() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userId,
    users,
    loggedInUser,
    loggedUserInfoLoader,
    getAllUsersLoader,
  } = useSelector((state) => state.user);
  const {
    conversation,
    conversationFetched,
    messagesFetched,
    messages,
    messageCreated,
  } = useSelector((state) => state.chat);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState("");

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    if (userId) {
      socket.current.emit("add-user", userId);
    }
    socket.current.on("get-users", (users) => {
      console.log(users);
    });
    socket.current.on("receive-message", (data) => {
      dispatch(
        chatActions.updateMessagesArray({
          conversationId: data.conversationId,
          senderId: data.senderId,
          text: data.text,
          date: moment().toString(),
        })
      );
    });
  }, [userId, dispatch]);

  const submitMessageHandler = (e) => {
    if (e.key === "Enter") {
      socket.current.emit("send-message-to-sender", {
        text: messageText,
        senderId: userId,
        conversationId: conversation._id,
      });
      dispatch(
        createMessage({
          text: messageText,
          conversationId: conversation._id,
          senderId: userId,
        })
      );
    }
  };

  useEffect(() => {
    if (messageCreated) {
      setMessageText("");

      dispatch(fetchMessages(conversation._id));
      socket.current.emit("send-message-to-receiver", {
        text: messageText,
        senderId: userId,
        conversationId: conversation._id,
        receiverId: selectedUser._id,
      });
      dispatch(chatActions.updateMessageCreatedValue());
    }
  }, [
    dispatch,
    messageCreated,
    conversation,
    messageText,
    selectedUser,
    userId,
  ]);

  useEffect(() => {
    if (userId) {
      dispatch(getAllUsers(userId));
      dispatch(getLoggedInUserDetails(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId === false) {
      navigate("/");
    }
  }, [navigate, userId]);

  useEffect(() => {
    if (selectedUser !== null && userId) {
      dispatch(
        fetchConversation({
          member1: userId,
          member2: selectedUser._id,
        })
      );
    }
  }, [dispatch, selectedUser, userId]);

  useEffect(() => {
    if (conversationFetched) {
      dispatch(fetchMessages(conversation._id));
      dispatch(chatActions.updateConversationFetchedValue());
    }
  }, [conversationFetched, dispatch, conversation]);

  return (
    <div className="home-wrapper">
      <div className="left">
        <div className="left-header">
          {loggedUserInfoLoader ? (
            <CircularProgress />
          ) : (
            <LeftHeader socket={socket} loggedInUser={loggedInUser} />
          )}
        </div>
        <div className="left-body">
          {getAllUsersLoader ? (
            <CircularProgress />
          ) : (
            <ChatList
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              users={users}
            />
          )}
        </div>
      </div>
      <div className="right">
        {selectedUser !== null ? (
          <>
            {!messagesFetched ? (
              <CircularProgress />
            ) : (
              <RightBody
                submitMessageHandler={submitMessageHandler}
                messageText={messageText}
                setMessageText={setMessageText}
                selectedUser={selectedUser}
                messages={messages}
                userId={userId}
                conversationId={conversation._id}
              />
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
