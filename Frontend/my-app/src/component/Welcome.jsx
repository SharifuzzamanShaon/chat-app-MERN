import React, { useEffect } from "react";
import logo from "../Images/chatLogo.png";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const lightTheme = useSelector((state) => state.themeKey);
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log(userData);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!userData) {
  //     console.log("User not Authenticated");
  //     navigate("/");
  //   }
  // }, [])
  const {userInfo} = JSON.parse(localStorage.getItem("userData"))
  console.log(userInfo);
  return (
    <div className={"welcome-container" + (lightTheme ? "" : ' dark')}>
      <img
        src={logo}
        alt="Logo"
        className="welcome-logo"
      />
      <b>Hi , {userInfo.name} 👋</b>
      <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  );
}

export default Welcome;