import React from "react";
import styles from "./Navbar.module.css";
import swglogo from "../../../../src/Assets/Images/IMG-20241125-WA0021.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHandshakeAngle,
  faPercent,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  return (
    <nav className={styles.swnavbar}>
      <div className={styles.fstdiv}>
        <img
          src={swglogo}
          height={50}
          width={50}
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div className={styles.secdiv}>
        <input type="text" placeholder="Search" />
        <div>
          <FontAwesomeIcon icon={faPercent} style={{ paddingRight: "10px" }} />
          Offer
        </div>
        <div>
          <FontAwesomeIcon
            icon={faHandshakeAngle}
            style={{ paddingRight: "10px" }}
          />
          Help
        </div>
        <div>
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ paddingRight: "10px" }}
          />
          Cart
        </div>
        <div>
          <FontAwesomeIcon icon={faUser} style={{ paddingRight: "10px" }} />
          {localStorage.getItem("user")}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
