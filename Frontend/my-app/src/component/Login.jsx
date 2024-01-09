import React, { useState } from "react";
import logo from "../Images/chatLogo.png";
import { Alert, Backdrop, Button, CircularProgress, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setValidUser } from "../Redux/authSlice";
import { toggleTheme } from "../Redux/themeSlice";
// import Toaster from "./Toaster";

function Login() {
  const [showlogin, setShowLogin] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [logInStatus, setLogInStatus] = useState("");
  const [signInStatus, setSignInStatus] = useState("");
  const validUser = useSelector((state) => state.authKey)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
        config
      );
      console.log("Login : ", response);
      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response.data.token));
        dispatch(setValidUser())
        navigate("/app/welcome");
      }
      setLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        console.log("User not exists");
        setLogInStatus({
          msg: "User not exists"
        });
      }
      if (error.response.status === 401) {
        console.log("Password is incorrect");
        setLogInStatus({
          msg: "Password is incorrect"
        });
      }
    }
    setLoading(false);
  };

  const signUpHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/auth/reg",
        data,
        config
      );
      console.log(response);

      if (response.status === 200) {
        setSignInStatus({ msg: "Success" });
        navigate("/app/welcome");
        localStorage.setItem("userData", JSON.stringify(response));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setSignInStatus({ msg: "User with this email ID already Exists" });
        console.log("user exists");
        setLoading(false);

      }
      if (error.response.status === 400) {
        console.log('invaild user info');
        setSignInStatus({ msg: 'invaild user info' })
        setLoading(false);
      }
    };
  }
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <Snackbar open={signInStatus || logInStatus} autoHideDuration={6000} >
        <Alert severity="" sx={{ width: '100%' }} autoHideDuration={6000} >
          {signInStatus.msg || logInStatus.msg}
        </Alert>
      </Snackbar>
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="Logo" className="welcome-logo" />
        </div>
        {showlogin && (
          <div className="login-box">
            <p className="login-text">Login to your Account</p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter your email"
              type="email"
              variant="outlined"
              color="secondary"
              name="email"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  loginHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              name="password"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  loginHandler();
                }
              }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={loginHandler}
              isLoading
            >
              Login
            </Button>
            <p>
              Don't have an Account ?{" "}
              <span
                className="hyper"
                onClick={() => {
                  setShowLogin(false);
                }}
              >
                Sign Up
              </span>
            </p>


          </div>
        )}
        {!showlogin && (
          <div className="login-box">
            <p className="login-text">Create your Account</p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter User Name"
              variant="outlined"
              color="secondary"
              name="name"
              helperText=""
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  signUpHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter Email Address"
              variant="outlined"
              color="secondary"
              name="email"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  signUpHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              name="password"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  signUpHandler();
                }
              }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={signUpHandler}
            >
              Sign Up
            </Button>
            <p>
              Already have an Account ?
              <span
                className="hyper"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Log in
              </span>
            </p>
            {/* {signInStatus ? (
              <Toaster key={signInStatus.key} message={signInStatus.msg} />
            ) : null} */}
          </div>
        )}
      </div>
    </>
  );
}

export default Login;