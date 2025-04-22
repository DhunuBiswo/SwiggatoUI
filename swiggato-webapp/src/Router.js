import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import apis from "./Services/CommonServices";
import SwiggatoDialog from "./Component/Common/SwiggatoDialog/SwiggatoDialog";
import { useLocation } from "react-router-dom";
const Home = React.lazy(() => import("./Component/Home/Home"));
const Signup = React.lazy(() => import("./Component/Signup/Signup"));
const Login = React.lazy(() => import("./Component/Login/Login"));

function Router() {
  const [showResultPopUp, setShowResultPopUp] = useState(false);
  const location = useLocation();
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
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Suspense>
  );
}

export default Router;
