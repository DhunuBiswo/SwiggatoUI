import { Dialog } from "primereact/dialog";
import React from "react";
import successIcon from "../../../Assets/Images/Success.svg";
import styles from "./Dialog.module.css";
import { useNavigate } from "react-router-dom";
function SwiggatoDialog({
  showResultPopUp,
  message,
  redirecturl,
  setShowResultPopUp,
}) {
  const navigate = useNavigate();
  return (
    <Dialog
      visible={showResultPopUp}
      style={{ width: "35vw" }}
      onHide={() => {
        navigate(redirecturl);
        setShowResultPopUp(false);
      }}
    >
      <div className="text-center">
        <img className={styles.icon_width} src={successIcon} />
        <div className="mt-5">{message}</div>
      </div>
    </Dialog>
  );
}

export default SwiggatoDialog;
