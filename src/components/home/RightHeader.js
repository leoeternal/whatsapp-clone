import React from "react";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./rightHeader.css";

function RightHeader({ selectedUser }) {
  return (
    <div className="rightheader-wrapper">
      <div className="picturename-container">
        <div className="rightheader-picture">
          <Avatar
            alt="Remy Sharp"
            style={{ width: "70%", height: "90%" }}
            src={`http://localhost:8080/image/${selectedUser.picture}`}
          />
        </div>
        <div className="rightheader-name">
          <p>{selectedUser.name}</p>
        </div>
      </div>
      <div className="searchoption-container">
        <div className="rightheader-search">
          <SearchIcon style={{ color: "rgb(87,100,110)" }} />
        </div>
        <div className="rightheader-option">
          <MoreVertIcon style={{ color: "rgb(87,100,110)" }} />
        </div>
      </div>
    </div>
  );
}

export default RightHeader;
