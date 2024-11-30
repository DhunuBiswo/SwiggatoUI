import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignature,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import style from "./Inputbox.module.css";

function InputBox({ type, required, logo, placeHolder, showeye }) {
  const [inputType, setInputType] = useState(type); // State for managing input type

  const findLogo = (logo) => {
    const iconList = {
      user: faSignature,
      email: faEnvelope,
      pass: faLock,
    };
    return iconList[logo];
  };

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className={style.new_input}>
      <FontAwesomeIcon icon={findLogo(logo)} style={{ padding: "10px" }} />
      <input
        type={inputType}
        placeholder={placeHolder || "Type"}
        className={style.custom_input}
        required={required}
      />
      {showeye && (
        <FontAwesomeIcon
          icon={inputType === "text" ? faEyeSlash : faEye}
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
  );
}

export default InputBox;
