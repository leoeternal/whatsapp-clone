import React from "react";
import ChatWindow from "./ChatWindow";
import "./rightBody.css";
import RightHeader from "./RightHeader";
import WriteMessage from "./WriteMessage";

function RightBody({
  selectedUser,
  submitMessageHandler,
  messageText,
  setMessageText,
  messages,
  userId,
  conversationId,
}) {
  return (
    <div className="rightbody-wrapper">
      <div className="right-header">
        <RightHeader selectedUser={selectedUser} />
      </div>
      <div className="chat-window">
        <ChatWindow
          conversationId={conversationId}
          userId={userId}
          messages={messages}
        />
      </div>
      <div className="enter-message">
        <WriteMessage
          submitMessageHandler={submitMessageHandler}
          messageText={messageText}
          setMessageText={setMessageText}
        />
      </div>
    </div>
  );
}

export default RightBody;
