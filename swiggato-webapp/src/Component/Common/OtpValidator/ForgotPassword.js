import React, { useState } from "react";
import { InputOtp } from "primereact/inputotp";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import InputBox from "../InputBox/InputBox";
import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonServices from "../../../Services/CommonServices";
import SwiggatoDialog from "../../Common/SwiggatoDialog/SwiggatoDialog";
function ForgotPassword({ showForgot, setShowForgot }) {
  const [email, setEmail] = useState("");
  const [token, setTokens] = useState("");
  const [loader, setLoader] = useState(false);
  const [showResultPopUp, setShowResultPopUp] = useState(false);
  const [showSection, setShowSection] = useState({
    emailfeild: true,
    optfeild: false,
    passwordfeild: false,
  });
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const updateFormdata = (type, value) => {
    if (type === "password") {
      setPasswords({ ...passwords, password: value });
    } else if (type === "confirmPassword") {
      setPasswords({ ...passwords, confirmPassword: value });
    } else {
      setEmail(value);
    }
  };
  const verifyotp = async () => {
    try {
      setLoader(true);
      let response = await CommonServices.forgotPasswordotp({
        email: email,
        otp: token,
      });
      if (!response.isAxiosError) {
        setShowSection({
          emailfeild: false,
          optfeild: false,
          passwordfeild: true,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  const getOtp = async () => {
    try {
      setLoader(true);
      let response = await CommonServices.forgotPassword({
        email: email,
      });
      if (!response.isAxiosError) {
        setShowSection({
          emailfeild: false,
          optfeild: true,
          passwordfeild: false,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  const createNewPassword = async () => {
    try {
      setLoader(true);
      let response = await CommonServices.updatePassword({
        email: email,
        newPassword: passwords.password,
      });
      if (!response.isAxiosError) {
        setShowSection({
          emailfeild: true,
          optfeild: false,
          passwordfeild: false,
        });
        setShowForgot(false);
        setShowResultPopUp(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  const buttonHandler = () => {
    if (showSection.emailfeild) {
      getOtp();
    } else if (showSection.optfeild) {
      verifyotp();
    } else {
      createNewPassword();
    }
  };
  return (
    <BlockUI blocked={loader} template={<ProgressSpinner />} fullScreen>
      <SwiggatoDialog
        showResultPopUp={showResultPopUp}
        message="Password Has Been Updated Successfully. Please Login."
        redirecturl="/login"
        setShowResultPopUp={setShowResultPopUp}
      />
      <Dialog
        header={
          showSection.emailfeild
            ? "Enter Email"
            : showSection.optfeild
            ? "Enter OTP"
            : "Enter New Password"
        }
        visible={showForgot}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => {
          setShowForgot(false);
        }}
      >
        {showSection.emailfeild && (
          <InputBox
            type="email"
            required={true}
            logo="email"
            placeHolder="Enter Email"
            value={email}
            updateFormdata={updateFormdata}
            reduxKey="email"
          />
        )}
        {showSection.optfeild && (
          <div className="card flex justify-content-center">
            <InputOtp
              value={token}
              onChange={(e) => setTokens(e.value)}
              //   mask
              integerOnly
              length={6}
            />
          </div>
        )}

        {/* {wrongotp && (
          <div className="text-center error-messge mt-3">Wrong OTP</div>
        )} */}
        {showSection.passwordfeild && (
          <>
            <div>
              <label>Password:</label>
              <InputBox
                type="password"
                required={true}
                logo="pass"
                placeHolder="Enter Password"
                showeye={true}
                updateFormdata={updateFormdata}
                reduxKey="password"
                value={passwords.password}
              />
            </div>
            <div>
              <label>Confirm Password:</label>
              <InputBox
                type="password"
                required={true}
                logo="pass"
                placeHolder="Confirm password"
                showeye={true}
                updateFormdata={updateFormdata}
                reduxKey="confirmPassword"
                value={passwords.confirmPassword}
              />
            </div>
          </>
        )}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            label={
              showSection.emailfeild
                ? "Send OTP"
                : showSection.optfeild
                ? "Verify OTP"
                : "Create New Password"
            }
            severity="help"
            style={{ marginRight: "5px" }}
            // disabled={
            //   email === "" ||
            //   token.length !== 6 ||
            //   passwords.password === "" ||
            //   passwords.confirmPassword === ""
            // }
            onClick={() => buttonHandler()}
          />
          <Button
            label="Cancel"
            severity="secondary"
            style={{ marginLeft: "5px" }}
            onClick={() => setShowForgot(false)}
          />
        </div>
      </Dialog>
    </BlockUI>
  );
}

export default ForgotPassword;
