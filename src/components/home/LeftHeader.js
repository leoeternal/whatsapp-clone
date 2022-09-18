import React from "react";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./leftHeader.css";
import { userActions } from "../../store/UserSlice";
import { useDispatch } from "react-redux";

function LeftHeader({ loggedInUser, socket }) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch(userActions.logoutUser());
    socket.current.emit("remove-user", loggedInUser._id);
  };

  return (
    <div className="leftheader-wrapper">
      <div className="leftheader">
        <Avatar
          alt="Remy Sharp"
          src={`http://localhost:8080/image/${loggedInUser.picture}`}
        />
      </div>
      <div className="rightheader">
        <div className="newchat">
          <ChatIcon style={{ color: "rgb(87,100,110)" }} />
        </div>
        <div className="option">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon style={{ color: "rgb(87,100,110)" }} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default LeftHeader;
