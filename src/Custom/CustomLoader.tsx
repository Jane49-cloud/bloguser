import React from "react";
import loaderImg from "../assets/loader.gif";
import ReactDOM from "react-dom";
import "./loader.css";

const Loader: React.FC = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader") as HTMLElement
  );
};

export const SpinnerImg: React.FC = () => {
  return (
    <div className="--center-all">
      <img src={loaderImg} alt="Loading..." />
    </div>
  );
};

export default Loader;
