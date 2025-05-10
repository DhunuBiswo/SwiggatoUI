import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignature,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faMobile,
  faMapPin,
  faLocationCrosshairs,
  faMapLocationDot,
  faFolderOpen,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import style from "./Inputbox.module.css";
function InputBox({
  type,
  required,
  logo,
  placeHolder,
  showeye,
  value,
  updateFormdata,
  reduxKey,
  label,
  isMandatory = true,
  disableit = false,
}) {
  const [inputType, setInputType] = useState(type);
  const findLogo = (logo) => {
    const iconList = {
      user: faSignature,
      email: faEnvelope,
      pass: faLock,
      mobile: faMobile,
      city: faMapPin,
      location: faLocationCrosshairs,
      address: faMapLocationDot,
      photo: faFolderOpen,
    };
    return iconList[logo];
  };
  const onChangeHandler = (e) => {
    updateFormdata(
      reduxKey,
      inputType === "file" ? e.target.files[0] : e.target.value
    );
  };

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <>
      <label>
        {label}
        {isMandatory && <span className="error-messge"> *</span>}
      </label>
      <div className={style.new_input}>
        <FontAwesomeIcon icon={findLogo(logo)} style={{ padding: "10px" }} />
        <input
          type={inputType}
          placeholder={placeHolder || "Type"}
          className={style.custom_input}
          required={required}
          value={value}
          onChange={(e) => onChangeHandler(e)}
          disabled={disableit}
        />
        {showeye && (
          <FontAwesomeIcon
            icon={inputType === "text" ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
    </>
  );
}

export default InputBox;
