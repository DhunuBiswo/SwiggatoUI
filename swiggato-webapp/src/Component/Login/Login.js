import React from "react";
import styles from "./Login.module.css";
import swigatoLogo from "../../Assets/Images/IMG-20241125-WA0021.jpg";
import { Button } from "primereact/button";
import InputBox from "../Common/InputBox/InputBox";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputOtp } from "primereact/inputotp";

function Login() {
  const login = (e) => {
    e.preventDefault();
    console.log("login");
  };
  const [visible, setVisible] = useState(false);
  const [token, setTokens] = useState();
  return (
    <>
      <div className="flex">
        <div className={styles["form-container"]}>
          <h2 className={styles["welcome"]}>Welcome to Swiggato</h2>
          <form>
            <div className={styles["input-field"]}>
              <label>Email:</label>
              <InputBox
                type="email"
                required={true}
                logo="email"
                placeHolder="Enter Email"
              />
            </div>
            <div className={styles["input-field"]}>
              <label>Password:</label>
              <InputBox
                type="password"
                required={true}
                logo="pass"
                placeHolder="Enter Password"
                showeye={true}
              />
            </div>
            <Button label="Submit" />
          </form>

          <div className={styles.login_buttons}>
            <div>
              <Button label="Create Account" link />
            </div>
            <div>
              <Button
                label="Forgot your password?"
                link
                onClick={() => setVisible(true)}
              />
              <Dialog
                header="Reset password"
                visible={visible}
                style={{ width: "50vw" }}
                onHide={() => {
                  if (!visible) return;
                  setVisible(false);
                }}
              >
                <div className={styles["input-field"]}>
                  <InputBox
                    type="email"
                    required={true}
                    logo="email"
                    placeHolder="Enter your registered mail id to recieve the OTP."
                  />
                </div>
                <div>
                  <Button label="Send OTP" style={{ float: "right" }} />
                </div>
                <div className="card flex justify-content-center">
                  <InputOtp
                    value={token}
                    onChange={(e) => setTokens(e.value)}
                    mask
                    integerOnly
                    length={6}
                  />
                </div>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <Button
                    label="Submit OTP"
                    severity="help"
                    style={{ marginRight: "5px" }}
                  />
                  <Button
                    label="Resend OTP"
                    severity="secondary"
                    style={{ marginLeft: "5px" }}
                  />
                </div>
              </Dialog>
            </div>
          </div>
        </div>
        <div style={{ width: "110%" }}>
          <img src={swigatoLogo} className={styles.logo_img} />
        </div>
      </div>
    </>
  );
}

export default Login;
