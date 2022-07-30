import React from "react";
import { Link } from "react-router-dom";

import CheckBeforePublishingCard from "./CheckBeforePublishingCard";

import "../cssFiles/HostingCheckEverything.css";
import "../cssFiles/HostingPage1Base.css";

const HostingCheckEverything = (props) => {
  return (
    <div id="body">
      <div id="container">
        <div id="left">Time to recheck everything before publishing!</div>
        <div id="right">
          <div id="top">
            {/* <button id="saveAndExit" onClick={props.saveAndExit()}>Save and Exit</button> */}

            <Link to="/host/home">
              <button id="saveAndExit">Exit</button>
            </Link>
          </div>

          <div id="middle11">
            <div id="animation11">
              <div classname="card11">
                <CheckBeforePublishingCard
                  img={props.image()}
                  maxGroupSize={props.maxGroupSize()}
                  minAgeRequirement={props.minAgeRequirement()}
                  itemsToBring={props.itemsToBring()}
                  totalCost={props.totalCost()}
                  label={props.title()}
                  // owner={sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('lastname')}

                  description={props.description()}
                  category={props.category().category}
                  location={props.location()}
                />
              </div>
            </div>
          </div>

          <div id="bottom">
            <button id="backButton" onClick={() => props.prevPage()}>
              Back
            </button>
            <button
              id="nextButton"
              onClick={() => {
                props.publishHosting();
              }}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingCheckEverything;
