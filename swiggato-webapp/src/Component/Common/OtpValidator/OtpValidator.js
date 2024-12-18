import React, { useState } from "react";
import { InputOtp } from "primereact/inputotp";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
function OtpValidator({
  validateOtp,
  setValidateOtp,
  getOtp,
  wrongotp = false,
}) {
  const [token, setTokens] = useState("");
  return (
    <Dialog
      header="Enter Signup OTP"
      visible={validateOtp}
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      onHide={() => {
        setValidateOtp(false);
      }}
    >
      <div className="card flex justify-content-center">
        <InputOtp
          value={token}
          onChange={(e) => setTokens(e.value)}
          //   mask
          integerOnly
          length={6}
        />
      </div>
      {wrongotp && (
        <div className="text-center error-messge mt-3">Wrong OTP</div>
      )}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button
          label="Submit OTP"
          severity="help"
          style={{ marginRight: "5px" }}
          disabled={token.length !== 6}
          onClick={() => getOtp(token)}
        />
        <Button
          label="Resend OTP"
          severity="secondary"
          style={{ marginLeft: "5px" }}
        />
      </div>
    </Dialog>
  );
}

export default OtpValidator;
