import React from "react";
import styles from "./Navbar.module.css";
function Navbar() {
  return (
    <>
      <div className={styles.czzs}>vafsvushv</div>
      <nav className="Swiggato">
        <div className={styles.navbar_container}>
          <input type="checkbox" name="" id=""></input>
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <ul class="menu-items">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Category</a>
            </li>
            <li>
              <a href="#">Menu</a>
            </li>
            <li>
              <a href="#">Testimonial</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <h1 class="logo">Navbar</h1>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
