import React from "react";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import DoneIcon from "@mui/icons-material/Done";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import "./chatWindow.css";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function ChatWindow({ messages, userId, conversationId }) {
  return (
    <div className="chatwindow-wrapper">
      {messages.map((message) => {
        return (
          <>
            {message.conversationId._id ||
            message.conversationId === conversationId ? (
              <div key={message._id}>
                {message.senderId === userId ? (
                  <div className="right-container">
                    <div className="rightmessage-container">
                      <div className="rightmessage">
                        {message.messageSuccess ? (
                          <>
                            <div>{message.text}</div>

                            <div className="status-time-container">
                              <div className="time">
                                <span>
                                  <ReactTimeAgo
                                    date={message.date}
                                    locale="en-US"
                                  />
                                </span>
                              </div>
                              <div className="status">
                                <DoneIcon
                                  style={{
                                    fontSize: "14px",
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>{message.text}</div>
                            <div className="status-time-container">
                              <div className="time">
                                <span>
                                  <ReactTimeAgo
                                    date={message.date}
                                    locale="en-US"
                                  />
                                </span>
                              </div>
                              <div className="status">
                                <AvTimerIcon
                                  style={{
                                    fontSize: "14px",
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="left-container">
                    <div className="leftmessage-container">
                      <div className="leftmessage">
                        <div>{message.text}</div>
                        <div className="left-time">
                          <span>
                            <ReactTimeAgo date={message.date} locale="en-US" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
}

export default ChatWindow;
