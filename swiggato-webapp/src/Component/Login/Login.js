import React, { useEffect } from "react";
import styles from "./Login.module.css";
import swigatoLogo from "../../Assets/Images/IMG-20241125-WA0021.jpg";
import { Button } from "primereact/button";
import InputBox from "../Common/InputBox/InputBox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonServices from "../../Services/CommonServices";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { BlockUI } from "primereact/blockui";
import ForgotPassword from "../Common/OtpValidator/ForgotPassword";
function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  useEffect(() => {
    action({ type: "onFormClear" });
    // localStorage.removeItem("token");
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const loginSubmitted = async (e) => {
    try {
      setLoader(true);
      setIsError(false);
      e.preventDefault();
      let loginPayload = {
        email: formData.email,
        password: formData.password,
      };
      let response = await CommonServices.login(loginPayload);
      if (!response.isAxiosError) {
        if (response.data.success) {
          localStorage.setItem("token", response.data.jwtToken);
          navigate("/");
        }
      } else {
        setIsError(true);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  const action = useDispatch();
  const formData = useSelector((state) => state.formReducer);
  const updateDetails = (type, value) => {
    action({
      type: "singleUpdate",
      payload: {
        name: type,
        value: value,
      },
    });
  };
  const updateFormdata = (type, value) => {
    updateDetails(type, value);
  };
  return (
    <BlockUI blocked={loader} template={<ProgressSpinner />}>
      <ForgotPassword showForgot={showForgot} setShowForgot={setShowForgot} />
      <div className="flex">
        <div className={styles["form-container"]}>
          <h2 className={styles["welcome"]}>Welcome to Swiggato</h2>
          <form onSubmit={loginSubmitted}>
            <div className={styles["input-field"]}>
              <InputBox
                type="email"
                required={true}
                logo="email"
                placeHolder="Enter Email"
                value={formData.email}
                updateFormdata={updateFormdata}
                reduxKey="email"
                label="Email"
              />
            </div>
            <div className={styles["input-field"]}>
              <InputBox
                type="password"
                required={true}
                logo="pass"
                placeHolder="Enter Password"
                showeye={true}
                value={formData.password}
                updateFormdata={updateFormdata}
                reduxKey="password"
                label="Password"
              />
            </div>
            {isError && (
              <h5 className="error-messge">Enter valid Username or Password</h5>
            )}
            <Button label="Submit" />
          </form>
          <div className={styles.login_buttons}>
            <div>
              <Button
                label="Create Account"
                link
                onClick={() => navigate("/signup")}
              />
            </div>
            <div>
              <Button
                label="Forgot your password?"
                link
                onClick={() => setShowForgot(true)}
              />
            </div>
          </div>
        </div>
        <div style={{ width: "50%" }} className={styles["image-container"]}>
          <img src={swigatoLogo} className={styles.logo_img} alt="swiggato" />
        </div>
      </div>
    </BlockUI>
  );
}

export default Login;
