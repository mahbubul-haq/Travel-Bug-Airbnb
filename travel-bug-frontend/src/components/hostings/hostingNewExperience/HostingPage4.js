import React from "react";
import { Link } from "react-router-dom";

import "../cssFiles/HostingPage1Base.css";
import "../cssFiles/HostingPage4.css";
//base should be imported first

const HostingPage4 = (props) => {
  const handleChange = (event) => {
    props.setDescription(event.target.value);
  };

  const nextButton = () => {
    if (props.description() !== null && props.description() !== "") {
      return (
        <button id="nextButton" onClick={() => props.nextPage()}>
          Next
        </button>
      );
    } else {
      return (
        <div id="disabledButtonWrapper">
          <button id="disabledNextButton" onClick={() => props.nextPage()}>
            Next
          </button>
        </div>
      );
    }
  };

  const getValue = () => {
    if (props.description() !== null && props.description() !== "") {
      return props.description();
    } else return "";
  };

  let descValue = getValue();
  return (
    <div id="body">
      <div id="container">
        <div id="left">Give proper description about your experience</div>
        <div id="right">
          <div id="top">
            {/* <button id="saveAndExit" onClick={()=>{props.saveAndExit()}}>Save and Exit</button> */}

            <Link to="/host/home">
              <button id="saveAndExit">Exit</button>
            </Link>
          </div>

          <div id="middle8">
            <div id="animation8">
              <div id="addDescription8">
                <div id="descriptionInstruction8">
                  Write description about your experience.
                </div>
                <textarea
                  id="descriptionBox8"
                  placeholder="Write the description here..."
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  value={descValue}
                ></textarea>
              </div>
            </div>
          </div>

          <div id="bottom">
            <button id="backButton" onClick={() => props.prevPage()}>
              Back
            </button>
            {nextButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingPage4;
