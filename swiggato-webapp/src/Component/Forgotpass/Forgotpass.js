import React from "react";
import "./Forgotpass.module.css";

function Forgotpass() {
  return (
    <>
      <div className="form-container">
        <h2>Forgot Password</h2>
        <form>
          <div className="input-field">
            <label>Email:</label>
            <input type="email" required />
          </div>
          <button type="submit" className="btn">
            Reset Password
          </button>
        </form>
        <div className="account-link">
          <p>
            Already have an account?<a href="/login">Login</a>
          </p>
        </div>
        <div className="forgot-password-link">
          <p>
            <a href="/signup">Create Account</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Forgotpass;
