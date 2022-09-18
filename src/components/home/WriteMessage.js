import React from "react";
import "./writeMessage.css";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import TextField from "@mui/material/TextField";
import AttachmentIcon from "@mui/icons-material/Attachment";

function WriteMessage({ submitMessageHandler, messageText, setMessageText }) {
  return (
    <div className="writemessage-wrapper">
      <div className="emoji">
        <InsertEmoticonIcon
          style={{
            color: "rgb(87,100,110)",
            fontSize: "30px",
          }}
        />
      </div>
      <div className="attachment">
        <AttachmentIcon
          style={{ color: "rgb(87,100,110)", fontSize: "30px" }}
        />
      </div>
      <div className="text">
        <TextField
          id="outlined-basic"
          label="Type a message"
          variant="outlined"
          fullWidth
          value={messageText}
          autoComplete="off"
          onKeyDown={submitMessageHandler}
          onChange={(e) => setMessageText(e.target.value)}
        />
      </div>
      <div className="microphone">
        <KeyboardVoiceIcon
          style={{ color: "rgb(87,100,110)", fontSize: "30px" }}
        />
      </div>
    </div>
  );
}

export default WriteMessage;
