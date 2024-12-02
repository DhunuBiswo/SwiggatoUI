import React from "react";
import styles from "./Signup.module.css";
import swigatoLogo from "../../Assets/Images/IMG-20241125-WA0021.jpg";
import { Link } from "react-router-dom";
import InputBox from "../Common/InputBox/InputBox";
import { Button } from "primereact/button";
function Signup() {
  const signUp = (e) => {
    e.preventDefault();
    console.log("signup");
  };
  return (
    <div className="flex">
      <div>
        <img src={swigatoLogo} className={styles.logo_img} />
      </div>
      <div className={styles["form-container"]}>
        <h2 className={["welcome"]}>Welcome to Swiggato</h2>
        <form onSubmit={signUp}>
          <div className={styles["input-field"]}>
            <label>First Name:</label>
            <InputBox
              type="text"
              required={true}
              logo="user"
              placeHolder="Enter First Name"
            />
          </div>
          <div className={styles["input-field"]}>
            <label>Last Name:</label>
            <InputBox
              type="text"
              required={true}
              logo="user"
              placeHolder="Enter Last Name"
            />
          </div>
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

          <div className={styles["input-field"]}>
            <label>Confirm Password:</label>
            <InputBox
              type="password"
              required={true}
              logo="pass"
              placeHolder="Confirm password"
              showeye={true}
            />
          </div>
          <div>
            <Button
              label="Reset"
              severity="secondary"
              style={{ marginRight: "10px" }}
            />
            <Button label="Submit" style={{ marginLeft: "10px" }} />
          </div>
        </form>

        <div className={styles["account-link"]}>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
