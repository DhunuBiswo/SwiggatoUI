import React from "react";
import homeimage from "../../../Assets/Images/Swiggato-home.png";
function OwnerHome() {
  return (
    <div>
      <img
        src={homeimage}
        style={{
          height: "100vh",
          objectFit: "cover",
          width: "108%",
        }}
      />
    </div>
  );
}

export default OwnerHome;
