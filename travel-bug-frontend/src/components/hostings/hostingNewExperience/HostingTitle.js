import React from "react";

import { Link } from 'react-router-dom';


import "../cssFiles/HostingPage1Base.css";
import "../cssFiles/HostingTitle.css";

const HostingTitle = (props) => {


  const getValue= () => {
    if (props.title() !== null && props.title() !== "") {
      return props.title();
    } else return "";
  }

  const handleChange = (event) => {
    props.setTitle(event.target.value);
  }

    let titleVal = getValue();
    return (
      <div id="body">
        <div id="container">
          <div id="left">Give a nice title for your experience.</div>
          <div id="right">
            <div id="top">
              {/* <button id="saveAndExit" onClick={()=>{props.saveAndExit()}}>Save and Exit</button> */}
              
              <Link to="/host/home"><button id="saveAndExit">Exit</button></Link>
            </div>

            <div id="middle9">
              <div id="animation9">
                <div id="addDescription9">
                  <div id="descriptionInstruction9">Create your experience title</div>
                  <textarea
                    maxLength={50}
                    id="descriptionBox9"
                    placeholder="Walking through ancient relics in ... with ..."
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    value={titleVal}
                  ></textarea>
                  <div id="charCount9">{titleVal.length}/50</div>
                </div>
              </div>
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

export default HostingTitle;