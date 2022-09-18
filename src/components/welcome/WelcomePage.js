import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "./welcome.css";
import { addUser, loginUser } from "../../store/UserAction";
import { CircularProgress } from "@mui/material";
import { userActions } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

function WelcomePage() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { userId, enterButtonLoader, submitButtonLoader, userAdded } =
    useSelector((state) => state.user);
  const [loginName, setLoginName] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [userStatus, setUserStatus] = useState("login");
  const [file, setFile] = useState("");
  const [filename, setFileName] = useState("");

  useEffect(() => {
    if (userId !== false) {
      navigate("/home");
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (userAdded) {
      setUserStatus("login");
      toast.success("You are registered");
      dispatch(userActions.updateUserAddedValue());
      setFile("");
      setFileName("");
      setLoginName("");
      setLoginPassword("");
      setRegisterName("");
      setRegisterPassword("");
    }
  }, [userAdded, dispatch]);

  const enterButtonHandler = () => {
    if (loginName !== "" && loginPassword !== "") {
      dispatch(userActions.updateEnterButtonLoader());
      dispatch(
        loginUser({
          name: loginName,
          password: loginPassword,
        })
      );
    } else {
      toast.error("Fill details");
    }
  };

  const submitButtonHandler = () => {
    if (registerName !== "" && filename !== "" && registerPassword !== "") {
      dispatch(userActions.updateSubmitButtonLoader());
      const formData = new FormData();
      formData.append("password", registerPassword);
      formData.append("file", file);
      formData.append("name", registerName);
      dispatch(addUser(formData));
    } else {
      toast.error("Fill details");
    }
  };

  const uploadHandler = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={1000}
      />
      <div className="welcome-wrapper">
        <div className="welcome-container">
          {userStatus === "login" ? (
            <div className="box1">
              <p>Welcome</p>
            </div>
          ) : (
            <div className="box1">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                fullWidth
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                autoComplete="off"
              />
            </div>
          )}

          <div className="box2">
            {userStatus === "login" ? (
              <>
                <div className="name">
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="password">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="button">
                  {enterButtonLoader ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      onClick={enterButtonHandler}
                      color="success"
                      variant="contained"
                    >
                      Enter
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="picture-container">
                  <div className="picture-textfield">
                    <TextField
                      id="filled-basic"
                      disabled
                      variant="filled"
                      label="Upload picture"
                      value={filename}
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                    />
                  </div>

                  <div className="picture-button">
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={uploadHandler}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </div>
                </div>
                <div className="password">
                  <TextField
                    id="outlined-basic"
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="button">
                  {submitButtonLoader ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      onClick={submitButtonHandler}
                      color="error"
                      variant="contained"
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="box3">
            {userStatus === "login" ? (
              <p onClick={() => setUserStatus("register")}>Register</p>
            ) : (
              <p onClick={() => setUserStatus("login")}>Login</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
