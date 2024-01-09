import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
const PrivateRoute = () => {

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  // const checkValidity = async () => {
  //   const config = {
  //     headers: {
  //       Authorization: `${userData}`
  //     }
  //   }
  //   const response = await axios.get("http://localhost:5000/api/auth1.1", config)
  //   console.log(response.status);

  // }
  useEffect(() => {
   
    if (!userData) {
      console.log("User not Authenticated");
      navigate("/");
    }
  }, [])
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default PrivateRoute