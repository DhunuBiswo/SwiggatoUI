import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import Forgotpass from "./Component/Forgotpass/Forgotpass";
function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="signup" element={<Signup />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="forgotpass" element={<Forgotpass />}></Route>
    </Routes>
  );
}

export default Router;
