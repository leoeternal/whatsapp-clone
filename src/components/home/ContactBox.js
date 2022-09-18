import React from "react";
import Avatar from "@mui/material/Avatar";
import "./contactBox.css";

function ContactBox({ user }) {
  return (
    <div className="contactbox-wrapper">
      <div className="contactbox-left">
        <Avatar
          style={{ width: "90%", height: "90%" }}
          alt="Remy Sharp"
          src={`http://localhost:8080/image/${user.picture}`}
        />
      </div>
      <div className="contactbox-right">
        <div className="nametime-container">
          <div className="name">
            <p>{user.name}</p>
          </div>
          <div className="time">
            <p>time</p>
          </div>
        </div>
        <div className="latestmessage">
          <p>Message here 😂</p>
        </div>
      </div>
    </div>
  );
}

export default ContactBox;
