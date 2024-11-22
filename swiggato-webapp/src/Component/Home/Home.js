import React from "react";
import "./Home.css";
function Home({name, age}) {
  return (
    <>
      <div className="dark">Home</div>
      <span>{name}</span>
      <span>{age}</span>
    </>
    
  );
}

export default Home;
