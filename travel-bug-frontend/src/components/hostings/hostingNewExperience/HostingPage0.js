import React from "react";
import { useNavigate } from "react-router-dom";

import HostingIntro from "../../../images/experience-hosting.webp";
import "../cssFiles/HostingPage0.css";
import "../cssFiles/HostingPage1Base.css";

const HostingPage1 = (props) => {
  const navigate = useNavigate();
  return (
    <div id="body">
      <div id="container">
        <div id="left-intro">
          <img id="hosting-intro-img" src={HostingIntro} alt="Hosting Intro" />
        </div>

        <div id="right">
          <div id="top-intro"></div>

          <div id="middle-intro">
            <div>
              <div id="intro-title">Travel Bug is an amazing place to Host</div>
              <div id="intro-subtitle">Host your experience with us!</div>
            </div>
          </div>

          <div id="bottom-intro">
            <button id="intro-back-button" onClick={() => {
               navigate("/hostings");
            }}>
              Exit
            </button>

            <button id="lets-go-button" onClick={props.nextPage}>
              Let's start!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingPage1;
