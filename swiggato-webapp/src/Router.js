import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import apis from "./Services/CommonServices";
function Router() {
  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    try {
      let response = await apis.getUserprofile();
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default Router;
