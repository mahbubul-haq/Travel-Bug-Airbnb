import React from "react";

import { Link } from 'react-router-dom';
import MyMap from "./Map/Map";


import "../cssFiles/HostingPage1Base.css";
import "../cssFiles/HostingPage3.css";
//import DraggableMarkerExample from "./Map/Map";

const HostingPage3 = (props) => {
  
  const nextButton = () => {
    if (props.location() !== null) {
      return (
        <button id="nextButton" onClick={() => props.next()}>
          Next
        </button>
      );
    } else {
      return (
        <div id="disabledButtonWrapper">
          <button id="disabledNextButton" onClick={() => props.next()}>
            Next
          </button>
        </div>
      );
    }
  }
  
    return (
      <div id="body">
        <div id="container">
          <div id="left">Where do you want to host the experience?</div>
          <div id="right">
            <div id="top">
              {/* <button id="saveAndExit" onClick={()=>{props.saveAndExit()}}>Save and Exit</button> */}
              
              <Link to="/host/home"><button id="saveAndExit">Exit</button></Link>
            </div>

            <div id="middle4">
              {/* <DraggableMarkerExample /> */}
              <MyMap
                setLatLong = {(val)=>{props.setLocation(val)}}
                latLong = {props.location()}
              />
            </div>

            <div id="bottom">
              <button id="backButton" onClick={() => props.prevPage()}>
                Back
              </button>
               <button id="nextButton" onClick={() => props.nextPage()}>
                Next
              </button>
             
            </div>
          </div>
        </div>
      </div>
    );
  

  
}

export default HostingPage3;