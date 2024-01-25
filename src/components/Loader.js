import React from "react";
import "./Loader.css";
import LoaderVideo from "../loader.mp4";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="box"></div>
      <video autoPlay loop muted className="loader-video">
        <source src={LoaderVideo} type="video/mp4" />
      </video>
    </div>
  );
};
export default Loader;
