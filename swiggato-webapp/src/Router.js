import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="signup" element={<Signup />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default Router;
