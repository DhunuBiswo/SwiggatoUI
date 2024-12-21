import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import swigatoLogo from "../../Assets/Images/IMG-20241125-WA0021.jpg";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../Common/InputBox/InputBox";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import {
  clearButtonChecker,
  submitButttonChecker,
} from "../Common/utills/CommonFunctions";
import { ProgressSpinner } from "primereact/progressspinner";
import { BlockUI } from "primereact/blockui";
import OtpValidator from "../Common/OtpValidator/OtpValidator";
import CommonServices from "../../Services/CommonServices";
import SwiggatoDialog from "../Common/SwiggatoDialog/SwiggatoDialog";
import { RadioButton } from "primereact/radiobutton";
function Signup() {
  const [passwordMatcher, setPasswordMatcher] = useState(false);
  const [loader, setLoader] = useState(false);
  const [validateOtp, setValidateOtp] = useState(false);
  const [showResultPopUp, setShowResultPopUp] = useState(false);
  const [wrongotp, setWrongotp] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    action({ type: "onFormClear" });
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const signUp = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      let signupPayload = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        firstName: formData.firstName,
        lastName: formData.lastname,
        phoneNumber: formData.mobile,
      };

      let response = await CommonServices.signup(signupPayload);
      if (!response.isAxiosError) {
        if (response.data.status === "Success") {
          setValidateOtp(true);
        }
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };
  const OtpValidation = async (otp) => {
    try {
      setLoader(true);
      let otpPayload = {
        email: formData.email,
        otpCode: otp,
      };

      let response = await CommonServices.validateOtp(otpPayload);
      if (!response.isAxiosError) {
        if (response.data.success) {
          setValidateOtp(false);
          action({ type: "onFormClear" });
          setShowResultPopUp(true);
        } else {
          setWrongotp(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const action = useDispatch();
  const formData = useSelector((state) => state.formReducer);
  const updateDetails = (type, value) => {
    if (type === "mobile" && !/^[0-9\b]+$/.test(value)) return;
    action({
      type: "singleUpdate",
      payload: {
        name: type,
        value: value,
      },
    });
    if (type === "confirmPassword") {
      if (value !== formData.password) {
        setPasswordMatcher(true);
      } else {
        setPasswordMatcher(false);
      }
    }
  };
  const updateFormdata = (type, value) => {
    updateDetails(type, value);
  };
  const getOtp = (otp) => {
    OtpValidation(otp);
  };
  const role = (val) => {
    action({
      type: "singleUpdate",
      payload: {
        name: "role",
        value: val,
      },
    });
  };

  return (
    <BlockUI blocked={loader} template={<ProgressSpinner />}>
      <OtpValidator
        validateOtp={validateOtp}
        setValidateOtp={setValidateOtp}
        getOtp={getOtp}
        wrongotp={wrongotp}
      />
      <SwiggatoDialog
        showResultPopUp={showResultPopUp}
        message="Account Has Been Created Successfully. Please Login."
        redirecturl="/login"
        setShowResultPopUp={setShowResultPopUp}
      />
      <div className="flex">
        <div className={styles["image-container"]}>
          <img
            src={swigatoLogo}
            className={styles.logo_img}
            alt="swiggato-logo"
          />
        </div>
        <div className={styles["form-container"]}>
          <h2 className={["welcome"]}>Welcome to Swiggato</h2>
          <form onSubmit={signUp}>
            <div className={styles["input-field"]}>
              <InputBox
                type="text"
                required={true}
                logo="user"
                placeHolder="Enter First Name"
                updateFormdata={updateFormdata}
                reduxKey="firstName"
                value={formData.firstName}
                label="First Name"
              />
            </div>
            <div className={styles["input-field"]}>
              <InputBox
                type="text"
                required={true}
                logo="user"
                placeHolder="Enter Last Name"
                updateFormdata={updateFormdata}
                reduxKey="lastname"
                value={formData.lastname}
                label="Last Name"
              />
            </div>
            <div className={styles["input-field"]}>
              <InputBox
                type="email"
                required={true}
                logo="email"
                placeHolder="Enter Email"
                updateFormdata={updateFormdata}
                reduxKey="email"
                value={formData.email}
                label="Email"
              />
            </div>
            <div className={styles["input-field"]}>
              <InputBox
                type="text"
                required={true}
                logo="mobile"
                placeHolder="Enter Mobile Number"
                updateFormdata={updateFormdata}
                reduxKey="mobile"
                value={formData.mobile}
                label="Mobile"
              />
            </div>
            <div className={styles.radio_button}>
              <div>
                <RadioButton
                  inputId="user"
                  name="pizza"
                  value="user"
                  onChange={(e) => role(e.value)}
                  checked={formData.role === "user"}
                />
                <label htmlFor="user" className="ml-2">
                  User
                </label>
              </div>
              <div>
                <RadioButton
                  inputId="resturant"
                  name="pizza"
                  value="owner"
                  onChange={(e) => role(e.value)}
                  checked={formData.role === "owner"}
                />
                <label htmlFor="resturant" className="ml-2">
                  Register Your Resturant
                </label>
              </div>
              <div>
                <RadioButton
                  inputId="captain"
                  name="pizza"
                  value="deliveryboy"
                  onChange={(e) => role(e.value)}
                  checked={formData.role === "deliveryboy"}
                />
                <label htmlFor="captain" className="ml-2">
                  Be our Delivery Captain
                </label>
              </div>
            </div>

            <div className={styles["input-field"]}>
              <InputBox
                type="password"
                required={true}
                logo="pass"
                placeHolder="Enter Password"
                showeye={true}
                updateFormdata={updateFormdata}
                reduxKey="password"
                value={formData.password}
                label="Password"
              />
            </div>

            <div className={styles["input-field"]}>
              <InputBox
                type="password"
                required={true}
                logo="pass"
                placeHolder="Confirm password"
                showeye={true}
                updateFormdata={updateFormdata}
                reduxKey="confirmPassword"
                value={formData.confirmPassword}
                label="Confirm Password"
              />
              {passwordMatcher && (
                <h6 className="error-messge">Confirm Password Not Matching</h6>
              )}
            </div>
            <div>
              <Button
                label="Reset"
                severity="secondary"
                style={{ marginRight: "10px" }}
                disabled={clearButtonChecker(formData)}
                onClick={() => {
                  action({
                    type: "onFormClear",
                  });
                }}
              />
              <Button
                label="Submit"
                style={{ marginLeft: "10px" }}
                disabled={submitButttonChecker(formData)}
              />
            </div>
          </form>

          <div className={styles["account-link"]}>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </BlockUI>
  );
}

export default Signup;
