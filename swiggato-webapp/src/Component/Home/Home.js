import React from "react";
// import "./Home.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Common/Navbar/Navbar";
import OwnerHome from "../Module/Owner/OwnerHome";
import { useSelector } from "react-redux";
import Sidebar from "../Common/SideBar/Sidebar";
function Home({ name, age }) {
  const loginData = useSelector((state) => state.LoginReducer);
  return (
    <>
      <div className="container-xxl position-relative p-0">
        {(function () {
          if (loginData.loggedUserDetails.role === "owner") {
            return <OwnerHome />;
          }
        })()}
      </div>
    </>
  );
}

export default Home;
