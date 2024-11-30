import React from "react";
import styles from "./Login.module.css";

function Login() {
  const login = (e) => {
    e.preventDefault();
    console.log("login");
  };
  return (
    <>
      <div className="form-container">
        <h2>Login</h2>
        <form>
          <div className="input-field">
            <label>Email:</label>
            <input type="email" required />
          </div>

          <div className="input-field">
            <label>Password:</label>
            <input type="password" required />
          </div>

          <button type="submit" className="btn">
            Login
          </button>
        </form>

        <div className="account-link">
          <p>
            <a href="/signup">Create Account</a>
          </p>
        </div>

        <div className="forgot-password-link">
          <p>
            <a href="/forgot-password">Forgot your password? </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
