import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import apis from "./Services/CommonServices";
import SwiggatoDialog from "./Component/Common/SwiggatoDialog/SwiggatoDialog";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import ResturantLists from "./Component/Module/Owner/ResturantLists";
import Navbar from "./Component/Common/Navbar/Navbar";
import Sidebar from "./Component/Common/SideBar/Sidebar";
import AddResturant from "./Component/Module/Owner/AddResturant";
import ResturantMenus from "./Component/Module/Owner/ResturantMenus";
const Home = React.lazy(() => import("./Component/Home/Home"));
const Signup = React.lazy(() => import("./Component/Signup/Signup"));
const Login = React.lazy(() => import("./Component/Login/Login"));

function Router() {
  const [showResultPopUp, setShowResultPopUp] = useState(false);
  const location = useLocation();
  const action = useDispatch();
  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      getUserDetails();
    }
  }, [location]);
  const getUserDetails = async () => {
    try {
      let response = await apis.getUserprofile();
      if (response.isAxiosError) {
        if (!response.data?.success) {
          setShowResultPopUp(true);
        }
      } else {
        action({
          type: "loggedUserDetails",
          payload: {
            name: "loggedUserDetails",
            value: response.data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <Suspense fallback={<ProgressSpinner />}>
      <SwiggatoDialog
        showResultPopUp={showResultPopUp}
        message="Oops! Session expired. Please Login again."
        redirecturl="/login"
        setShowResultPopUp={setShowResultPopUp}
        logout={true}
      />
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}

      <div
        style={{
          display:
            location.pathname !== "/login" && location.pathname !== "/signup"
              ? "flex"
              : "",
        }}
      >
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
          <Sidebar />
        )}
        <div
          style={{
            width:
              location.pathname !== "/login" && location.pathname !== "/signup"
                ? "85%"
                : "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/resturants" element={<ResturantLists />}></Route>
            <Route path="/resturants/manage" element={<AddResturant />} />
            <Route
              path="/resturants/menus"
              element={<ResturantMenus />}
            ></Route>
          </Routes>
        </div>
      </div>
    </Suspense>
  );
}

export default Router;
