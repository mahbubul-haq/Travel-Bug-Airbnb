import React from "react";

import MyMap from "./Map/HostingMap";

import "../cssFiles/HostingPage1Base.css";
import "../cssFiles/HostingPage3.css";
//import DraggableMarkerExample from "./Map/Map";

const HostingPage3 = (props) => {
  const nextButton = () => {
    if (props.location() != null) {
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

  return (
    <div id="body">
      <div id="container">
        <div id="left">Where do you want to host the experience?</div>
        <div id="right">
          <div id="top">
            {/* <button id="saveAndExit" onClick={()=>{props.saveAndExit()}}>Save and Exit</button> */}

            <button id="saveAndExit" onClick={() => props.saveAndExit()}>
              Save and Exit
            </button>
          </div>

          <div id="middle4">
            {/* <DraggableMarkerExample /> */}
            <MyMap
              setLatLong={(val) => {
                props.setLocation(val);
              }}
              latLong={props.location()}
            />
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

export default HostingPage3;
